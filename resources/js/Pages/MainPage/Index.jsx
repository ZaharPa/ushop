import CategorySlider from "@/Components/CategorySlider";
import Slider from "@/Components/Slider";
import { Link, usePage } from "@inertiajs/react";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Index() {
    const {
        slides,
        categories,
        latestProducts,
        latestComments,
        popularItems,
        discountedItems,
        auth,
    } = usePage().props;

    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const response = await axios.get(
                    route("product.recommendations")
                );
                setRecommendations(response.data);
            } catch (error) {
                console.error("Error fetching recommendations:", error);
            }
        };

        if (auth.user) {
            fetchRecommendations();
        }
    });

    return (
        <div>
            <Slider slides={slides} />

            {auth.user && (
                <>
                    <div className="bg-green-100 border border-green-400 text-green-700 p-4 text-center">
                        Recommendation
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {recommendations.map((product) => (
                            <Link
                                key={product.id}
                                href={route("product.show", [product.id])}
                                className="border border-sky-400 shadow rounded"
                            >
                                {product.photo_url && (
                                    <img
                                        src={product.photo_url}
                                        className="w-full h-40 object-cover"
                                    />
                                )}
                                <h3 className="mt-2 text-lg font-semibold text-sky-700">
                                    {product.name}
                                </h3>
                            </Link>
                        ))}
                    </div>
                </>
            )}

            <CategorySlider categories={categories} />

            <section className="mt-4">
                <h2 className="h2-center mb-2">Popular Items</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4">
                    {popularItems.map((item) => (
                        <Link
                            key={item.id}
                            href={route("product.show", [
                                item.product.id,
                                item.id,
                            ])}
                            className="border border-sky-400 shadow rounded-lg p-3 hover:shadow-lg transition"
                        >
                            {item.photos[0] && (
                                <img
                                    src={item.photos[0]?.photo_url}
                                    className="w-full h-40 object-cover rounded"
                                />
                            )}
                            <h3 className="mt-2 text-lg font-semibold text-sky-700">
                                {item.product.name}
                            </h3>
                            <p className="text-sm text-gray-500">
                                {item.discount ? (
                                    <span className="text-red-600">
                                        $
                                        {item.price -
                                            item.price *
                                                (item.discount.percentage /
                                                    100)}
                                    </span>
                                ) : (
                                    <span>${item.price}</span>
                                )}
                            </p>
                            <p className="text-xs text-gray-400">
                                Orders: {item.order_items_count}
                            </p>
                        </Link>
                    ))}
                </div>
            </section>

            <section className="mt-4 max-w-screen mx-auto px-4 py-8 bg-sky-700">
                <h2 className="h2-center mt-1 text-gray-100">Hot Discounts</h2>
                <div className="overflow-x-auto">
                    <div className="flex space-x-4 p-2">
                        {discountedItems.map((item) => (
                            <Link
                                key={item.id}
                                href={route("product.show", [
                                    item.product.id,
                                    item.id,
                                ])}
                                className="min-w-[140px] bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg hover:bg-blue-100 transition duration-200 p-4 text-center"
                            >
                                {item.product.photo_url && (
                                    <div className="h-30 w-full overflow-hidden rounded-t-lg">
                                        <img
                                            src={item.product.photo_url}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                )}
                                <h3 className="mt-2 text-lg font-semibold text-sky-600">
                                    {item.product.name}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    <span className="line-through mr-2">
                                        ${item.price}
                                    </span>
                                    <span className="text-red-600 font-bold">
                                        $
                                        {(
                                            item.price -
                                            item.price *
                                                (item.discount.percentage / 100)
                                        ).toFixed(2)}
                                    </span>
                                </p>
                                <p className="text-xs text-gray-400">
                                    Save {item.discount.percentage}%!
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section className="mt-4">
                <h2 className="h2-center mb-2">Latest Product</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4">
                    {latestProducts.map((product) => (
                        <Link
                            key={product.id}
                            href={route("product.show", [
                                product.id,
                                product.items?.[0] || "",
                            ])}
                            className="p-2 border border-sky-500 rounded-lg overflow-hidden hover:shadow-lg transition"
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

            <section className="mt-4">
                <h2 className="h2-center mb-2">Latest Comments</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
                    {latestComments.map((comment) => (
                        <div
                            key={comment.id}
                            className="p-4 border border-sky-400 rounded-lg shadow"
                        >
                            <p className="text-sm font-semibold">
                                {comment.user.name}
                            </p>
                            <p className="text-xs text-gray-600">
                                {new Date(
                                    comment.created_at
                                ).toLocaleDateString()}
                            </p>
                            <p className="text-gray-700">{comment.content}</p>
                            <Link
                                href={route("product.show", [
                                    comment.product.id,
                                    comment.product.items?.[0] || "",
                                ])}
                                className="text-sky-600 hover:underline hover:font-semibold mt-1 text-lg"
                            >
                                {comment.product.name}
                            </Link>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
