import FilterProduct from "@/Components/FilterProduct";
import Pagination from "@/Components/Pagination";
import { Link, usePage } from "@inertiajs/react";
import { Star } from "lucide-react";

export default function Catalog() {
    const { products, categories, filters } = usePage().props;

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
            <FilterProduct
                filters={filters}
                pageRoute="catalog.index"
                categories={categories}
                withPrice={true}
            />

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
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
                                "p-4 rounded-xl shadow-md border overflow-hidden transition-all duration-300 " +
                                (product.items_min_price === null
                                    ? "border-gray-300 opacity-50 italic bg-gray-100 cursor-not-allowed"
                                    : "border-sky-300 hover:shadow-xl hover:-translate-y-2 hover:border-sky-500 bg-white")
                            }
                        >
                            <div className="aspect-square w-full overflow-hidden">
                                <img
                                    src={product.photo_url}
                                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                                />
                            </div>

                            <div className="p-4">
                                <p className="text-xs text-sky-600">
                                    {product.category?.name}
                                </p>
                                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                                    {product.name}
                                </h3>

                                <div className="flex items-center gap-1 mb-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                            key={star}
                                            size={14}
                                            className={
                                                star <=
                                                Math.round(
                                                    product.average_rating,
                                                )
                                                    ? "fill-yellow-400 text-yellow-400"
                                                    : "text-gray-600"
                                            }
                                        />
                                    ))}
                                    <span className="text-xs text-gray-600 ml-1">
                                        {Number(product.average_rating).toFixed(
                                            1,
                                        )}
                                    </span>
                                </div>

                                <p className="mt-2">
                                    {firstItem ? (
                                        firstItem.discount ? (
                                            <div className="flex flex-col">
                                                <span className=" text-xs line-through text-gray-400 mr-2">
                                                    ${firstItem.price}
                                                </span>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-lg text-red-600 font-semibold">
                                                        $
                                                        {firstItem.price -
                                                            firstItem.price *
                                                                (
                                                                    firstItem
                                                                        .discount
                                                                        .percentage /
                                                                    100
                                                                ).toFixed(2)}
                                                    </span>
                                                    <span className="text-green-600 text-xs bg-green-100 p-1 rounded-full font-bold">
                                                        -
                                                        {
                                                            firstItem.discount
                                                                .percentage
                                                        }
                                                        %
                                                    </span>
                                                </div>
                                            </div>
                                        ) : (
                                            <span className="text-lg font-bold text-sky-800">
                                                ${firstItem.price}
                                            </span>
                                        )
                                    ) : (
                                        <span className="text-gray-400 text-sm italic">
                                            Not available
                                        </span>
                                    )}
                                </p>
                            </div>
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
