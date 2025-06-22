import { Link, usePage } from "@inertiajs/react";

export default function ShowProduct() {
    const { product, item } = usePage().props;

    return (
        <div className="max-w-5xl mx-auto p-6">
            <h1 className="text-2xl font-bold text-sky-800 mb-1">
                {product.name}
            </h1>
            <p className="text-gray-500 mb-3">{product.category.name}</p>
            <p className="text-xl text-sky-700 font-semibold mb-2">
                ${item.price}
            </p>

            <p className="text-gray-700 mb-4">{product.description}</p>

            {item.photos.length > 0 && (
                <div className="flex gap-3 overflow-x-auto mb-6">
                    {item.photos.map((photo) => (
                        <img
                            key={photo.id}
                            src={photo.photo_url}
                            className="h-56 rounded shadow-md object-cover"
                        />
                    ))}
                </div>
            )}

            {product.features.length > 0 && (
                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-sky-700 mb-2">
                        Product Features
                    </h3>
                    <ul className="list-disc list-inside text-sm text-gray-700">
                        {product.features.map((feature) => (
                            <li key={feature.id}>
                                <span className="font-medium">
                                    {feature.name}:{" "}
                                </span>{" "}
                                {feature.pivot.value}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {item.attribute_values.length > 0 && (
                <div className="mb-4">
                    <h3 className="text-lg font-semibold text-sky-700 mb-2">
                        Product Features
                    </h3>
                    {item.attribute_values.map((attr) => (
                        <div key={attr.id}>
                            <div>
                                {attr.attribute.name} - {attr.value}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <h2 className="text-xl font-semibold text-sky-800 mb-2">
                Other Variants
            </h2>
            <div className="flex flex-wrap gap-2">
                {product.items.map((variant) => (
                    <Link
                        key={variant.id}
                        href={route("product.show", [product.id, variant.id])}
                        className={`px-3 py-2 rounded border ${
                            variant.id === item.id
                                ? "bg-sky-600 text-white"
                                : "bg-white hover:bg-sky-100"
                        }`}
                    >
                        {Array.isArray(variant.photos) && variant.photos[0] && (
                            <img
                                src={variant.photos[0].photo_url}
                                className="inline-block h-12 w-12 mr-2 rounded object-cover"
                            />
                        )}
                        ${variant.price}
                    </Link>
                ))}
            </div>
        </div>
    );
}
