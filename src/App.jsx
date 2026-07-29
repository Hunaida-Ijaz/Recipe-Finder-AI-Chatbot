import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import RecipeGrid from "./components/RecipeGrid";
import RecipeModal from "./components/RecipeModal";
import Chatbot from "./components/Chatbot";
import { searchByName, filterByCategory, randomMeal } from "./api/mealdb";
import { desiRecipes } from "./data/desiRecipes";

const QUICK_CATEGORIES = ["Chicken", "Vegetarian", "Dessert", "Seafood", "Breakfast", "Pasta"];
const FAVORITES_KEY = "kitchenBoardFavorites";
const DEFAULT_CATEGORY = "Chicken";

export default function App() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [emptyMessage, setEmptyMessage] = useState("");
  const [openMealId, setOpenMealId] = useState(null);
  const [chatOpen, setChatOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch {
        setFavorites([]);
      }
    }
    loadCategory(DEFAULT_CATEGORY);
  }, []);

  function persistFavorites(next) {
    setFavorites(next);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(next));
  }

  function toggleFavorite(id) {
    const next = favorites.includes(id) ? favorites.filter((f) => f !== id) : [...favorites, id];
    persistFavorites(next);
  }

  async function loadCategory(category) {
    setLoading(true);
    setShowFavoritesOnly(false);
    const results = await filterByCategory(category);
    setMeals(results || []);
    setEmptyMessage(results ? "" : "Couldn't reach the recipe box — check your connection and try again.");
    setLoading(false);
  }

  function loadDesiCorner() {
    setShowFavoritesOnly(false);
    setLoading(false);
    setMeals(desiRecipes);
    setEmptyMessage("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleSearch(query) {
    setLoading(true);
    setShowFavoritesOnly(false);
    const results = await searchByName(query);
    setMeals(results || []);
    setEmptyMessage(
      results ? `No recipes found for "${query}" — try a simpler word, or check the Desi Corner.` : "Couldn't reach the recipe box — try again."
    );
    setLoading(false);
  }

  async function handleSurpriseMe() {
    setLoading(true);
    setShowFavoritesOnly(false);
    const meal = await randomMeal();
    setMeals(meal ? [meal] : []);
    setEmptyMessage(meal ? "" : "Couldn't fetch a surprise right now — try again.");
    setLoading(false);
  }

  function handleGoHome() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    loadCategory(DEFAULT_CATEGORY);
  }

  function handleToggleFavoritesView() {
    setShowFavoritesOnly((v) => !v);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const visibleMeals = showFavoritesOnly ? meals.filter((m) => favorites.includes(m.idMeal)) : meals;

  return (
    <div className="min-h-screen bg-cream font-body">
      <Navbar
        onHome={handleGoHome}
        onDesiCorner={loadDesiCorner}
        onFavorites={handleToggleFavoritesView}
        onOpenChat={() => setChatOpen(true)}
        favoritesActive={showFavoritesOnly}
      />

      <Header />

      <div className="max-w-6xl mx-auto px-4 sm:px-8 pb-16">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
          <SearchBar onSearch={handleSearch} />
          <button
            onClick={handleSurpriseMe}
            className="font-body text-sm bg-white border border-sage/50 text-brown px-4 py-3 rounded-sm hover:border-olive transition-colors whitespace-nowrap"
          >
            🎲 Surprise me
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {QUICK_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => loadCategory(cat)}
              className="font-body text-xs px-3 py-1.5 rounded-full border border-sage/50 text-brown/70 hover:bg-sage hover:text-brown hover:border-sage transition-colors"
            >
              {cat}
            </button>
          ))}
          <button
            onClick={loadDesiCorner}
            className="font-body text-xs px-3 py-1.5 rounded-full border border-olive/50 text-olive hover:bg-olive hover:text-white transition-colors"
          >
            🌶️ Desi Corner
          </button>
        </div>

        <RecipeGrid
          meals={visibleMeals}
          onOpen={setOpenMealId}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          loading={loading}
          emptyMessage={showFavoritesOnly ? "No favorites pinned yet — tap the heart on a recipe to save it." : emptyMessage}
        />
      </div>

      {openMealId && (
        <RecipeModal
          mealId={openMealId}
          onClose={() => setOpenMealId(null)}
          isFavorite={favorites.includes(openMealId)}
          onToggleFavorite={toggleFavorite}
        />
      )}

      {chatOpen && (
        <Chatbot
          onClose={() => setChatOpen(false)}
          onOpenMeal={(id) => setOpenMealId(id)}
        />
      )}
    </div>
  );
}
