import RecipeCard from "./RecipeCard";

export default function RecipeGrid({ meals, onOpen, favorites, onToggleFavorite, loading, emptyMessage }) {
  if (loading) {
    return (
      <div className="text-center py-16 text-brown/60 font-body">
        Stirring the pot…
      </div>
    );
  }

  if (!meals || meals.length === 0) {
    return (
      <div className="text-center py-16 text-brown/60 font-body">
        {emptyMessage || "No recipes here yet — try another search."}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
      {meals.map((meal) => (
        <RecipeCard
          key={meal.idMeal}
          meal={meal}
          onOpen={onOpen}
          onToggleFavorite={onToggleFavorite}
          isFavorite={favorites.includes(meal.idMeal)}
        />
      ))}
    </div>
  );
}
