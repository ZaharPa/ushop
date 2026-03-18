import RecentlyViewed from "@/Components/RecentlyViewed";
import { Link, router, usePage } from "@inertiajs/react";
import axios from "axios";
import { MessageSquare, Package, Star, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function ShowProduct() {
    const { product, item, ratingUser, auth, recentlyViewed } = usePage().props;

    const [selectedPhoto, setSelectedPhoto] = useState(
        item.photos.length > 0 ? item.photos[0] : null,
    );
    const [showModal, setShowModal] = useState(false);

    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    const [rating, setRating] = useState(ratingUser?.rating ?? 0);
    const [hoverRating, setHoverRating] = useState(0);
    const [messageRating, setMessageRating] = useState("");

    const [cartMessage, setCartMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const attributeOptions = {};
    product.items.forEach((i) => {
        i.attribute_values.forEach((v) => {
            const attrId = v.attribute.id;
            if (!attributeOptions[attrId]) {
                attributeOptions[attrId] = {};
            }
            attributeOptions[attrId][v.id] = v;
        });
    });

    const [selectedAttributes, setSelectedAttributes] = useState(() => {
        const map = {};
        item.attribute_values.forEach((v) => {
            map[v.attribute.id] = v.id;
        });
        return map;
    });

    const [lastChangedAttrId, setLastChangedAttrId] = useState(null);

    const handleAttributeChange = (attributeId, valueId) => {
        setSelectedAttributes((prev) => ({
            ...prev,
            [attributeId]: valueId,
        }));
        setLastChangedAttrId(attributeId);
    };

    useEffect(() => {
        if (!lastChangedAttrId) return;

        const selectedIds = Object.values(selectedAttributes).map(Number);

        const matched = product.items.find((i) => {
            const itemIds = i.attribute_values.map((v) => v.id);
            return selectedIds.every((id) => itemIds.includes(id));
        });

        if (matched && matched.id !== item.id) {
            router.visit(route("product.show", [product.id, matched.id]));
        } else {
            const fallback = product.items.find((i) =>
                i.attribute_values.some(
                    (v) =>
                        v.attribute.id === lastChangedAttrId &&
                        v.id === selectedAttributes[lastChangedAttrId],
                ),
            );

            if (fallback && fallback.id !== item.id) {
                router.visit(route("product.show", [product.id, fallback.id]));
            }
        }
    }, [selectedAttributes]);

    useEffect(() => {
        axios.get(`/api/products/${product.id}/comments`).then((res) => {
            setComments(res.data);
        });
    }, [product.id]);

    const submitComment = (e) => {
        e.preventDefault();
        axios
            .post(route("comments.store"), {
                product_id: product.id,
                content: newComment,
            })
            .then((res) => {
                setComments([res.data, ...comments]);
                setNewComment("");
            });
    };

    const deleteComment = (id) => {
        axios.delete(route("comments.destroy", id)).then(() => {
            setComments((prev) => prev.filter((c) => c.id !== id));
        });
    };

    const addToCart = (itemId) => {
        axios
            .post(route("cart.add"), { item_id: itemId })
            .then(() => {
                setCartMessage("Product added to cart");
                setTimeout(() => setCartMessage(""), 3000);
            })
            .catch((error) => {
                if (error.response?.status === 422) {
                    setErrorMessage(error.response.data.message);
                    setTimeout(() => setErrorMessage(""), 3000);
                } else {
                    setErrorMessage("Failed to add to cart");
                    setTimeout(() => setErrorMessage(""), 3000);
                }
            });
    };

    const handleRating = async (value) => {
        setRating(value);
        try {
            await axios.post(route("product.rating"), {
                product_id: product.id,
                rating: value,
            });
            setMessageRating("Rating submitted successfully");
        } catch (error) {
            setMessageRating("Failed to submit rating");
        }
    };
    return (
        <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
            {cartMessage && (
                <div className="top-right-alert from-green-600 to-green-700 hover:from-green-700 hover:to-green-800">
                    {cartMessage}
                </div>
            )}

            {errorMessage && (
                <div className="top-right-alert">{errorMessage}</div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 bg-white border border-gray-200 rounded-xl shadow-xl p-4">
                <div className="space-y-4">
                    {selectedPhoto && (
                        <div className="aspect-square overflow-hidden rounded-2xl shadow-xl border-2 border-sky-100">
                            <img
                                src={selectedPhoto.photo_url}
                                onClick={() => setShowModal(true)}
                                className="w-full h-full object-cover cursor-zoom-in hover:scale-110 transition-transform duration-300"
                            />
                        </div>
                    )}

                    {item.photos.length > 1 && (
                        <div className="flex gap-3 overflow-x-auto pb-2">
                            {item.photos.map((photo) => (
                                <div
                                    key={photo.id}
                                    onClick={() => setSelectedPhoto(photo)}
                                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden  cursor-pointer transition ${
                                        selectedPhoto.id === photo.id
                                            ? "ring-4 ring-sky-200 scale-110"
                                            : "ring-2 ring-gray-100 hover:ring-sky-200"
                                    }`}
                                >
                                    <img
                                        src={photo.photo_url}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="space-y-6">
                    <div>
                        <p className="text-gray-500 mb-3">
                            {product.category.name}
                        </p>

                        <h2 className="text-2xl font-bold text-sky-800">
                            {product.name}
                        </h2>

                        <div className="flex items-center gap-3 mb-4">
                            <div className="flex items-center gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        size={20}
                                        className={
                                            star <=
                                            Math.round(product.average_rating)
                                                ? "fill-yellow-400 text-yellow-400"
                                                : "text-gray-300"
                                        }
                                    />
                                ))}
                            </div>
                            <span className="text-lg font-semibold text-gray-700">
                                {Number(product.average_rating).toFixed(1)}
                            </span>
                            <span className="text-sm" text-gray-500>
                                ({product.ratings_count} ratings)
                            </span>
                        </div>

                        <div className="bg-gradient-to-br from-sky-50 to-blue-50 border-2 border-sky-200 rounded-xl p-6 w-fit">
                            <div className="flex items-baseline gap-3">
                                {item.discount ? (
                                    <>
                                        <span className="text-4xl font-bold text-red-600">
                                            $
                                            {(
                                                item.price -
                                                item.prive *
                                                    (item.discount.percentage /
                                                        100)
                                            ).toFixed(2)}
                                        </span>
                                        <span className="text-2xl line-through text-gray-400">
                                            ${item.price}
                                        </span>
                                        <span className="ml-auto text-lg font-semibold text-green-600 bg-green-100 px-3 py-1 rounded-full">
                                            Save {item.discount.percentage}%
                                        </span>
                                    </>
                                ) : (
                                    <span className="text-3xl font-bold text-sky-700">
                                        ${item.price}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {Object.entries(attributeOptions).map(
                        ([attrId, values]) => (
                            <div key={attrId} className="space-y-3">
                                <label className="block font-semibold text-sm text-gray-700 mb-1">
                                    {Object.values(values)[0].attribute.name}
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {Object.values(values).map((v) => (
                                        <button
                                            key={v.id}
                                            onClick={() =>
                                                handleAttributeChange(
                                                    Number(attrId),
                                                    v.id,
                                                )
                                            }
                                            className={`px-3 py-1 rounded-lg font-medium transition-all duration-200  ${
                                                selectedAttributes[attrId] ===
                                                v.id
                                                    ? "bg-sky-600 text-white shadow-md scale-105"
                                                    : "bg-white text-gray-700 border-2 border-gray-300 hover:border-sky-400 hover:bg-sky-50"
                                            }`}
                                        >
                                            {v.value}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ),
                    )}

                    <div className="flex items-center gap-2 text-gray-600">
                        <Package size={20} />
                        <span className="text-sm">
                            <span className="font-semibold">In Stock:</span>{" "}
                            {item.quantity} units
                        </span>
                    </div>

                    <button
                        onClick={() => addToCart(item.id)}
                        className="btn-primary"
                    >
                        Add to cart
                    </button>
                </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8 shadow-sm">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Description
                </h2>
                <p className="text-gray-700 leading-relaxed">
                    {product.description}
                </p>
            </div>

            {product.features.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8 shadow-sm">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                        Product Features
                    </h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {product.features.map((feature) => (
                            <li
                                key={feature.id}
                                className="bg-gradient-to-br from-sky-50 to-blue-50 border border-sky-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                            >
                                <h4 className="font-semibold text-sky-800 mb-1">
                                    {feature.name}
                                </h4>
                                <p className="text-sm text-gray-700">
                                    {feature.pivot.value}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {product.items.length > 1 && (
                <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8 shadow-sm">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                        Other Variants
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                        {product.items.map((variant) => (
                            <Link
                                key={variant.id}
                                href={route("product.show", [
                                    product.id,
                                    variant.id,
                                ])}
                                className={`border-2 rounded-xl p-4 transition-all duration-200 ${
                                    variant.id === item.id
                                        ? "bg-sky-50 border-sky-600 shadow-lg"
                                        : "bg-gray-200 hover:border-sky-400 hover:shadow-md"
                                }`}
                            >
                                {Array.isArray(variant.photos) &&
                                    variant.photos[0] && (
                                        <div className="aspect-square overflow-hidden rounded-lg mb-3">
                                            <img
                                                src={
                                                    variant.photos[0].photo_url
                                                }
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                    )}

                                <div className="space-y-1">
                                    <p className="font-bold text-lg text-gray-900">
                                        {variant.discount ? (
                                            <>
                                                <span className="text-red-600">
                                                    $
                                                    {Number(
                                                        variant.price -
                                                            variant.price *
                                                                (variant
                                                                    .discount
                                                                    .percentage /
                                                                    100),
                                                    ).toFixed(2)}
                                                </span>
                                                <span className="text-sm line-through text-gray-400 ml-2">
                                                    ${variant.price}
                                                </span>
                                            </>
                                        ) : (
                                            <span>${variant.price}</span>
                                        )}
                                    </p>
                                    {variant.attribute_values.map((v) => (
                                        <div
                                            key={v.id}
                                            className="text-sm text-gray-600"
                                        >
                                            {v.value}
                                        </div>
                                    ))}
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {usePage().props.auth?.user && (
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-100 rounded-xl p-6 mb-8 shadow-sm">
                    <h3 className="text-xl font-semibold text-sky-900 mb-2">
                        Leave your rating
                    </h3>
                    <div className="flex items-center gap-4">
                        {[1, 2, 3, 4, 5].map((value) => (
                            <Star
                                key={value}
                                size={32}
                                className={`cursor-pointer transition-all duration-150 ${
                                    value <= (hoverRating || rating)
                                        ? "text-yellow-400 fill-yellow-400 scale-110"
                                        : "text-gray-300 hover:text-yellow-200"
                                }`}
                                onClick={() => handleRating(value)}
                                onMouseEnter={() => setHoverRating(value)}
                                onMouseLeave={() => setHoverRating(0)}
                            />
                        ))}
                    </div>
                    <span className=" text-lg ml-2 text-gray-700">
                        {rating > 0 ? `${rating} / 5 ` : "No rating yet"}
                    </span>
                    {messageRating && (
                        <p className="mt-2 text-sm font-medium bg-green-50 text-green-600 rounded-xl px-4 py-2 inline-block">
                            {messageRating}
                        </p>
                    )}
                </div>
            )}

            <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8 shadow-sm">
                <div className="flex items-center gap-2 mb-6">
                    <MessageSquare size={24} className="text-sky-600" />
                    <h3 className="text-xl font-semibold text-gray-900">
                        Customer`s Reviews
                    </h3>
                    <span className="ml-2 text-lg text-gray-500">
                        ({comments.length})
                    </span>
                </div>

                {usePage().props.auth?.user && (
                    <form onSubmit={submitComment} className="mb-6">
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            required
                            className="w-full border-2 border-gray-200 rounded-xl p-2 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 transition-all"
                            placeholder="Write a comment"
                        />
                        <button type="submit" className="btn-primary">
                            Post Review
                        </button>
                    </form>
                )}

                {comments.length === 0 ? (
                    <p className="text-center text-gray-500 py-8">
                        No comments yet.
                    </p>
                ) : (
                    comments.map((comment) => (
                        <div
                            key={comment.id}
                            className="mb-4 border-b pb-2 relative"
                        >
                            <div className="text-sm text-gray-700">
                                {comment.user.name}
                            </div>
                            <div>{comment.content}</div>
                            {(auth?.user?.is_admin ||
                                auth?.user?.id === comment.user_id) && (
                                <button
                                    onClick={() => deleteComment(comment.id)}
                                    className="absolute top-0 right-0 text-red-700 hover:text-red-500 text-sm cursor-pointer"
                                    aria-label="Delete comment"
                                >
                                    <X size={18} />
                                </button>
                            )}
                        </div>
                    ))
                )}
            </div>

            <section className="mt-6">
                <RecentlyViewed recentlyViewed={recentlyViewed} />
            </section>

            {showModal && (
                <div
                    onClick={() => setShowModal(false)}
                    className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center cursor-zoom-out"
                >
                    <img
                        src={selectedPhoto.photo_url}
                        className="max-h-[90vw] max-w-[90vw] rounded shadow-lg"
                    />
                </div>
            )}
        </div>
    );
}
