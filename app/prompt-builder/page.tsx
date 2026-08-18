import type { Metadata } from "next"; import { PromptBuilderExperience } from "@/components/prompt-builder/PromptBuilderExperience"; import { pageMetadata } from "@/lib/pageMetadata";
export const metadata:Metadata=pageMetadata("Differentiate an Activity Prompt Builder","Build a bounded prompt that preserves a shared learning objective while varying access and support.");
export default function PromptBuilderPage(){return <PromptBuilderExperience/>}
