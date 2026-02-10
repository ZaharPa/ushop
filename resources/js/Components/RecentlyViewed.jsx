import { Link } from "@inertiajs/react";

export default function RecentlyViewed({ recentlyViewed }) {
    return (
        <div className="bg-sky-50 border border-sky-300 text-sky-900 p-4 text-center">
            <h2 className="h2-center">Your History</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {recentlyViewed.map((item) => (
                    <Link
                        key={item.product.id}
                        href={route("product.show", [
                            item.product.id,
                            item.product.items?.[0],
                        ])}
                        className="card-product"
                    >
                        {item.product.photo_url && (
                            <img
                                src={item.product.photo_url}
                                className="w-full h-40 object-cover"
                            />
                        )}
                        <h3 className="mt-2 text-lg font-semibold text-sky-700">
                            {item.product.name}
                        </h3>
                    </Link>
                ))}
            </div>
        </div>
    );
}
