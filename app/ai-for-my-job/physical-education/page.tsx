import type { Metadata } from "next";
import Link from "next/link";
import { CautionBox } from "@/components/content/CautionBox";
import { PageShell } from "@/components/ui/PageShell";
import { peCautions,peUseCases } from "@/content/subjects/physicalEducation";

const description="Authentic middle-school physical education guidance grounded in movement objectives, equipment, space, access, and safety.";
export const metadata:Metadata={title:"Physical Education | K-12 AI Educator Resource",description,openGraph:{title:"Physical Education | K-12 AI Educator Resource",description,images:[]},twitter:{title:"Physical Education | K-12 AI Educator Resource",description,images:[]}};

export default function PhysicalEducationPage(){return <PageShell>
  <section className="subject-hero"><div className="section-shell"><div><p className="eyebrow">Educator Guidance · Grades 6–8</p><h1>Physical Education</h1><p>Use AI to expand your planning options—not to make judgments about a student’s body, health, ability, or safety.</p><div className="hero-actions"><Link className="button button--primary" href="/prompt-builder">Differentiate an activity</Link><Link className="button button--quiet" href="/catch-up/5-minute">Read the 5-minute catch-up</Link></div></div><aside><span className="content-label">The useful frame</span><p>Give AI the movement objective, space, equipment, group size, and constraints. Then evaluate every suggestion for safety and fit.</p></aside></div></section>
  <section className="section-shell use-case-section"><div className="section-heading"><div><p className="eyebrow">Practical educator workflows</p><h2>Where AI might save planning time</h2></div><p>These are starting points for educator review, not ready-to-run lesson plans.</p></div><div className="use-case-grid">{peUseCases.map(item=><article className={item.featured?"use-case-card is-featured":"use-case-card"} key={item.title}><span className="content-label">{item.featured?"Try this first":"Use case"}</span><h3>{item.title}</h3><p>{item.description}</p>{item.featured&&<Link href="/prompt-builder">Build this prompt →</Link>}</article>)}</div></section>
  <section className="section-shell pe-example"><div><p className="eyebrow">A PE-specific example</p><h2>Preserve the learning target, vary the pathway</h2><p>If students are practicing creating space in a small-sided game, useful differentiation could adjust the playing area, number of defenders, pace, equipment, or decision cues. It should not quietly replace the objective with “participates successfully.”</p></div><div className="objective-card"><span>Keep consistent</span><strong>Creating and using space</strong><span>Possible variables</span><strong>Area · defenders · cues · equipment · pace</strong></div></section>
  <section className="section-shell caution-section"><CautionBox title="Safety and student information come first"><ul>{peCautions.map(item=><li key={item}>{item}</li>)}</ul></CautionBox></section>
</PageShell>}
