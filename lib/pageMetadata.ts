import type { Metadata } from "next";

export function pageMetadata(title:string,description:string):Metadata{
  const fullTitle=`${title} | K-12 AI Educator Resource`;
  return {title:fullTitle,description,openGraph:{title:fullTitle,description},twitter:{title:fullTitle,description}};
}
