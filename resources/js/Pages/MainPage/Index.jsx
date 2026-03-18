import CategorySlider from "@/Components/CategorySlider";
import RecentlyViewed from "@/Components/RecentlyViewed";
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
        recentlyViewed,
    } = usePage().props;

    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        const fetchRecommendations = async () => {
            try {
                const response = await axios.get(
                    route("product.recommendations"),
                );
                setRecommendations(response.data);
            } catch (error) {
                console.error("Error fetching recommendations:", error);
            }
        };

        fetchRecommendations();
    }, []);

    return (
        <div className="p-4">
            <Slider slides={slides} />

            <section className="mt-6 mx-4 bg-white border border-sky-200 text-sky-900 rounded-xl shadow-lg p-4 text-center">
                <h2 className="h2-center">Recommendation</h2>
                <div className="overflow-x-auto pb-4">
                    <div className="flex space-x-4 md:space-x-6">
                        {recommendations.map((product) => (
                            <Link
                                key={product.id}
                                href={route("product.show", [
                                    product.id,
                                    product.items?.[0],
                                ])}
                                className="card-product max-w-[200px]"
                            >
                                <div className="aspect-square w-full overflow-hidden rounded-lg mb-3">
                                    {product.photo_url && (
                                        <img
                                            src={product.photo_url}
                                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                                        />
                                    )}
                                </div>
                                <h3 className="text-sm md:text-base font-semibold text-sky-700 line-clamp-2">
                                    {product.name}
                                </h3>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <CategorySlider categories={categories} />

            <section className="mt-8 px-4 bg-white border border-sky-200 rounded-xl p-6 shadow-sm">
                <h2 className="h2-center mb-6">Popular Items</h2>
                <div className="flex flex-wrap gap-4 md:gap-6 px-4">
                    {popularItems.map((item) => (
                        <Link
                            key={item.id}
                            href={route("product.show", [
                                item.product.id,
                                item.id,
                            ])}
                            className="card-product max-w-[200px]"
                        >
                            <div className="aspect-square w-full overflow-hidden rounded-lg mb-3">
                                {item.photos[0] && (
                                    <img
                                        src={item.photos[0]?.photo_url}
                                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                                    />
                                )}
                            </div>

                            <h3 className="mt-2 text-sm md:text-base font-semibold text-sky-700">
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

            <section className="mt-8 mx-4 px-6 py-10 bg-gradient-to-br from-sky-600 via-sky-700 to-blue-600 rounded-xl shadow-lg">
                <h2 className="h2-center mb-8 text-white">Hot Discounts</h2>
                <div className="overflow-x-auto">
                    <div className="flex space-x-4 p-2">
                        {discountedItems.map((item) => (
                            <Link
                                key={item.id}
                                href={route("product.show", [
                                    item.product.id,
                                    item.id,
                                ])}
                                className="max-w-[200px] bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg hover:bg-blue-100 transition duration-200 p-4 text-center"
                            >
                                <div className="aspect-square w-full overflow-hidden rounded-lg mb-3">
                                    {item.product.photo_url && (
                                        <div className="h-30 w-full overflow-hidden rounded-t-lg">
                                            <img
                                                src={item.product.photo_url}
                                                className="w-full h-full object-cover hover:scale110 transition-transform duration-300"
                                            />
                                        </div>
                                    )}
                                </div>

                                <h3 className="mt-2 text-sm md:text-base font-semibold text-sky-600">
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

            <section className="mt-8 px-4">
                <h2 className="h2-center mb-2">Latest Product</h2>
                <div className="overflow-x-auto pb-4">
                    <div className="flex space-x-4 md:space-x-6">
                        {latestProducts.map((product) => (
                            <Link
                                key={product.id}
                                href={route("product.show", [
                                    product.id,
                                    product.items?.[0] || "",
                                ])}
                                className="card-product max-w-[200px]"
                            >
                                <div className="aspect-square w-full overflow-hidden rounded-lg mb-3">
                                    {product.photo_url && (
                                        <img
                                            src={product.photo_url}
                                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                                        />
                                    )}
                                </div>
                                <div className="p-2">
                                    <h3 className="text-sm md:text-base text-sky-800 font-semibold">
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
                                                        product.items[0].price,
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
                </div>
            </section>

            <section className="mt-8 mx-4 bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <h2 className="h2-center mb-6">Latest Comments</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {latestComments.slice(0, 8).map((comment) => (
                        <div
                            key={comment.id}
                            className="p-4 border border-gray-300 rounded-lg bg-white hover:shadow-md transition shadow"
                        >
                            <p className="text-sm font-semibold text-sky-800">
                                {comment.user.name}
                            </p>
                            <p className="text-xs text-gray-500">
                                {new Date(
                                    comment.created_at,
                                ).toLocaleDateString()}
                            </p>
                            <p className="text-gray-700">{comment.content}</p>
                            <Link
                                href={route("product.show", [
                                    comment.product.id,
                                    comment.product.items?.[0] || "",
                                ])}
                                className="text-sky-700 hover:text-sky-900 hover:underline mt-1 text-lg"
                            >
                                {comment.product.name}
                            </Link>
                        </div>
                    ))}
                </div>
            </section>

            <section className="mt-8 px-4">
                <RecentlyViewed recentlyViewed={recentlyViewed} />
            </section>
        </div>
    );
}
