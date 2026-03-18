import { router, useForm } from "@inertiajs/react";
import { Search, SlidersHorizontal, X } from "lucide-react";

export default function FilterProduct({
    filters,
    pageRoute,
    categories,
    withPrice = false,
}) {
    const { data, setData, get, processing } = useForm({
        name: filters.name || "",
        category: filters.category || "",
        sort: filters.sort || "",
        min_price: filters.min_price || "",
        max_price: filters.max_price || "",
        showUnavailable: filters.showUnavailable || false,
    });

    const handleFilter = (e) => {
        e.preventDefault();
        get(route(pageRoute), {
            preserveScroll: true,
            preserveState: true,
        });
    };

    const hasActiveFilters =
        data.name ||
        data.category ||
        data.sort ||
        data.min_price ||
        data.max_price ||
        data.showUnavailable;

    return (
        <form
            onSubmit={handleFilter}
            className="w-full justify-center gap-2 mb-3 bg-white border-2 border-sky-200 shadow-md rounded-xl p-4"
        >
            <div className="flex items-center gap-2 mb-4">
                <SlidersHorizontal className="w-5 h-5 text-sky-600" />
                <h2 className="text-lg font-bold text-gray-900">Filters</h2>
                {hasActiveFilters && (
                    <span className="ml-auto text-xs font-semibold text-sky-600 bg-sky-100 px-2 py-1 rounded-full">
                        Active
                    </span>
                )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Search Product
                    </label>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by name"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="input-admin w-full pl-10 pr-4 py-2.5"
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                    </label>
                    <select
                        className="input-admin w-full px-4 py-2.5"
                        value={data.category}
                        onChange={(e) => setData("category", e.target.value)}
                    >
                        <option value={""}>All Category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.slug}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                {withPrice && (
                    <>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Min Price
                            </label>
                            <input
                                type="number"
                                placeholder="$ 0"
                                value={data.min_price}
                                min="0"
                                step="0.01"
                                onChange={(e) =>
                                    setData("min_price", e.target.value)
                                }
                                className="input-admin w-full px-4 py-2.5"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Max Price
                            </label>
                            <input
                                type="number"
                                placeholder="$ 9999+"
                                value={data.max_price}
                                min="0"
                                step="0.01"
                                onChange={(e) =>
                                    setData("max_price", e.target.value)
                                }
                                className="input-admin w-full px-4 py-2.5"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Sort By
                            </label>
                            <select
                                value={data.sort}
                                onChange={(e) =>
                                    setData("sort", e.target.value)
                                }
                                className="input-admin w-full px-4 py-2.5"
                            >
                                <option value="">Sort by</option>
                                <option value="price_asc">Min Price</option>
                                <option value="price_desc">Max Price</option>
                                <option value="name_asc">A-Z</option>
                                <option value="name_desc">Z-A</option>
                                <option value="newest">Newest</option>
                                <option value="oldest">Oldest</option>
                            </select>
                        </div>

                        <div className="flex items-center">
                            <label className="flex items-center gap-3 cursor-pointer mt-6">
                                <input
                                    type="checkbox"
                                    checked={data.showUnavailable}
                                    onChange={(e) =>
                                        setData(
                                            "showUnavailable",
                                            e.target.checked,
                                        )
                                    }
                                    className="w-5 h-5 text-sky-600 border border-gray-300 rounded focus:ring focus:ring-sky-500 transition-all"
                                />
                                <span className="text-sm font-medium text-gray-700">
                                    Show Unavailable
                                </span>
                            </label>
                        </div>
                    </>
                )}
            </div>

            <div className="flex flex-wrap gap-3 mt-6 pt-4 border-t border-gray-200">
                <button
                    type="submit"
                    disabled={processing}
                    className="btn-primary"
                >
                    <Search size={18} />
                    {processing ? "Applying..." : "Filter"}
                </button>

                {hasActiveFilters && (
                    <button
                        type="button"
                        onClick={() => router.get(route(pageRoute))}
                        className="btn-secondary"
                    >
                        <X size={18} />
                        Reset
                    </button>
                )}
            </div>
        </form>
    );
}
