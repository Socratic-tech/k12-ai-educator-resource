"use client";

import { useEffect, useState } from "react";
import { generateWorkflowPrompt } from "@/lib/promptGeneration";
import { loadProfile } from "@/lib/profileStorage";
import { getProfilePromptDefaults } from "@/lib/profilePromptDefaults";
import type { PromptField, PromptTemplate } from "@/types/prompt";

export function GuidedPromptBuilder({ template }: { template: PromptTemplate }) {
  const [values, setValues] = useState({ ...template.defaults });
  const [prompt, setPrompt] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const profile = loadProfile();
      if (!profile) return;

      const profileDefaults = getProfilePromptDefaults(profile);

      setValues((current) => ({
        ...current,
        ...(profileDefaults.gradeLevel
          ? { gradeLevel: profileDefaults.gradeLevel }
          : {}),
        ...(profileDefaults.subject
          ? { subject: profileDefaults.subject }
          : {}),
      }));
    });

    return () => window.cancelAnimationFrame(frame);
  }, [template.id]);

  const update =
    (key: string) =>
    (
      event: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => {
      setValues({ ...values, [key]: event.target.value });
      setCopied(false);
      setCopyFailed(false);
    };

  function submit(event: React.FormEvent) {
    event.preventDefault();

    const missing = template.fields
      .filter(
        (field) =>
          field.required !== false && !values[field.key]?.trim(),
      )
      .map((field) => field.key);

    if (missing.length) {
      setErrors(missing);
      setPrompt("");
      return;
    }

    setErrors([]);
    setCopied(false);
    setCopyFailed(false);
    setPrompt(generateWorkflowPrompt(template.id, values));

    setTimeout(() => document.getElementById("prompt-result")?.focus(), 0);
  }

  async function copy() {
    if (!prompt) return;

    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setCopyFailed(false);
    } catch {
      setCopied(false);
      setCopyFailed(true);
    }
  }

  function clear() {
    setValues(
      Object.fromEntries(template.fields.map((field) => [field.key, ""])),
    );
    setPrompt("");
    setErrors([]);
    setCopied(false);
    setCopyFailed(false);
  }

  const coreFields = template.fields.filter((field) => !field.advanced);
  const advancedFields = template.fields.filter((field) => field.advanced);

  function renderField(field: PromptField) {
    const id = `${template.id}-${field.key}`;
    const value = values[field.key] || "";

    return (
      <div className="field" key={field.key}>
        <label htmlFor={id}>
          {field.label}
          {field.required !== false && <span aria-hidden="true"> *</span>}
        </label>

        {field.control === "select" ? (
          <select
            id={id}
            value={value}
            onChange={update(field.key)}
            aria-invalid={errors.includes(field.key)}
            aria-describedby={`${id}-hint`}
          >
            <option value="">Choose an option</option>
            {field.options?.map((option) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
        ) : field.control === "input" ? (
          <input
            id={id}
            value={value}
            onChange={update(field.key)}
            aria-invalid={errors.includes(field.key)}
            aria-describedby={`${id}-hint`}
          />
        ) : (
          <textarea
            id={id}
            value={value}
            onChange={update(field.key)}
            rows={4}
            aria-invalid={errors.includes(field.key)}
            aria-describedby={`${id}-hint`}
          />
        )}

        <p id={`${id}-hint`} className="field-help">
          {field.hint}
        </p>
      </div>
    );
  }

  return (
    <div className="builder-layout">
      <form className="builder-form" onSubmit={submit} noValidate>
        <div className="builder-form-header">
          <span className="content-label">Prompt Template</span>
          <h2>{template.title}</h2>
          <p>
            {template.intro} Do not include names or identifiable student
            information.
          </p>
          <button className="text-button" type="button" onClick={clear}>
            Clear example
          </button>
        </div>

        {errors.length > 0 && (
          <div className="error-summary" role="alert">
            <strong>Please complete all required fields.</strong>
            <p>
              Optional fields may be left blank. Fields marked with an
              asterisk are required.
            </p>
          </div>
        )}

        <div className="field-stack">{coreFields.map(renderField)}</div>

        {advancedFields.length > 0 && (
          <details className="builder-advanced">
            <summary>Customize more</summary>
            <p className="field-help">
              Add any details that would make the prompt better for your
              classroom. These are optional.
            </p>
            <div className="field-stack">
              {advancedFields.map(renderField)}
            </div>
          </details>
        )}

        <button
          className="button button--primary button--wide"
          type="submit"
        >
          Generate my prompt
        </button>
      </form>

      <div className="result-column">
        {prompt ? (
          <>
            <section
              className="prompt-result"
              aria-labelledby="prompt-result-title"
              id="prompt-result"
              tabIndex={-1}
            >
              <div className="prompt-result-header">
                <div>
                  <span className="content-label">Ready to copy</span>
                  <h2 id="prompt-result-title">Your Prompt</h2>
                </div>
                <button
                  className="button button--copy"
                  type="button"
                  onClick={copy}
                >
                  {copied ? "Copied!" : "Copy Prompt"}
                </button>
              </div>

              <pre>{prompt}</pre>

              <p
                className={
                  copyFailed
                    ? "copy-status copy-status--error"
                    : "copy-status"
                }
                role="status"
                aria-live="polite"
              >
                {copied
                  ? "Prompt copied to your clipboard."
                  : copyFailed
                    ? "Copy was blocked by your browser. Select the prompt text and copy it manually."
                    : "Copy this into the AI system you choose or your institution approves."}
              </p>
            </section>

            <section className="explanation-card">
              <h2>Why this prompt works</h2>
              <p>{template.why}</p>
            </section>

            <section className="explanation-card">
              <h2>Make it even better</h2>
              <ul>
                {template.improve.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section className="before-card">
              <span className="content-label">Review Before Use</span>
              <h2>Use educator judgment before acting</h2>
              <p>{template.before}</p>
            </section>
          </>
        ) : (
          <aside className="result-placeholder">
            <span className="content-label">What you’ll get</span>
            <h2>A structured, bounded prompt</h2>
            <p>
              Your answers will be placed into a deterministic template.
              Nothing is sent to an AI service.
            </p>
            <ol>
              <li>Choose a few useful starting points</li>
              <li>Customize only if you need to</li>
              <li>Generate and review your prompt</li>
              <li>Copy it into an approved AI system</li>
            </ol>
          </aside>
        )}
      </div>
    </div>
  );
}
