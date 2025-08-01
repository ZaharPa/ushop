import { useForm } from "@inertiajs/react";
import { Search, X } from "lucide-react";
import { useState } from "react";
import { route } from "ziggy-js";

export default function SearchBox() {
    const { data, setData, get, processing } = useForm({
        query: "",
    });

    const [suggestions, setSuggestions] = useState([]);

    const fetchSuggestions = async (query) => {
        if (query.length < 2) {
            setSuggestions([]);
            return;
        }

        try {
            const response = await fetch(
                `/api/search-suggestions?query=${query}`
            );
            if (response.ok) {
                const result = await response.json();
                setSuggestions(result.suggestions);
            }
        } catch (error) {
            console.error("Error fetching suggestions:", error);
            setSuggestions([]);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        get(route("catalog.index"), { query: data.query });
    };

    return (
        <form
            onSubmit={handleSearch}
            className="relative w-full max-w-md mx-auto"
        >
            <input
                type="text"
                value={data.query}
                onChange={(e) => {
                    setData("query", e.target.value);
                    fetchSuggestions(e.target.value);
                }}
                placeholder="Search ..."
                className="w-full text-sky-600 pl-2  bg-white rounded-2xl border border-gray-500 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-emerald-200"
            />

            {suggestions.length > 0 && (
                <ul className="absolute z-10 left-0 right-0 mt-1 bg-white border border-gray-300 rounded shadow-lg">
                    {suggestions.map((s, index) => (
                        <li
                            key={index}
                            onClick={() => {
                                setData("query", s);
                                setSuggestions([]);
                                get(route("catalog.index"), { query: s });
                            }}
                            className="px-4 py-2 hover:bg-sky-100 cursor-pointer"
                        >
                            {s}
                        </li>
                    ))}
                </ul>
            )}
            {data.query && (
                <button
                    type="button"
                    onClick={() => setData("query", "")}
                    className="absolute right-8 top-1.5 text-gray-400 hover:text-gray-700"
                >
                    <X className="w-4 h-4" />
                </button>
            )}

            <button
                type="submit"
                disabled={processing}
                className="absolute right-2 top-1.5"
            >
                <Search className="w-5 h-5 text-blue-600" />
            </button>
        </form>
    );
}
