import FilterProduct from "@/Components/FilterProduct";
import Pagination from "@/Components/Pagination";
import { Link, usePage } from "@inertiajs/react";
import { Star } from "lucide-react";

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
                {products.data.map((product) => {
                    const firstItem = product.items?.[0];

                    return (
                        <Link
                            key={product.id}
                            href={
                                firstItem
                                    ? route("product.show", [
                                          product.id,
                                          firstItem.id,
                                      ])
                                    : "#"
                            }
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
                            <p className="text-sm text-yellow-500">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        size={14}
                                        className={
                                            star <=
                                            Math.round(product.average_rating)
                                                ? "text-yellow-400 inline-block mr-0.5"
                                                : "text-gray-600 inline-block mr-0.5"
                                        }
                                    />
                                ))}
                            </p>
                            <p className="text-sm text-sky-500">
                                {product.category?.name}
                            </p>
                            <p className="mt-2">
                                {firstItem ? (
                                    firstItem.discount ? (
                                        <>
                                            <span className="line-through text-gray-400 mr-2">
                                                ${firstItem.price}
                                            </span>
                                            <span className="text-red-500 font-semibold">
                                                $
                                                {firstItem.price -
                                                    firstItem.price *
                                                        (
                                                            firstItem.discount
                                                                .percentage /
                                                            100
                                                        ).toFixed(2)}
                                            </span>
                                        </>
                                    ) : (
                                        <span className="text-sky-800 font-bold">
                                            ${firstItem.price}
                                        </span>
                                    )
                                ) : (
                                    <span className="text-gray-400 italic">
                                        Not available
                                    </span>
                                )}
                            </p>
                        </Link>
                    );
                })}
            </div>

            <div className="flex justify-center">
                <Pagination links={products.links} />
            </div>
        </div>
    );
}
