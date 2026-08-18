import { PathwayPage } from "@/components/subjects/PathwayPage"; import { buildPathwayMetadata,getPathway } from "@/content/subjects/pathways";
export const metadata=buildPathwayMetadata("visual-arts");
export default function Page(){return <PathwayPage pathway={getPathway("visual-arts")!}/>}
