import type { PrintItem } from "./prints";

const norm = (s: string) => s.toLowerCase().trim();

// Split into searchable tokens (title words, tags, description words)
function tokenize(item: PrintItem): string[] {
  const combined = `${item.title} ${item.tags.join(" ")} ${item.description}`;
  return norm(combined)
    .split(/[^a-z0-9]+/g)
    .filter(Boolean);
}

// Returns true if token matches word either by substring OR prefix (partial tag support)
function tokenMatches(token: string, word: string) {
  // prefix match feels best for “typeahead”
  if (token.startsWith(word)) return true;

  // allow contains for flexibility (optional but useful)
  if (token.includes(word)) return true;

  return false;
}

export function searchPrints(items: PrintItem[], query: string): PrintItem[] {
  const q = norm(query);
  if (!q) return [];

  const words = q.split(/\s+/).filter(Boolean);

  return items
    .map((item) => {
      const tokens = tokenize(item);

      // Require every word to match at least one token
      const matchesAll = words.every((w) => tokens.some((t) => tokenMatches(t, w)));
      if (!matchesAll) return { item, score: 0 };

      // Basic scoring (minimal but effective)
      let score = 0;

      // Boost title matches
      const titleTokens = norm(item.title).split(/[^a-z0-9]+/g).filter(Boolean);
      for (const w of words) {
        if (titleTokens.some((t) => t.startsWith(w))) score += 4;
        else if (titleTokens.some((t) => t.includes(w))) score += 2;
      }

      // Boost tag matches
      const tagTokens = item.tags.map(norm);
      for (const w of words) {
        if (tagTokens.some((t) => t.startsWith(w))) score += 3;
        else if (tagTokens.some((t) => t.includes(w))) score += 1;
      }

      // Light boost description matches
      const descTokens = norm(item.description).split(/[^a-z0-9]+/g).filter(Boolean);
      for (const w of words) {
        if (descTokens.some((t) => t.startsWith(w))) score += 1;
      }

      return { item, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.item);
}
