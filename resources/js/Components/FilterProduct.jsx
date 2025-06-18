import { useForm } from "@inertiajs/react";

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
    });

    const handleFilter = (e) => {
        e.preventDefault();
        get(route(pageRoute), {
            preserveScroll: true,
            preserveState: true,
        });
    };

    const handleReset = () => {
        setData({
            name: "",
            category: "",
            sort: "",
            min_price: "",
            max_price: "",
        });

        get(route(pageRoute), {
            preserveState: false,
        });
    };
    return (
        <form
            onSubmit={handleFilter}
            className="flex flex-wrap w-full justify-center gap-2 mb-3"
        >
            <input
                type="text"
                placeholder="Name product"
                value={data.name}
                onChange={(e) => setData("name", e.target.value)}
                className="input-admin w-3/4"
            />
            <select
                className="w-1/5 input-admin"
                value={data.category}
                onChange={(e) => setData("category", e.target.value)}
            >
                <option value={""}>Category</option>
                {categories.map((category) => (
                    <option key={category.id} value={category.slug}>
                        {category.name}
                    </option>
                ))}
            </select>

            {withPrice && (
                <>
                    <input
                        type="number"
                        placeholder="Min price"
                        value={data.min_price}
                        onChange={(e) => setData("min_price", e.target.value)}
                        className="input-admin w-1/5"
                    />

                    <input
                        type="number"
                        placeholder="Max price"
                        value={data.max_price}
                        onChange={(e) => setData("max_price", e.target.value)}
                        className="input-admin w-1/5"
                    />

                    <select
                        value={data.sort}
                        onChange={(e) => setData("sort", e.target.value)}
                        className="input-admin w-1/5"
                    >
                        <option value="">Sort by</option>
                        <option value="price_asc">Min Price</option>
                        <option value="price_desc">Max Price</option>
                    </select>
                </>
            )}

            <div className="flex gap-3">
                <button
                    type="submit"
                    disabled={processing}
                    className="btn-admin"
                >
                    {processing ? "Applying..." : "Filter"}
                </button>
                <button
                    type="reset"
                    onClick={handleReset}
                    className="btn-reset"
                >
                    Reset
                </button>
            </div>
        </form>
    );
}
