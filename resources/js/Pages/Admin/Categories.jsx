import Pagination from "@/Components/Pagination";
import AdminLayout from "@/Layouts/AdminLayout";
import { useForm, usePage } from "@inertiajs/react";
import { useState } from "react";
import { route } from "ziggy-js";

export default function Categories() {
    const { categories } = usePage().props;

    const [showForm, setShowForm] = useState(false);
    const [chosenCategory, setChosenCategory] = useState(null);

    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: "",
    });

    const { delete: deleteCategory } = useForm();

    const handleNewCategory = () => {
        setChosenCategory(null);
        setData("name", "");
        setShowForm(true);
    };

    const handleChange = (category) => {
        setChosenCategory(category);
        setData({ name: category.name });
        setShowForm(true);
    };

    const handleSumbit = (e) => {
        e.preventDefault();

        if (chosenCategory) {
            put(route("admin.categories.update", chosenCategory.id), {
                onSuccess: () => {
                    reset();
                    setChosenCategory(null);
                },
            });
        } else {
            post(route("admin.categories.store"), {
                onSuccess: () => reset(),
            });
        }
    };

    const handleDelete = (categoryId) => {
        if (window.confirm("Are you sure you want to delete this category?")) {
            deleteCategory(route("admin.categories.destroy", categoryId), {
                onSuccess: () => {
                    setChosenCategory(null);
                    setShowForm(false);
                    reset();
                },
            });
        }
    };

    return (
        <AdminLayout>
            <button onClick={handleNewCategory} className="btn-primary">
                Add New Category
            </button>
            <ul>
                {categories.data.map((category) => (
                    <li key={category.id}>
                        <span>
                            {category.id} - {category.name}
                        </span>
                        <button
                            onClick={() => handleChange(category)}
                            className="bg-blue-500 text-gray-50 m-2 px-2 py-1 rounded-lg hover:bg-emerald-600"
                        >
                            Choose
                        </button>
                    </li>
                ))}
            </ul>

            <Pagination links={categories.links} />

            {showForm && (
                <div className="bg-gray-200 rounded p-2 mt-4 border-2 border-dotted border-sky-700">
                    <form onSubmit={handleSumbit} className="text-center ">
                        <h2 className="text-2xl font-medium mt-5 mb-2 text-center">
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
                                    className="btn-primary bg-red-500 text-gray-50 hover:bg-red-300"
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
                                className="btn-primary bg-gray-600 text-gray-50 hover:bg-gray-400"
                            >
                                Reset
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </AdminLayout>
    );
}
