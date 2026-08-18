"use client";

import { useState } from "react";

const categories=["Inaccurate content","Irrelevant example","Missing teaching assignment","Confusing guidance","Accessibility problem","Feature idea"];

export function FeedbackForm(){
  const [category,setCategory]=useState(categories[0]);
  const [route,setRoute]=useState("");
  const [details,setDetails]=useState("");
  const [status,setStatus]=useState("");

  async function prepare(event:React.FormEvent){
    event.preventDefault();
    const report=[`Feedback type: ${category}`,`Page or route: ${route.trim()||"Not provided"}`,"",details.trim()].join("\n");
    try{await navigator.clipboard.writeText(report);setStatus("Feedback summary copied. Paste it into the project feedback channel shared by your organization.")}
    catch{setStatus("Copy was blocked by your browser. Select and copy your responses manually before leaving this page.")}
  }

  return <form className="feedback-form" onSubmit={prepare}>
    <div className="field"><label htmlFor="feedback-category">What would you like to report?</label><select id="feedback-category" value={category} onChange={event=>setCategory(event.target.value)}>{categories.map(item=><option key={item}>{item}</option>)}</select></div>
    <div className="field"><label htmlFor="feedback-route">Page or route <span>(optional)</span></label><input id="feedback-route" value={route} onChange={event=>setRoute(event.target.value)} placeholder="For example: Students + AI"/></div>
    <div className="field"><label htmlFor="feedback-details">What should we know?</label><textarea id="feedback-details" value={details} onChange={event=>setDetails(event.target.value)} rows={7} required aria-describedby="feedback-privacy"/></div>
    <p className="field-help" id="feedback-privacy">Do not include student names, records, contact information, or other personally identifiable information.</p>
    <button className="button button--primary" type="submit">Copy feedback summary</button>
    {status&&<p className="form-message" role="status" aria-live="polite">{status}</p>}
  </form>
}
