import type { Metadata } from "next";
import { FeedbackForm } from "@/components/feedback/FeedbackForm";
import { PageIntro,PageShell } from "@/components/ui/PageShell";
import { pageMetadata } from "@/lib/pageMetadata";

export const metadata:Metadata=pageMetadata("Feedback","Report inaccurate content, irrelevant examples, missing assignments, confusing guidance, accessibility problems, or feature ideas.");

export default function FeedbackPage(){return <PageShell><PageIntro eyebrow="Feedback" title="Help improve this educator resource" description="Flag content and usability issues without entering student or colleague information."/><section className="section-shell feedback-layout"><div><p className="content-label">What happens next</p><h2>Create a shareable feedback summary</h2><p>This beta does not collect form submissions or require an account. The form prepares a structured summary on your device for you to paste into the feedback channel your organization provides.</p><p>If no feedback channel has been shared with you, save the summary and send it to the person who gave you access to this beta.</p></div><FeedbackForm/></section></PageShell>}
