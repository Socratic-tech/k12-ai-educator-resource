import assert from "node:assert/strict";
import test from "node:test";

async function render(path="/"){
  const workerUrl=new URL("../dist/server/index.js",import.meta.url);
  workerUrl.searchParams.set("test",`${process.pid}-${Date.now()}-${path}`);
  const {default:worker}=await import(workerUrl.href);
  return worker.fetch(new Request(`http://localhost${path}`,{headers:{accept:"text/html"}}),{ASSETS:{fetch:async()=>new Response("Not found",{status:404})}},{waitUntil(){},passThroughOnException(){}});
}

for(const [path,expected] of [["/","AI is changing education"],["/profile","Make this resource relevant"],["/catch-up/5-minute","Fluent is not the same as accurate"],["/catch-up/20-minute","practical educator’s guide"],["/ai-for-my-job/physical-education","Physical Education"],["/ai-for-my-job/elementary-classroom","Elementary Classroom"],["/ai-for-my-job/visual-arts","Visual Arts"],["/ai-for-my-job/music","rehearsal"],["/ai-for-my-job/world-languages","authentic production"],["/ai-for-my-job/secondary-core","Secondary Core"],["/prompt-builder","Differentiate an Activity"],["/prompt-builder/lesson-planning","Lesson Planning"],["/prompt-builder/assessment-creation","Assessment Creation"],["/prompt-builder/rubric-creation","Rubric Creation"],["/prompt-builder/feedback","Feedback"],["/prompt-builder/family-communication","Family Communication"],["/prompt-builder/activity-brainstorming","Activity Brainstorming"],["/prompt-builder/assignment-redesign","Assignment Redesign"],["/students-ai","What student thinking or performance"],["/about","free, public, vendor-neutral"],["/privacy","No AI API is used"],["/feedback","Copy feedback summary"],["/stay-current","not a live news feed"]]){
  test(`renders ${path}`,async()=>{const response=await render(path);assert.equal(response.status,200);assert.match(response.headers.get("content-type")??"",/^text\/html\b/i);assert.match(await response.text(),new RegExp(expected,"i"));});
}

test("ships product metadata without starter markers",async()=>{const html=await(await render()).text();assert.match(html,/<title>Practical AI guidance for educators \| K-12 AI Educator Resource<\/title>/i);assert.doesNotMatch(html,/codex-preview|react-loading-skeleton|Your site is taking shape/i);});

test("ships the concise trust layer on educator pages",async()=>{const html=await(await render("/students-ai")).text();assert.match(html,/AI-generated or AI-assisted materials require educator review/i);assert.match(html,/requirements may differ/i);assert.match(html,/Do not enter personally identifiable student information/i)});

test("detail metadata matches its visible pathway and clears the site-wide social card",async()=>{for(const path of ["/ai-for-my-job/visual-arts","/prompt-builder/lesson-planning"]){const html=await(await render(path)).text();assert.match(html,/<title>[^<]*(Visual Arts|Lesson Planning)[^<]*<\/title>/i);assert.doesNotMatch(html,/og\.png/i)}});
