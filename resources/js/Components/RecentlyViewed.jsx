import { Link } from "@inertiajs/react";

export default function RecentlyViewed({ recentlyViewed }) {
    return (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h2 className="h2-center">Your History</h2>
            <div className="overflow-x-auto pb-4">
                <div className="flex space-x-4 md:space-x-6">
                    {recentlyViewed.map((item) => (
                        <Link
                            key={item.product.id}
                            href={route("product.show", [
                                item.product.id,
                                item.product.items?.[0],
                            ])}
                            className="card-product max-w-[120px] md:max-w-[160px] flex-shrink-0"
                        >
                            {item.product.photo_url && (
                                <div className="aspect-square w-full overflow-hidden rounded-lg mb-3">
                                    <img
                                        src={item.product.photo_url}
                                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                                    />
                                </div>
                            )}
                            <h3 className="text-sm font-semibold text-sky-700 line-clamp-2">
                                {item.product.name}
                            </h3>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
