import FilterProduct from "@/Components/FilterProduct";
import { useForm, usePage } from "@inertiajs/react";

export default function Catalog() {
    const { products, categories, filters } = usePage().props;

    const { data, setData, get } = useForm({
        category: filters.category || "",
        min_price: filters.min_price || "",
        max_price: filters.max_price || "",
        search: filters.search || "",
    });

    const submit = (e) => {
        e.preventDefault();
        get(route("catalog.index"), { preserveScroll: true });
    };

    return (
        <div className="p-4 max-w-7xl">
            <FilterProduct
                filters={filters}
                pageRoute="catalog.index"
                categories={categories}
            />
        </div>
    );
}
