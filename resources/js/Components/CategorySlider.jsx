import { Link } from "@inertiajs/react";

export default function CategorySlider({ categories }) {
    return (
        <div className="max-w-screen mx-auto px-4 py-8 bg-sky-700">
            <h2 className="h2-center mt-1 text-gray-100">Browse by Category</h2>
            <div className="overflow-x-auto">
                <div className="flex space-x-4">
                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            href={
                                route("catalog.index") +
                                `?category=${category.slug}`
                            }
                            className="min-w-[140px] bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg hover:bg-blue-100 transition duration-200 p-4 text-center"
                        >
                            <div className="h-24 w-full overflow-hidden rounded-t-lg">
                                <img
                                    src={category.image_url}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-3 font-semibold">
                                {category.name}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
