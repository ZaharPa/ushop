import { useForm } from "@inertiajs/react";
import { Search, X } from "lucide-react";

export default function SearchBox() {
    const { data, setData, get, processing } = useForm({
        query: "",
    });

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
                onChange={(e) => setData("query", e.target.value)}
                placeholder="Search ..."
                className="w-full text-sky-600 pl-2  bg-white rounded-2xl border border-gray-500 shadow-sm transition focus:outline-none focus:ring-2 focus:ring-emerald-200"
            />
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
