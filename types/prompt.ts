export type DifferentiateActivityInput = { gradeLevel:string; subject:string; activity:string; objective:string; differentiationNeed:string; classSize:string; time:string; resources:string; constraints?:string };
export type PromptWorkflowId="differentiate-activity"|"lesson-planning"|"assessment-creation"|"rubric-creation"|"feedback"|"family-communication"|"activity-brainstorming"|"assignment-redesign";
export type PromptField={key:string;label:string;hint:string;control?:"input"|"textarea";required?:boolean};
export type PromptTemplate={id:PromptWorkflowId;title:string;description:string;intro:string;fields:PromptField[];defaults:Record<string,string>;why:string;improve:string[];before:string};
