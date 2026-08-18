import type { GradeBand,Interest,Role,Subject } from "./profile";

export type PathwayUseCase={title:string;description:string;example:string};
export type Pathway={
 id:string; slug:string; title:string; shortTitle:string; gradeLabel:string; summary:string;
 subjects:Subject[]; gradeBands:GradeBand[]; roles:Role[]; interests:Interest[];
 usefulFrame:string; useCases:PathwayUseCase[]; considerations:{title:string;body:string}[];
 cautions:string[]; promptWorkflow:string; promptLabel:string;
};
