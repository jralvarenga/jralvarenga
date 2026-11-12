/** The page subtitle and any sentences that follow it. */
export interface SkillDescriptionParts {
  /** First sentence, used as the one-line page subtitle. */
  lead: string;
  /** The rest of the description, empty when it is a single sentence. */
  rest: string;
}

/**
 * Splits a skill description into its page subtitle and any following
 * sentences. A period inside a name such as `CLAUDE.md` is not a boundary;
 * the next sentence has to start with a capital letter.
 */
export function splitSkillDescription(
  description: string,
): SkillDescriptionParts {
  const trimmed = description.trim();
  const boundary = /[.!?](?=\s+[A-Z])/.exec(trimmed);
  if (!boundary) return { lead: trimmed, rest: '' };

  const end = boundary.index + 1;
  return {
    lead: trimmed.slice(0, end).trim(),
    rest: trimmed.slice(end).trim(),
  };
}
