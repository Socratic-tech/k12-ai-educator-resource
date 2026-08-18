export type Role = "classroom-teacher" | "specialist" | "special-education" | "instructional-support" | "library-media" | "counselor" | "administrator" | "other";
export type GradeBand = "prek-2" | "3-5" | "6-8" | "9-12";
export type Subject = "elementary" | "ela" | "mathematics" | "science" | "social-studies" | "physical-education" | "health" | "visual-arts" | "music" | "world-languages" | "special-education" | "cte" | "library-media" | "other";
export type AiLevel = "starting" | "experimented" | "sometimes" | "regularly" | "leader";
export type Interest = "lesson-planning" | "differentiation" | "assessment" | "feedback" | "student-ai" | "academic-integrity" | "productivity" | "family-communication" | "accessibility" | "ai-literacy" | "assignment-redesign" | "emerging-ai";

export type EducatorProfile = { role: Role; gradeBands: GradeBand[]; subjects: Subject[]; aiLevel: AiLevel; interests: Interest[]; updatedAt: string };
