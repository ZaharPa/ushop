import FilterProduct from "@/Components/FilterProduct";
import Pagination from "@/Components/Pagination";
import { usePage } from "@inertiajs/react";

export default function Catalog() {
    const { products, categories, filters } = usePage().props;

    return (
        <div className="p-4 max-w-7xl">
            <FilterProduct
                filters={filters}
                pageRoute="catalog.index"
                categories={categories}
                withPrice={true}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                {products.data.map((product) => (
                    <div
                        key={product.id}
                        className={
                            "p-4 rounded shadow border " +
                            (product.items_min_price === null
                                ? "border-gray-300 opacity-50 italic bg-gray-50"
                                : "border-blue-400 hover:shadow-lg hover:-translate-y-1 transition-transform duration-200 bg-white")
                        }
                    >
                        <img
                            src={product.photo_url}
                            className="w-full h-48 object-cover mb-2 rounded"
                        />

                        <h3 className="text-lg font-semibold text-sky-700">
                            {product.name}
                        </h3>
                        <p className="text-sm text-sky-500">
                            {product.category?.name}
                        </p>
                        <p className="text-sky-800 font-bold mt-2">
                            {product.items_min_price !== null
                                ? `Start from - $${product.items_min_price}`
                                : "Not available"}
                        </p>
                    </div>
                ))}
            </div>

            <div className="flex justify-center">
                <Pagination links={products.links} />
            </div>
        </div>
    );
}
