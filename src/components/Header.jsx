export default function Header() {
  return (
    <div className="text-center py-10 sm:py-14 px-4">
      <p className="handwritten text-2xl sm:text-3xl text-olive mb-1">est. today, Naida's kitchen</p>
      <h1 className="font-heading text-4xl sm:text-5xl text-brown leading-tight">
        Naida Bites
      </h1>
      <p className="font-body text-brown/70 mt-3 max-w-lg mx-auto">
        Pin a dish, an ingredient, or a craving — find the recipe, or ask the
        kitchen what to cook, from everyday favourites to desi classics.
      </p>

      <div className="vintage-divider max-w-xs mx-auto mt-6">
        <span>🌿</span>
      </div>
    </div>
  );
}
