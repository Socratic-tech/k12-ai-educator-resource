import type { EducatorProfile, GradeBand, Subject } from "@/types/profile";
import { subjects } from "../data/subjects.ts";

const gradeLabels: Record<GradeBand, string> = {
  "prek-2": "PreK–2",
  "3-5": "Grades 3–5",
  "6-8": "Grades 6–8",
  "9-12": "Grades 9–12",
};

export function profileGradeLabel(profile: EducatorProfile | null) {
  if (!profile?.gradeBands?.length) return "";

  if (profile.gradeBands.length === 1) {
    return gradeLabels[profile.gradeBands[0]];
  }

  return profile.gradeBands.map((band) => gradeLabels[band]).join(", ");
}

export function profileSubjectLabel(profile: EducatorProfile | null) {
  if (!profile?.subjects?.length) return "";

  const first = profile.subjects[0] as Subject;
  const match = subjects.find((subject) => subject.value === first);

  return profile.specificTeachingArea?.trim() || match?.label || "";
}

export function getProfilePromptDefaults(profile: EducatorProfile | null) {
  return {
    gradeLevel: profileGradeLabel(profile),
    subject: profileSubjectLabel(profile),
  };
}
