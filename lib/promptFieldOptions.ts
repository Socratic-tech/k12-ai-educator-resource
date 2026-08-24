import type { PromptField } from "@/types/prompt";

export function getPromptFieldOptions(field: PromptField, value: string) {
  const options = field.options ?? [];

  if (!value || options.includes(value)) return options;

  return [value, ...options];
}
