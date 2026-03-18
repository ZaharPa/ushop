import { Link } from "@inertiajs/react";

export default function CategorySlider({ categories }) {
    return (
        <div className="max-w-screen mx-auto px-4 md:px-6 py-8 md:py-12 bg-gradient-to-r from-sky-700 via-sky-600 to-blue-700 mt-6">
            <h2 className="h2-center mt-1 text-gray-100">Browse by Category</h2>
            <div className="overflow-x-auto pb-4 scrollbar-hide">
                <div className="flex space-x-4 md:space-x-6 px-2">
                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            href={
                                route("catalog.index") +
                                `?category=${category.slug}`
                            }
                            className=" max-w-[200px] bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-4 text-center overflow-hidden flex-shrink-0 hover:-translate-y-2"
                        >
                            <div className="aspect-square w-full overflow-hidden rounded-lg mb-3">
                                <img
                                    src={category.image_url}
                                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
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
