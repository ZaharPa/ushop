import CategorySlider from "@/Components/CategorySlider";
import Slider from "@/Components/Slider";
import { Link, usePage } from "@inertiajs/react";

export default function Index() {
    const { slides, categories, latestProducts, latestComments, popularItems } =
        usePage().props;
    return (
        <div>
            <Slider slides={slides} />

            <CategorySlider categories={categories} />

            <section>
                <h2 className="h2-center mb-2">Latest Product</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4">
                    {latestProducts.map((product) => (
                        <Link
                            key={product.id}
                            href={route("product.show", [
                                product.id,
                                product.items?.[0] || "",
                            ])}
                            className="p-2 border border-sky-700 rounded-lg overflow-hidden hover:border-2 hover:shadow-xl transition-all duration-200"
                        >
                            <img
                                src={product.photo_url}
                                className="w-full h-40 object-cover"
                            />
                            <div className="p-2">
                                <h3 className="text-lg text-sky-800 font-semibold">
                                    {product.name}
                                </h3>
                                <p className="text-sm text-gray-500">
                                    {product.items?.[0] ? (
                                        product.items[0].discount ? (
                                            <span className="text-red-600">
                                                $
                                                {product.items[0].price *
                                                    (
                                                        1 -
                                                        product.items[0]
                                                            .discount
                                                            .percentage /
                                                            100
                                                    ).toFixed(2)}
                                            </span>
                                        ) : (
                                            <span>
                                                $
                                                {Number(
                                                    product.items[0].price
                                                ).toFixed(2)}
                                            </span>
                                        )
                                    ) : (
                                        <span className="text-gray-400">
                                            N/A
                                        </span>
                                    )}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            <section>
                <h2 className="h2-center mb-2">Latest Comments</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
                    {latestComments.map((comment) => (
                        <div
                            key={comment.id}
                            className="bg-sky-600 text-white p-4 border rounded-lg shadow border-gray-400"
                        >
                            <p className="text-sm font-semibold">
                                {comment.user.name}
                            </p>
                            <p className="text-xs text-gray-300">
                                {new Date(
                                    comment.created_at
                                ).toLocaleDateString()}
                            </p>
                            <p className="text-gray-200">{comment.content}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
