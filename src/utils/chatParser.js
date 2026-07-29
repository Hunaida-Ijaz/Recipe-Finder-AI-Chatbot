// Intent classification for the recipe chatbot.
//
// The old version matched category words (e.g. "chicken") anywhere in the
// message, which meant a specific request like "chicken biryani" got
// hijacked into a generic chicken-category search and ignored "biryani"
// entirely. This version checks the most SPECIFIC signal first (an exact
// desi dish, then a direct name search) and only falls back to broad
// category/ingredient guesses when the message is genuinely vague.

const CATEGORIES = [
  "beef", "chicken", "dessert", "lamb", "miscellaneous", "pasta", "pork",
  "seafood", "side", "starter", "vegan", "vegetarian", "breakfast", "goat",
];

const AREAS = [
  "american", "british", "canadian", "chinese", "croatian", "dutch",
  "egyptian", "filipino", "french", "greek", "indian", "irish", "italian",
  "jamaican", "japanese", "kenyan", "malaysian", "mexican", "moroccan",
  "polish", "portuguese", "russian", "spanish", "thai", "tunisian",
  "turkish", "ukrainian", "vietnamese",
  // Note: TheMealDB has no "Pakistani" area — desi dish requests are
  // handled separately via the local desiRecipes dataset instead.
];

const INGREDIENT_SIGNAL_WORDS = ["have", "got", "using", "with"];

const STOPWORDS = new Set([
  "i", "have", "has", "got", "with", "and", "some", "a", "an", "the",
  "can", "you", "find", "me", "recipe", "recipes", "make", "using",
  "for", "to", "in", "my", "please", "suggest", "something", "want",
  "need", "cook", "cooking", "dish", "any", "of", "leftover", "leftovers",
  "food", "show",
]);

export function isRandomRequest(text) {
  const t = text.toLowerCase();
  return /surprise me|random|anything|feeling lucky|pick for me/.test(t);
}

export function findCategory(text) {
  const t = text.toLowerCase();
  return CATEGORIES.find((c) => t.includes(c)) || null;
}

export function findArea(text) {
  const t = text.toLowerCase();
  return AREAS.find((a) => t.includes(a)) || null;
}

export function extractKeywords(text) {
  return text
    .toLowerCase()
    .replace(/[.,!?]/g, "")
    .split(/\s+/)
    .filter((w) => w && !STOPWORDS.has(w));
}

function hasIngredientSignal(text) {
  const t = text.toLowerCase();
  return INGREDIENT_SIGNAL_WORDS.some((w) => t.includes(w));
}

// A message "is just a category" when, after stripping stopwords, the only
// content word left is the category/area itself — e.g. "something
// vegetarian" or "chicken recipes", but NOT "chicken biryani" or "chicken
// parmesan" (which have another specific content word alongside it).
function isBareLabelRequest(text, label) {
  const keywords = extractKeywords(text);
  return keywords.length > 0 && keywords.every((w) => label.includes(w) || w.includes(label));
}

// Returns an ordered list of classification attempts to try, from most to
// least specific. The caller (chatbot) tries each in turn and stops at the
// first one that returns real results.
export function classifyMessage(text) {
  const trimmed = text.trim();

  if (isRandomRequest(trimmed)) {
    return [{ type: "random" }];
  }

  const area = findArea(trimmed);
  const category = findCategory(trimmed);
  const bareArea = area && isBareLabelRequest(trimmed, area);
  const bareCategory = category && isBareLabelRequest(trimmed, category);

  const attempts = [];

  // Tier 1 — the message IS just a label ("vegetarian", "chicken recipes",
  // "Italian food"): safe to browse that whole category/cuisine directly.
  if (bareCategory) attempts.push({ type: "category", value: category });
  if (bareArea) attempts.push({ type: "area", value: area });

  // Tier 2 — try it as a specific dish name, since that's the most precise
  // read of anything with more than one meaningful word in it.
  attempts.push({ type: "name", value: trimmed });

  // Tier 3 — "I have X and Y" style ingredient phrasing.
  if (hasIngredientSignal(trimmed)) {
    const keywords = extractKeywords(trimmed);
    if (keywords.length) {
      attempts.push({ type: "ingredient", value: keywords[0], allKeywords: keywords });
    }
  }

  // Tier 4 — fallback broad filters, only reached if everything above
  // came up empty.
  if (category && !bareCategory) attempts.push({ type: "category", value: category });
  if (area && !bareArea) attempts.push({ type: "area", value: area });

  return attempts;
}
