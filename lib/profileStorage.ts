import type { EducatorProfile } from "@/types/profile";
export const PROFILE_STORAGE_KEY="k12-ai-educator-resource:profile:v1";
export function loadProfile():EducatorProfile|null { if(typeof window==="undefined")return null; try { const raw=window.localStorage.getItem(PROFILE_STORAGE_KEY); return raw?JSON.parse(raw) as EducatorProfile:null } catch{return null} }
export function saveProfile(profile:EducatorProfile){ window.localStorage.setItem(PROFILE_STORAGE_KEY,JSON.stringify(profile)); }
export function clearProfile(){ window.localStorage.removeItem(PROFILE_STORAGE_KEY); }
