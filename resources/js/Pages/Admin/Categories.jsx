import Pagination from "@/Components/Pagination";
import AdminLayout from "@/Layouts/AdminLayout";
import { usePage } from "@inertiajs/react";
import { useState } from "react";

export default function Categories() {
    const { categories } = usePage().props;

    const [chosenCategory, setChosenCategory] = useState(null);

    return (
        <AdminLayout>
            <ul>
                {categories.data.map((category) => (
                    <li key={category.id}>
                        <span>
                            {category.id} - {category.name}
                        </span>
                        <button
                            onClick={() => setChosenCategory(category)}
                            className="bg-blue-500 text-gray-50 m-2 px-2 py-1 rounded-lg hover:bg-emerald-600"
                        >
                            Choose
                        </button>
                    </li>
                ))}
            </ul>

            <Pagination links={categories.links} />

            {chosenCategory && (
                <div className="bg-gray-200 rounded p-2 mt-4 border-2 border-dotted border-sky-700">
                    <h2 className="text-2xl font-medium mt-5 mb-2 text-center">
                        Edit Category
                    </h2>
                    <form className="text-center">
                        <div>Category Id - {chosenCategory.id}</div>

                        <div>
                            <span>Name category - </span>
                            <input
                                type="text"
                                defaultValue={chosenCategory.name}
                                size={chosenCategory.name.length}
                                className="px-1 border border-gray-600 rounded-lg mt-2"
                            />
                        </div>

                        <div>
                            <button className="btn-primary m-4">Edit</button>
                            <button className="btn-primary bg-red-500 text-gray-50 hover:bg-red-700">
                                Delete
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </AdminLayout>
    );
}
