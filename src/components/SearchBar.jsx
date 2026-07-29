import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [value, setValue] = useState("");

  function submit(e) {
    e.preventDefault();
    if (value.trim()) onSearch(value.trim());
  }

  return (
    <form onSubmit={submit} className="flex gap-2 w-full max-w-xl">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search a dish… e.g. biryani, tacos, pancakes"
        className="flex-1 rounded-sm px-4 py-3 bg-white text-brown font-body placeholder:text-brown/40 border border-sage/40 focus:outline-none focus:ring-2 focus:ring-olive"
      />
      <button
        type="submit"
        className="px-5 py-3 bg-olive text-white font-heading rounded-sm hover:bg-brown transition-colors"
      >
        Search
      </button>
    </form>
  );
}
