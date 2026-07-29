export default function RecipeCard({ meal, onOpen, onToggleFavorite, isFavorite }) {
  return (
    <div
      className="recipe-card rounded-md p-3 pt-4 cursor-pointer transition-transform hover:-translate-y-1"
      onClick={() => onOpen(meal.idMeal)}
    >
      <span className="leaf-badge">🍃</span>
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="w-full h-36 object-cover rounded-sm mb-3"
        loading="lazy"
        onError={(e) => {
          if (meal.strMealThumbFallback && e.target.src !== meal.strMealThumbFallback) {
            e.target.onerror = null;
            e.target.src = meal.strMealThumbFallback;
          }
        }}
      />
      <h3 className="font-heading text-lg leading-snug text-brown pr-2">{meal.strMeal}</h3>
      <div className="flex items-center justify-between mt-2">
        <span className="leaf-chip text-brown/50">{meal.strArea || meal.strCategory || ""}</span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(meal.idMeal);
          }}
          className={`text-lg leading-none ${isFavorite ? "text-olive" : "text-brown/25 hover:text-olive"}`}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          ♥
        </button>
      </div>
    </div>
  );
}
