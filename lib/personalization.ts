import type { ContentItem } from "@/types/content";
import type { EducatorProfile } from "@/types/profile";
const overlaps=(a:string[],b:string[])=>a.some(value=>b.includes(value));
export function scoreContent(item:ContentItem,profile:EducatorProfile){ return (overlaps(item.subjects,profile.subjects)?5:0)+(overlaps(item.gradeBands,profile.gradeBands)?3:0)+(overlaps(item.interests,profile.interests)?3:0)+(item.aiLevels.includes(profile.aiLevel)?2:0)+(item.roles.includes(profile.role)?2:0); }
export function rankContent(items:ContentItem[],profile:EducatorProfile|null){ if(!profile)return items; return [...items].sort((a,b)=>scoreContent(b,profile)-scoreContent(a,profile)); }
