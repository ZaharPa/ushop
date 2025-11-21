import ConfrimModal from "@/Components/ConfrimModal";
import Pagination from "@/Components/Pagination";
import AdminLayout from "@/Layouts/AdminLayout";
import { router, useForm, usePage } from "@inertiajs/react";
import { useState } from "react";
import { route } from "ziggy-js";

export default function Categories() {
    const { categories, features, attributes, errors } = usePage().props;

    const [showForm, setShowForm] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [chosenCategory, setChosenCategory] = useState(null);

    const { data, setData, post, processing, reset } = useForm({
        name: "",
        slug: "",
        image: "",
        parent_id: "",
        features: [],
        attributes: [],
    });

    const { delete: deleteCategory } = useForm();

    const handleNewCategory = () => {
        setChosenCategory(null);
        setData({
            name: "",
            slug: "",
            image: "",
            parent_id: "",
            features: [],
            attributes: [],
        });
        reset();
        setShowForm(true);
    };

    const handleChange = (category) => {
        setChosenCategory(category);
        setData({
            name: category.name,
            slug: category.slug,
            parent_id: category.parent_id || "",
            features: category.features?.map((f) => f.id) || [],
            attributes: category.attributes?.map((a) => a.id) || [],
            image: null,
        });
        setShowForm(true);
    };

    const handleSumbit = (e) => {
        e.preventDefault();
        if (chosenCategory) {
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("slug", data.slug);
            formData.append("parent_id", data.parent_id);
            formData.append("_method", "put");

            data.features.forEach((f, i) =>
                formData.append(`features[${i}]`, f)
            );

            data.attributes.forEach((a, i) =>
                formData.append(`attributes[${i}]`, a)
            );

            if (data.image) {
                formData.append("image", data.image);
            }

            router.post(
                route("admin.categories.update", chosenCategory.id),
                formData,
                {
                    forceFormData: true,
                    onSuccess: () => {
                        reset();
                        setChosenCategory(null);
                        setShowForm(false);
                    },
                }
            );
        } else {
            post(route("admin.categories.store"), {
                forceFormData: true,
                onSuccess: () => reset(),
            });
        }
    };

    const handleDelete = (categoryId) => {
        const category = categories.data.find((c) => c.id === categoryId);
        setChosenCategory(category);
        setShowConfirm(true);
    };

    const confirmDelete = () => {
        deleteCategory(route("admin.categories.destroy", chosenCategory.id), {
            onSuccess: () => {
                setChosenCategory(null);
                setShowForm(false);
                reset();
            },
        });
        setShowConfirm(false);
    };

    const cancelDelete = () => {
        setShowConfirm(false);
    };

    const handleFeatureToggle = (featureId) => {
        setData((prevData) => {
            const newFeatures = prevData.features.includes(featureId)
                ? prevData.features.filter((id) => id !== featureId)
                : [...prevData.features, featureId];
            return { ...prevData, features: newFeatures };
        });
    };

    const handleAttributeToggle = (attributeId) => {
        setData((prevData) => {
            const newAttribute = prevData.attributes.includes(attributeId)
                ? prevData.attributes.filter((id) => id !== attributeId)
                : [...prevData.attributes, attributeId];
            return { ...prevData, attributes: newAttribute };
        });
    };

    return (
        <AdminLayout>
            <button onClick={handleNewCategory} className="btn-primary">
                Add New Category
            </button>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {categories.data.map((category) => {
                    const parentCategory = categories.data.find(
                        (parent) => parent.id === category.parent_id
                    );

                    return (
                        <li key={category.id}>
                            <span className="text-lg font-medium">
                                {category.id} - {category.name}
                            </span>
                            <img
                                src={category.image_url}
                                alt="image"
                                className="w-24 rounded"
                            />
                            {category.parent_id && (
                                <div>Parent - {parentCategory.name}</div>
                            )}
                            <button
                                onClick={() => handleChange(category)}
                                className="btn-primary"
                            >
                                Choose
                            </button>
                        </li>
                    );
                })}
            </ul>

            <div className="flex justify-center">
                <Pagination links={categories.links} />
            </div>

            {showForm && (
                <div className="dotted-form">
                    <form
                        onSubmit={handleSumbit}
                        encType="multipart/form-data"
                        className="text-center"
                    >
                        <h2 className="h2-center">
                            {chosenCategory
                                ? "Edit Category"
                                : "Add New Category"}
                        </h2>

                        {chosenCategory && (
                            <div>Category Id - {chosenCategory.id}</div>
                        )}

                        <div>
                            <span>Name category - </span>
                            <input
                                type="text"
                                value={data.name}
                                size={data.name.length}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                className="input-admin"
                            />
                        </div>

                        {errors.name && (
                            <div className="text-red-500 my-1">
                                {errors.name}
                            </div>
                        )}

                        <div>
                            <span>Slug - </span>
                            <input
                                type="text"
                                value={data.slug}
                                size={data.slug.length}
                                onChange={(e) =>
                                    setData("slug", e.target.value)
                                }
                                className="input-admin"
                            />
                        </div>

                        {errors.slug && (
                            <div className="text-red-500 my-1">
                                {errors.slug}
                            </div>
                        )}

                        <div className="my-2">
                            <span>Photo - </span>
                            <input
                                type="file"
                                onChange={(e) =>
                                    setData("image", e.target.files[0])
                                }
                                className="input-admin"
                            />
                        </div>

                        {errors.image && (
                            <div className="text-red-500 my-1">
                                {errors.image}
                            </div>
                        )}

                        <div>
                            <span>Parent category - </span>
                            <select
                                value={data.parent_id || ""}
                                onChange={(e) =>
                                    setData("parent_id", e.target.value)
                                }
                                className="input-admin"
                            >
                                <option value="">None</option>
                                {categories.data.map((category) => (
                                    <option
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mt-2">
                            <label className="text-lg">Features</label>
                            <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-x-5 gap-y-2 mt-1">
                                {features.map((feature) => (
                                    <div
                                        key={feature.id}
                                        className="flex items-center text-center cursor-pointer select-none"
                                    >
                                        <input
                                            type="checkbox"
                                            id={`feature-${feature.id}`}
                                            checked={data.features.includes(
                                                feature.id
                                            )}
                                            onChange={() =>
                                                handleFeatureToggle(feature.id)
                                            }
                                            className="hidden peer"
                                        />
                                        <label
                                            htmlFor={`feature-${feature.id}`}
                                            className="w-full px-2 py-1 border border-gray-400 bg-gray-100 rounded-md peer-checked:text-white peer-checked:bg-blue-600 transition-colors"
                                        >
                                            {feature.name}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {errors.features && (
                            <div className="text-red-500 my-1">
                                {errors.features}
                            </div>
                        )}

                        <div className="mt-2">
                            <label className="text-lg">Attributes</label>
                            <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-x-5 gap-y-2 mt-1">
                                {attributes.map((attribute) => (
                                    <div
                                        key={attribute.id}
                                        className="flex items-center text-center cursor-pointer select-none"
                                    >
                                        <input
                                            type="checkbox"
                                            id={`attribute-${attribute.id}`}
                                            checked={data.attributes.includes(
                                                attribute.id
                                            )}
                                            onChange={() =>
                                                handleAttributeToggle(
                                                    attribute.id
                                                )
                                            }
                                            className="hidden peer"
                                        />
                                        <label
                                            htmlFor={`attribute-${attribute.id}`}
                                            className="w-full px-2 py-1 border border-gray-400 bg-gray-100 rounded-md peer-checked:text-white peer-checked:bg-blue-600 transition-colors"
                                        >
                                            {attribute.name}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {errors.attributes && (
                            <div className="text-red-500 my-1">
                                {errors.attributes}
                            </div>
                        )}

                        <div className="flex justify-center gap-4 m-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className="btn-primary"
                            >
                                {chosenCategory ? "Update" : "Add"}
                            </button>
                            {chosenCategory && (
                                <button
                                    type="button"
                                    onClick={() =>
                                        handleDelete(chosenCategory.id)
                                    }
                                    className="btn-danger"
                                >
                                    Delete
                                </button>
                            )}
                            <button
                                type="button"
                                onClick={() => {
                                    setChosenCategory(null);
                                    setShowForm(false);
                                    reset();
                                }}
                                className="btn-secondary"
                            >
                                Reset
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <ConfrimModal
                show={showConfirm}
                onConfrim={confirmDelete}
                onCancel={cancelDelete}
                message="Are you sure want to delete this category?"
            />
        </AdminLayout>
    );
}
