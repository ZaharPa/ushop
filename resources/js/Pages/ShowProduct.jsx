import { Link, router, usePage } from "@inertiajs/react";
import axios from "axios";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

export default function ShowProduct() {
    const { product, item, auth } = usePage().props;

    const [selectedPhoto, setSelectedPhoto] = useState(
        item.photos.length > 0 ? item.photos[0] : null
    );
    const [showModal, setShowModal] = useState(false);

    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

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
                        v.id === selectedAttributes[lastChangedAttrId]
                )
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

    return (
        <div className="max-w-5xl mx-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    {selectedPhoto && (
                        <img
                            src={selectedPhoto.photo_url}
                            onClick={() => setShowModal(true)}
                            className="w-full h-96 object-cover rounded shadow cursor-pointer mb-4"
                        />
                    )}

                    {item.photos.length > 1 && (
                        <div className="flex gap-2 overflow-x-auto">
                            {item.photos.map((photo) => (
                                <img
                                    key={photo.id}
                                    src={photo.photo_url}
                                    onClick={() => setSelectedPhoto(photo)}
                                    className={`h-20 w-20 object-cover rounded border cursor-pointer transition ${
                                        selectedPhoto.id === photo.id
                                            ? "border-sky-600 ring-2 ring-sky-300"
                                            : "border-gray-300 hover:border-sky-400"
                                    }`}
                                />
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex flex-col justify-start gap-4 text-center">
                    <h2 className="text-2xl font-bold text-sky-800">
                        {product.name}
                    </h2>
                    <p className="text-gray-500 mb-3">
                        {product.category.name}
                    </p>
                    <p className="text-xl text-sky-700 font-semibold mb-2">
                        ${item.price}
                    </p>

                    {Object.entries(attributeOptions).map(
                        ([attrId, values]) => (
                            <div key={attrId}>
                                <span className="block font-semibold mb-1">
                                    {Object.values(values)[0].attribute.name}
                                </span>
                                <div className="flex flex-wrap gap-2">
                                    {Object.values(values).map((v) => (
                                        <button
                                            key={v.id}
                                            onClick={() =>
                                                handleAttributeChange(
                                                    Number(attrId),
                                                    v.id
                                                )
                                            }
                                            className={`px-3 py-1 border rounded  ${
                                                selectedAttributes[attrId] ===
                                                v.id
                                                    ? "bg-sky-600 text-white border-sky-600"
                                                    : "bg-white text-gray-700 border-gray-300 hover:bg-sky-100"
                                            }`}
                                        >
                                            {v.value}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )
                    )}
                </div>
            </div>

            <h3 className="text-lg font-semibold text-sky-700 mt-6">
                Description
            </h3>
            <p className="text-gray-700 mb-4">{product.description}</p>

            {product.features.length > 0 && (
                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-sky-700 mb-2">
                        Product Features
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {product.features.map((feature) => (
                            <li
                                key={feature.id}
                                className="bg-sky-50 border border-sky-200 rounded-lg p-4 shadow"
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
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                            {Array.isArray(variant.photos) &&
                                variant.photos[0] && (
                                    <img
                                        src={variant.photos[0].photo_url}
                                        className="inline-block h-12 w-12 mr-2 rounded object-cover"
                                    />
                                )}

                            <div className="flex flex-col">
                                <div>${variant.price}</div>
                                {variant.attribute_values.map((v) => (
                                    <div key={v.id} className="text-sm">
                                        {v.value}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {showModal && (
                <div
                    onClick={() => setShowModal(false)}
                    className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center"
                >
                    <img
                        src={selectedPhoto.photo_url}
                        className="max-h-[90%] rounded shadow-lg"
                    />
                </div>
            )}

            <div className="mt-8">
                <h3 className="text-lg font-semibold text-sky-700 mb-2">
                    Comments
                </h3>

                {usePage().props.auth?.user && (
                    <form onSubmit={submitComment} className="mt-4">
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            required
                            className="w-full border rounded p-2 mb-2"
                            placeholder="Write a comment"
                        />
                        <button type="submit" className="btn-admin">
                            Submit
                        </button>
                    </form>
                )}

                {comments.length === 0 ? (
                    <p className="text-gray-500">No comments yet.</p>
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
        </div>
    );
}
