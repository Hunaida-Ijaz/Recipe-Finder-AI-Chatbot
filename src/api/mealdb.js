import { lookupDesiById } from "../data/desiRecipes";

// TheMealDB free public API (test key "1") — no signup required.
const BASE = "https://www.themealdb.com/api/json/v1/1";

async function safeFetch(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Request failed: ${res.status}`);
    const data = await res.json();
    return data.meals || [];
  } catch (err) {
    console.error("MealDB request failed:", err);
    return null; // null signals "couldn't reach the kitchen"
  }
}

export function searchByName(name) {
  return safeFetch(`${BASE}/search.php?s=${encodeURIComponent(name)}`);
}

export function filterByIngredient(ingredient) {
  return safeFetch(`${BASE}/filter.php?i=${encodeURIComponent(ingredient)}`);
}

export function filterByCategory(category) {
  return safeFetch(`${BASE}/filter.php?c=${encodeURIComponent(category)}`);
}

export function filterByArea(area) {
  return safeFetch(`${BASE}/filter.php?a=${encodeURIComponent(area)}`);
}

export async function lookupById(id) {
  if (typeof id === "string" && id.startsWith("desi-")) {
    return lookupDesiById(id);
  }
  const meals = await safeFetch(`${BASE}/lookup.php?i=${encodeURIComponent(id)}`);
  return meals && meals.length ? meals[0] : null;
}

export async function randomMeal() {
  const meals = await safeFetch(`${BASE}/random.php`);
  return meals && meals.length ? meals[0] : null;
}

export function getCategories() {
  return safeFetch(`${BASE}/categories.php`);
}

// Pulls the up-to-20 ingredient/measure pairs out of MealDB's flat strMeasure1..20 fields.
export function extractIngredients(meal) {
  const list = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      list.push({ ingredient: ingredient.trim(), measure: (measure || "").trim() });
    }
  }
  return list;
}
