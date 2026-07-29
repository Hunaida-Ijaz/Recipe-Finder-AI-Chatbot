import { placeholderFor } from "./placeholderImage";

// TheMealDB has very thin coverage of Pakistani/desi food, so these are
// curated locally to keep the chatbot from giving irrelevant answers when
// someone asks for karahi, biryani, nihari, and the like.
// Shaped like TheMealDB "meal" objects so the same RecipeCard/RecipeModal
// components can render them without any special-casing.

function makeMeal({ id, name, emoji, category, image, ingredients, instructions, keywords }) {
  const meal = {
    idMeal: `desi-${id}`,
    strMeal: name,
    strCategory: category,
    strArea: "Pakistani",
    strMealThumb: image,
    strMealThumbFallback: placeholderFor(name, emoji),
    strInstructions: instructions,
    strYoutube: "",
    __keywords: keywords,
  };
  ingredients.forEach(([ingredient, measure], i) => {
    meal[`strIngredient${i + 1}`] = ingredient;
    meal[`strMeasure${i + 1}`] = measure;
  });
  return meal;
}

export const desiRecipes = [
  makeMeal({
    id: "karahi",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Chicken_Karahi_in_Pakistan.jpg/600px-Chicken_Karahi_in_Pakistan.jpg",
    name: "Chicken Karahi",
    emoji: "🍗",
    category: "Chicken",
    keywords: ["karahi", "kadai chicken", "kadai"],
    ingredients: [
      ["Chicken, bone-in pieces", "1 kg"],
      ["Tomatoes, chopped", "4 medium"],
      ["Ginger garlic paste", "2 tbsp"],
      ["Green chillies", "4-5"],
      ["Cooking oil", "1/2 cup"],
      ["Cumin seeds", "1 tsp"],
      ["Red chilli flakes", "1 tbsp"],
      ["Coriander powder", "1 tsp"],
      ["Salt", "to taste"],
      ["Fresh ginger, julienned", "for garnish"],
      ["Fresh coriander", "for garnish"],
    ],
    instructions:
      "Heat oil in a karahi or wide, heavy pan and add cumin seeds until fragrant.\n\nAdd chicken pieces and sear on high heat until they change colour.\n\nAdd ginger garlic paste and cook for 2 minutes, then stir in chopped tomatoes, salt, and coriander powder.\n\nCover and cook on medium heat until the tomatoes break down into a thick masala and the oil separates on top, stirring occasionally so it doesn't stick.\n\nAdd green chillies and red chilli flakes, then cook uncovered for a few more minutes until the chicken is tender and the gravy is thick, not watery.\n\nGarnish with julienned ginger and fresh coriander. Serve hot with naan or roti.",
  }),
  makeMeal({
    id: "biryani",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Hyderabadi_Chicken_Biryani.jpg/600px-Hyderabadi_Chicken_Biryani.jpg",
    name: "Chicken Biryani",
    emoji: "🍚",
    category: "Rice",
    keywords: ["biryani", "biriyani", "biryani rice"],
    ingredients: [
      ["Basmati rice", "3 cups"],
      ["Chicken, bone-in pieces", "1 kg"],
      ["Yogurt", "1 cup"],
      ["Onions, fried and crushed", "2 cups"],
      ["Tomatoes, chopped", "3 medium"],
      ["Ginger garlic paste", "2 tbsp"],
      ["Biryani masala powder", "3 tbsp"],
      ["Whole spices (bay leaf, cardamom, cinnamon, cloves)", "1 set"],
      ["Saffron or yellow food colour", "a pinch, soaked in milk"],
      ["Fresh mint and coriander", "1 cup, chopped"],
      ["Cooking oil or ghee", "1/2 cup"],
      ["Salt", "to taste"],
    ],
    instructions:
      "Soak the basmati rice for 30 minutes, then par-boil it with whole spices and salt until it's about 70% cooked. Drain and set aside.\n\nIn a separate pot, heat oil and cook the ginger garlic paste briefly, then add chicken and sear until lightly browned.\n\nAdd tomatoes, yogurt, biryani masala, and salt. Cook covered until the chicken is tender and the masala thickens into a rich gravy.\n\nStir in half the fried onions, mint, and coriander.\n\nLayer the par-boiled rice over the chicken masala in the same pot. Sprinkle the remaining fried onions, mint, coriander, and the saffron milk over the top.\n\nCover tightly and cook on very low heat (dum) for 20-25 minutes so the flavours steam through the rice.\n\nGently fluff and mix just before serving, so the rice grains stay separate. Serve with raita.",
  }),
  makeMeal({
    id: "nihari",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Nihari.JPG/600px-Nihari.JPG",
    name: "Beef Nihari",
    emoji: "🍲",
    category: "Beef",
    keywords: ["nihari"],
    ingredients: [
      ["Beef shank, bone-in", "1 kg"],
      ["Wheat flour", "3 tbsp"],
      ["Onion, sliced", "1 large"],
      ["Ginger garlic paste", "2 tbsp"],
      ["Nihari masala (a blend of dry-roasted whole spices)", "3 tbsp"],
      ["Cooking oil or ghee", "1/2 cup"],
      ["Fresh ginger, lemon, green chillies", "for garnish"],
      ["Salt", "to taste"],
    ],
    instructions:
      "Heat oil in a heavy pot and fry the sliced onion until golden, then remove and set aside for garnish.\n\nIn the same oil, cook the ginger garlic paste briefly, then add the beef shank and sear until browned on all sides.\n\nAdd the nihari masala and salt, then pour in enough water to fully cover the meat. Bring to a boil, then reduce to a gentle simmer.\n\nCover and slow-cook for 4-5 hours (or use a pressure cooker to shorten this) until the meat is fall-apart tender and the broth is deeply flavoured.\n\nMix the wheat flour with a little water to make a smooth slurry, then stir it into the pot to thicken the broth to a stew-like consistency.\n\nServe hot, garnished with fried onions, julienned ginger, chopped green chillies, and a squeeze of lemon, alongside naan.",
  }),
  makeMeal({
    id: "haleem",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Pakistani_Haleem_served_with_garnish.jpg/600px-Pakistani_Haleem_served_with_garnish.jpg",
    name: "Chicken Haleem",
    emoji: "🥣",
    category: "Stew",
    keywords: ["haleem"],
    ingredients: [
      ["Chicken, bone-in pieces", "1 kg"],
      ["Mixed lentils (masoor, chana daal, moong)", "1 cup"],
      ["Broken wheat or cracked wheat", "1/2 cup"],
      ["Onion, sliced and fried", "1 large"],
      ["Ginger garlic paste", "2 tbsp"],
      ["Haleem masala", "3 tbsp"],
      ["Cooking oil or ghee", "1/2 cup"],
      ["Fresh ginger, lemon, green chillies, coriander", "for garnish"],
      ["Salt", "to taste"],
    ],
    instructions:
      "Soak the wheat and lentils separately for a couple of hours, then boil each until very soft. Blend or mash them into a smooth, thick paste.\n\nSeparately, cook the chicken with ginger garlic paste, haleem masala, and salt until fully tender, then shred the meat off the bone.\n\nCombine the shredded chicken, its cooking liquid, and the wheat-lentil paste in one large pot. Simmer on low heat, stirring frequently, until everything melds into a thick, porridge-like stew.\n\nIn a small pan, heat oil or ghee and pour it over the haleem as a finishing tarka.\n\nServe hot, topped with fried onions, julienned ginger, chopped green chillies, coriander, and a squeeze of lemon.",
  }),
  makeMeal({
    id: "seekh-kebab",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Pakistani_Food_Beef_Kabobs.jpg/600px-Pakistani_Food_Beef_Kabobs.jpg",
    name: "Seekh Kebab",
    emoji: "🍢",
    category: "Beef",
    keywords: ["seekh kebab", "seekh"],
    ingredients: [
      ["Ground beef or mutton mince", "1 kg"],
      ["Onion, finely grated and squeezed dry", "1 medium"],
      ["Ginger garlic paste", "1 tbsp"],
      ["Green chillies, finely chopped", "2-3"],
      ["Roasted, ground cumin and coriander seeds", "1 tsp each"],
      ["Red chilli powder", "1 tsp"],
      ["Fresh coriander, chopped", "1/4 cup"],
      ["Salt", "to taste"],
      ["Skewers", "as needed"],
    ],
    instructions:
      "Combine the mince with the grated onion, ginger garlic paste, chillies, roasted cumin and coriander, chilli powder, fresh coriander, and salt in a bowl.\n\nKnead the mixture firmly by hand for several minutes until it turns smooth and slightly sticky — this helps the kebabs hold together on the skewer.\n\nCover and rest in the fridge for at least 30 minutes.\n\nWet your hands and mould the mixture around skewers into long, even logs.\n\nGrill over charcoal or cook on a hot griddle, turning occasionally, until browned on the outside and cooked through.\n\nServe with naan, sliced onions, and chutney.",
  }),
  makeMeal({
    id: "chapli-kebab",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Chapli_Kabab.JPG/600px-Chapli_Kabab.JPG",
    name: "Chapli Kebab",
    emoji: "🥩",
    category: "Beef",
    keywords: ["chapli kebab", "chapli"],
    ingredients: [
      ["Ground beef mince", "1 kg"],
      ["Onion, finely chopped", "1 large"],
      ["Tomato, finely chopped (seeds removed)", "1 medium"],
      ["Coriander seeds, crushed", "1 tbsp"],
      ["Pomegranate seeds (anardana), crushed", "1 tbsp"],
      ["Green chillies, chopped", "2-3"],
      ["Egg", "1"],
      ["Cornflour", "2 tbsp"],
      ["Red chilli flakes", "1 tsp"],
      ["Cooking oil", "for shallow frying"],
      ["Salt", "to taste"],
    ],
    instructions:
      "Mix the mince with onion, tomato, crushed coriander seeds, anardana, green chillies, egg, cornflour, chilli flakes, and salt until well combined.\n\nShape the mixture into wide, flat, round patties — chapli kebabs are traditionally thin and broad rather than thick.\n\nHeat a generous layer of oil in a flat pan and shallow-fry the patties on medium heat until deeply golden and crisp on both sides and cooked through in the centre.\n\nDrain briefly on paper towels and serve hot with naan and yogurt chutney.",
  }),
  makeMeal({
    id: "korma",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Chicken_Korma.JPG/600px-Chicken_Korma.JPG",
    name: "Chicken Korma",
    emoji: "🍛",
    category: "Chicken",
    keywords: ["korma", "qorma"],
    ingredients: [
      ["Chicken, bone-in pieces", "1 kg"],
      ["Yogurt", "1 cup"],
      ["Onions, fried and crushed", "1 cup"],
      ["Ginger garlic paste", "2 tbsp"],
      ["Whole spices (cardamom, cinnamon, cloves, bay leaf)", "1 set"],
      ["Ground coriander and red chilli powder", "1 tsp each"],
      ["Cooking oil or ghee", "1/2 cup"],
      ["Salt", "to taste"],
    ],
    instructions:
      "Heat oil or ghee and fry the whole spices briefly until fragrant.\n\nAdd ginger garlic paste and cook for a minute, then add chicken and sear until it changes colour.\n\nWhisk the yogurt smooth and add it in gradually along with the crushed fried onions, coriander, chilli powder, and salt, stirring to prevent it from splitting.\n\nCover and simmer on low heat until the chicken is tender and the gravy turns thick and glossy with oil visible on top.\n\nServe with naan or steamed rice.",
  }),
  makeMeal({
    id: "pulao",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Chicken_Yakhni_Pulao.jpg/600px-Chicken_Yakhni_Pulao.jpg",
    name: "Chicken Pulao",
    emoji: "🍚",
    category: "Rice",
    keywords: ["pulao", "pilaf", "chicken pulao"],
    ingredients: [
      ["Basmati rice", "2 cups"],
      ["Chicken, bone-in pieces", "500 g"],
      ["Onion, sliced", "1 large"],
      ["Whole spices (cinnamon, cardamom, cloves, bay leaf, cumin)", "1 set"],
      ["Ginger garlic paste", "1 tbsp"],
      ["Cooking oil", "1/3 cup"],
      ["Salt", "to taste"],
    ],
    instructions:
      "Soak the rice for 20-30 minutes and drain.\n\nHeat oil and fry the sliced onion until golden brown, then remove half for garnish.\n\nIn the same pot, add whole spices and ginger garlic paste, then the chicken, and sear until lightly browned.\n\nAdd salt and enough water to cook the chicken through, simmering until tender. This forms the stock the rice will cook in.\n\nMeasure the remaining stock, add the drained rice, and top up with water to the correct ratio for basmati rice.\n\nBring to a boil, then cover and cook on very low heat until the rice is fluffy and fully cooked, without stirring too much so the grains stay whole.\n\nGarnish with the reserved fried onions before serving.",
  }),
  makeMeal({
    id: "keema",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Keema_Matar_%28a_dish_from_India%29.jpg/600px-Keema_Matar_%28a_dish_from_India%29.jpg",
    name: "Aloo Keema",
    emoji: "🥔",
    category: "Beef",
    keywords: ["keema", "qeema", "aloo keema"],
    ingredients: [
      ["Ground beef mince", "500 g"],
      ["Potatoes, cubed", "2 medium"],
      ["Onion, chopped", "1 medium"],
      ["Tomatoes, chopped", "2 medium"],
      ["Ginger garlic paste", "1 tbsp"],
      ["Cumin and coriander powder", "1 tsp each"],
      ["Red chilli powder", "1 tsp"],
      ["Cooking oil", "1/4 cup"],
      ["Fresh coriander", "for garnish"],
      ["Salt", "to taste"],
    ],
    instructions:
      "Heat oil and fry the onion until soft and golden.\n\nAdd ginger garlic paste, then the mince, breaking it up as it browns.\n\nStir in tomatoes, cumin, coriander powder, chilli powder, and salt, then cook until the tomatoes soften into a masala and the oil separates.\n\nAdd the cubed potatoes with a little water, cover, and simmer until both the potatoes and mince are fully cooked and the gravy thickens.\n\nGarnish with fresh coriander and serve with roti or plain rice.",
  }),
  makeMeal({
    id: "daal",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Dal_chawal.JPG/600px-Dal_chawal.JPG",
    name: "Daal Chawal (Lentils & Rice)",
    emoji: "🍛",
    category: "Vegetarian",
    keywords: ["daal", "dal chawal", "daal chawal", "lentil curry", "moong daal", "chana daal"],
    ingredients: [
      ["Mixed lentils (masoor and chana daal)", "1 cup"],
      ["Onion, chopped", "1 medium"],
      ["Tomato, chopped", "1 medium"],
      ["Ginger garlic paste", "1 tsp"],
      ["Cumin seeds", "1/2 tsp"],
      ["Turmeric and red chilli powder", "1/2 tsp each"],
      ["Cooking oil or ghee", "2 tbsp"],
      ["Cooked basmati rice", "for serving"],
      ["Salt", "to taste"],
    ],
    instructions:
      "Rinse the lentils and boil with turmeric and salt until soft, then lightly mash.\n\nIn a separate small pan, heat oil or ghee and add cumin seeds until they sizzle.\n\nAdd onion and cook until golden, then ginger garlic paste, tomato, and chilli powder, cooking until the tomato breaks down.\n\nPour this tarka over the cooked lentils and simmer together for a few minutes so the flavours combine.\n\nServe hot over steamed basmati rice.",
  }),
];

// Finds the first desi dish whose keyword list matches something in the text.
export function findDesiDish(text) {
  const t = text.toLowerCase();
  return desiRecipes.find((dish) => dish.__keywords.some((kw) => t.includes(kw))) || null;
}

// Detects a generic desi/Pakistani-food request with no specific dish named,
// so the chatbot can offer a spread instead of failing outright.
export function isGenericDesiRequest(text) {
  const t = text.toLowerCase();
  return /\b(desi|pakistani|pakistan)\b/.test(t) && !findDesiDish(text);
}

export function lookupDesiById(id) {
  return desiRecipes.find((d) => d.idMeal === id) || null;
}
