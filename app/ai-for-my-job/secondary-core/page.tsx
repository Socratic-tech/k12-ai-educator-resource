import { PathwayPage } from "@/components/subjects/PathwayPage"; import { buildPathwayMetadata,getPathway } from "@/content/subjects/pathways";
export const metadata=buildPathwayMetadata("secondary-core");
export default function Page(){return <PathwayPage pathway={getPathway("secondary-core")!}/>}
