import { useEffect, useState } from "react";
import { lookupById, extractIngredients } from "../api/mealdb";

export default function RecipeModal({ mealId, onClose, isFavorite, onToggleFavorite }) {
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    lookupById(mealId).then((data) => {
      if (!cancelled) {
        setMeal(data);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [mealId]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 bg-brown/70 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="recipe-card rounded-md max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {loading || !meal ? (
          <p className="text-center py-16 text-brown/70">Plating this one up…</p>
        ) : (
          <>
            <div className="flex justify-between items-start gap-4">
              <h2 className="font-heading text-2xl text-brown">{meal.strMeal}</h2>
              <button
                onClick={onClose}
                className="text-brown/50 hover:text-brown text-xl leading-none"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mt-2 mb-4">
              {meal.strCategory && (
                <span className="leaf-chip bg-olive text-white px-2 py-1 rounded">
                  {meal.strCategory}
                </span>
              )}
              {meal.strArea && (
                <span className="leaf-chip bg-sage text-brown px-2 py-1 rounded">
                  {meal.strArea}
                </span>
              )}
              <button
                onClick={() => onToggleFavorite(meal.idMeal)}
                className={`leaf-chip px-2 py-1 rounded border ${
                  isFavorite ? "bg-olive text-white border-olive" : "border-brown/30 text-brown/60"
                }`}
              >
                {isFavorite ? "♥ saved" : "♡ save"}
              </button>
            </div>

            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              className="w-full h-56 object-cover rounded-sm mb-4"
              onError={(e) => {
                if (meal.strMealThumbFallback && e.target.src !== meal.strMealThumbFallback) {
                  e.target.onerror = null;
                  e.target.src = meal.strMealThumbFallback;
                }
              }}
            />

            <h3 className="handwritten text-2xl text-olive mb-1">Ingredients 🍃</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 mb-4 leaf-chip text-sm text-brown">
              {extractIngredients(meal).map((item, i) => (
                <li key={i} className="border-b border-sage/30 py-1">
                  {item.measure} {item.ingredient}
                </li>
              ))}
            </ul>

            <div className="vintage-divider">
              <span>🌿</span>
            </div>

            <h3 className="handwritten text-2xl text-olive mb-1">Method</h3>
            <p className="whitespace-pre-line text-sm leading-relaxed font-body text-brown">
              {meal.strInstructions}
            </p>

            {meal.strYoutube && (
              <a
                href={meal.strYoutube}
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-4 text-olive underline text-sm"
              >
                Watch the video →
              </a>
            )}
          </>
        )}
      </div>
    </div>
  );
}
