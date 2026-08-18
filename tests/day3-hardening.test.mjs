import assert from "node:assert/strict";
import test from "node:test";
import { promptTemplates } from "../data/promptTemplates.ts";
import { generateWorkflowPrompt } from "../lib/promptGeneration.ts";

const vendorPattern=/\b(OpenAI|ChatGPT|Gemini|Claude|Copilot|Microsoft|Google|Anthropic)\b/i;

function valuesFor(template,mode){
  return Object.fromEntries(template.fields.map((field,index)=>{
    if(field.required===false&&mode==="minimum")return [field.key,""];
    if(mode==="punctuation")return [field.key,`“Quoted” — value ${index+1}; brackets [x], slash /, ampersand &, emoji ✓.`];
    if(mode==="long")return [field.key,`${field.label}: ${"Detailed educator context with constraints and observable evidence. ".repeat(40)}`];
    if(mode==="rich")return [field.key,template.defaults[field.key]||`Detailed ${field.label.toLowerCase()} with time, access, materials, and review constraints.`];
    return [field.key,field.required===false?"":`Valid ${field.label.toLowerCase()}`];
  }));
}

for(const template of promptTemplates){
  for(const mode of ["minimum","rich","punctuation","long"]){
    test(`${template.id} handles ${mode} input`,()=>{
      const prompt=generateWorkflowPrompt(template.id,valuesFor(template,mode));
      assert.ok(prompt.length>250);
      assert.doesNotMatch(prompt,/undefined|null/i);
      assert.doesNotMatch(prompt,vendorPattern);
      assert.match(prompt,/personally identifiable information|student names|identifiable|individual students/i);
      assert.match(prompt,/educator|professional|teacher/i);
    });
  }
}

test("all optional fields may remain blank",()=>{
  for(const template of promptTemplates){
    const prompt=generateWorkflowPrompt(template.id,valuesFor(template,"minimum"));
    for(const field of template.fields.filter(item=>item.required===false))assert.doesNotMatch(prompt,new RegExp(`${field.label}:\\s*(undefined|null)`,"i"));
  }
});
