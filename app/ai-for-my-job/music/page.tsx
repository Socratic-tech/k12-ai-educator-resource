import { PathwayPage } from "@/components/subjects/PathwayPage"; import { buildPathwayMetadata,getPathway } from "@/content/subjects/pathways";
export const metadata=buildPathwayMetadata("music");
export default function Page(){return <PathwayPage pathway={getPathway("music")!}/>}
