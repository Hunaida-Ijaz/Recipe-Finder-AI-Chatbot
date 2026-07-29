import { useEffect, useRef, useState } from "react";
import {
  searchByName,
  filterByIngredient,
  filterByCategory,
  filterByArea,
  randomMeal,
} from "../api/mealdb";
import { classifyMessage } from "../utils/chatParser";
import { findDesiDish, isGenericDesiRequest, desiRecipes } from "../data/desiRecipes";

const GREETING = {
  role: "bot",
  text:
    "Hi! I'm Naida Bites' kitchen helper 🌿 Tell me an ingredient you have, a cuisine, a category (like dessert or vegetarian), a desi favourite (karahi, biryani, nihari...), or say \"surprise me\".",
};

// Runs a single classified attempt against the right data source. Returns
// an array of meals (possibly empty) or null on a network failure.
async function runAttempt(attempt, originalText) {
  switch (attempt.type) {
    case "random": {
      const meal = await randomMeal();
      return meal ? [meal] : [];
    }
    case "area":
      return filterByArea(attempt.value);
    case "category":
      return filterByCategory(attempt.value);
    case "name":
      return searchByName(attempt.value);
    case "ingredient": {
      let meals = await filterByIngredient(attempt.value);
      if ((!meals || meals.length === 0) && attempt.allKeywords) {
        for (const word of attempt.allKeywords.slice(1)) {
          meals = await filterByIngredient(word);
          if (meals && meals.length) break;
        }
      }
      return meals;
    }
    default:
      return [];
  }
}

function labelFor(attempt) {
  switch (attempt.type) {
    case "random":
      return "Feeling lucky? Try this one:";
    case "area":
      return `Here's some ${attempt.value} cooking:`;
    case "category":
      return `Good call — here's some ${attempt.value}:`;
    case "name":
      return "Found this:";
    case "ingredient":
      return "With that in the kitchen, you could make:";
    default:
      return "Here's what I found:";
  }
}

async function buildReply(text) {
  // Desi dishes get first priority — TheMealDB barely covers them, so a
  // local, curated match beats sending the request to the API at all.
  const desiMatch = findDesiDish(text);
  if (desiMatch) {
    return { text: `That's a desi favourite 🌿 Here's how to make ${desiMatch.strMeal}:`, meals: [desiMatch] };
  }
  if (isGenericDesiRequest(text)) {
    const sample = [...desiRecipes].sort(() => 0.5 - Math.random()).slice(0, 4);
    return { text: "Here's a spread of desi favourites to pick from:", meals: sample };
  }

  const attempts = classifyMessage(text);

  try {
    for (const attempt of attempts) {
      const meals = await runAttempt(attempt, text);
      if (meals === null) {
        return { text: "The connection to the recipe box dropped — mind trying again?" };
      }
      if (meals && meals.length) {
        return { text: labelFor(attempt), meals: meals.slice(0, 6) };
      }
    }
    return {
      text: "I couldn't match that to anything in the recipe box — try a dish name, an ingredient, a cuisine, or a desi favourite like biryani or karahi.",
    };
  } catch {
    return { text: "Something went wrong looking that up — mind trying again?" };
  }
}

export default function Chatbot({ onClose, onOpenMeal }) {
  const [messages, setMessages] = useState([GREETING]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, busy]);

  async function handleSend(e) {
    e.preventDefault();
    const text = input.trim();
    if (!text || busy) return;

    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setBusy(true);

    const reply = await buildReply(text);
    setMessages((m) => [...m, { role: "bot", ...reply }]);
    setBusy(false);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-brown/70 p-0 sm:p-4">
      <div className="recipe-card rounded-md w-full sm:max-w-md h-[85vh] sm:h-[600px] flex flex-col overflow-hidden">
        <div className="wood-texture flex items-center justify-between px-4 py-3">
          <h2 className="handwritten text-3xl text-cream">Ask the Kitchen 🍃</h2>
          <button onClick={onClose} className="text-cream/70 hover:text-cream text-xl leading-none" aria-label="Close chat">
            ✕
          </button>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-cream">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[85%] rounded-md px-3 py-2 text-sm font-body ${
                  m.role === "user"
                    ? "bg-olive text-white"
                    : "bg-white text-brown border border-sage/40"
                }`}
              >
                <p>{m.text}</p>
                {m.meals && (
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {m.meals.map((meal) => (
                      <button
                        key={meal.idMeal}
                        onClick={() => onOpenMeal(meal.idMeal)}
                        className="text-left bg-cream rounded-sm overflow-hidden border border-sage/30 hover:ring-2 hover:ring-olive"
                      >
                        <img
                          src={meal.strMealThumb}
                          alt={meal.strMeal}
                          className="w-full h-16 object-cover"
                          onError={(e) => {
                            if (meal.strMealThumbFallback && e.target.src !== meal.strMealThumbFallback) {
                              e.target.onerror = null;
                              e.target.src = meal.strMealThumbFallback;
                            }
                          }}
                        />
                        <span className="block leaf-chip px-1 py-1 leading-tight">
                          {meal.strMeal}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          {busy && (
            <div className="flex justify-start">
              <div className="bg-white text-brown/60 rounded-md px-3 py-2 text-sm font-body border border-sage/30">
                checking the pantry…
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSend} className="p-3 border-t border-sage/30 bg-white flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. chicken karahi, or I have chicken and rice"
            className="flex-1 rounded-sm px-3 py-2 bg-cream text-brown font-body text-sm focus:outline-none focus:ring-2 focus:ring-olive"
          />
          <button
            type="submit"
            disabled={busy}
            className="px-4 py-2 bg-olive text-white rounded-sm text-sm font-heading disabled:opacity-50"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
