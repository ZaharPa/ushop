import { router, useForm, usePage } from "@inertiajs/react";

export default function FilterProduct({ filters, pageRoute }) {
    const { categories } = usePage().props;

    const { data, setData, get, processing, reset } = useForm({
        name: filters.name || "",
        category: filters.category || "",
    });

    const handleFilter = (e) => {
        e.preventDefault();
        get(route(pageRoute), {
            onSuccess: () => {
                reset();
            },
        });
    };

    const handleReset = () => {
        setData({
            name: "",
            category: "",
        });

        reset();

        router.visit(route(pageRoute), {
            replace: true,
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
                className="input-admin w-3/5"
            />
            <select
                className="w-1/4 input-admin"
                value={data.category}
                onChange={(e) => setData("category", e.target.value)}
            >
                <option value={""}>Category</option>
                {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>
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
