import ConfrimModal from "@/Components/ConfrimModal";
import Pagination from "@/Components/Pagination";
import AdminLayout from "@/Layouts/AdminLayout";
import { router, useForm, usePage } from "@inertiajs/react";
import { useState } from "react";
import { route } from "ziggy-js";

export default function Categories() {
    const { categories, features, errors } = usePage().props;

    const [showForm, setShowForm] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [chosenCategory, setChosenCategory] = useState(null);

    const { data, setData, post, processing, reset } = useForm({
        name: "",
        image: "",
        parent_id: "",
        features: [],
    });

    const { delete: deleteCategory } = useForm();

    const handleNewCategory = () => {
        setChosenCategory(null);
        setData({
            name: "",
            image: "",
            parent_id: "",
            features: [],
        });
        reset();
        setShowForm(true);
    };

    const handleChange = (category) => {
        setChosenCategory(category);
        setData({
            name: category.name,
            parent_id: category.parent_id || "",
            features: category.features?.map((f) => f.id) || [],
        });
        setShowForm(true);
    };

    const handleSumbit = (e) => {
        e.preventDefault();
        if (chosenCategory) {
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("parent_id", data.parent_id);
            formData.append("_method", "put");

            data.features.forEach((f, i) =>
                formData.append(`features[${i}]`, f)
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
                                className="btn-admin"
                            >
                                Choose
                            </button>
                        </li>
                    );
                })}
            </ul>

            <Pagination links={categories.links} />

            {showForm && (
                <div className="bg-gray-200 rounded p-2 mt-4 border-2 border-dotted border-sky-700">
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
                                className="px-1 border border-gray-600 rounded-lg mt-2"
                            />
                        </div>

                        {errors.name && (
                            <div className="text-red-500 my-1">
                                {errors.name}
                            </div>
                        )}

                        <div>
                            <span>Photo - </span>
                            <input
                                type="file"
                                onChange={(e) =>
                                    setData("image", e.target.files[0])
                                }
                                className="px-1 border border-gray-600 rounded-lg mt-2"
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
                                className="px-1 border border-gray-600 rounded-lg mt-2"
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

                        <div>
                            <label>Features</label>
                            <div>
                                {features.map((feature) => (
                                    <div key={feature.id}>
                                        <input
                                            type="checkbox"
                                            id={`feature-${feature.id}`}
                                            checked={data.features.includes(
                                                feature.id
                                            )}
                                            onChange={() =>
                                                handleFeatureToggle(feature.id)
                                            }
                                        />
                                        <label
                                            htmlFor={`feature-${feature.id}`}
                                        >
                                            {feature.name}{" "}
                                            {console.log(data.features)}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {errors.parent_id && (
                            <div className="text-red-500 my-1">
                                {errors.parent_id}
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
                                    className="btn-delete"
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
                                className="btn-reset"
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
