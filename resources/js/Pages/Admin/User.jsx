import Pagination from "@/Components/Pagination";
import AdminLayout from "@/Layouts/AdminLayout";
import { useForm, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function User() {
    const { users, errors } = usePage().props;

    const [showForm, setShowForm] = useState(false);
    const [chosenUser, setChosenUser] = useState(null);

    const { data, setData, post, processing, reset } = useForm({
        name: "",
    });

    const handleChange = (user) => {
        setChosenUser(user);
        setData({
            name: user.name,
        });
        setShowForm(true);
    };

    return (
        <AdminLayout>
            <h2 className="h2-center">Users list</h2>
            <ul className="w-full">
                <li className="grid grid-cols-11 text-center font-medium text-lg mb-2 gap-4">
                    <div className="col-span-1">Id</div>
                    <div className="col-span-4">Name</div>
                    <div className="col-span-4">Email</div>
                    <div className="col-span-2"></div>
                </li>
                {users.data.map((user) => (
                    <li
                        key={user.id}
                        className="grid grid-cols-11 text-center mt-2 gap-4"
                    >
                        <div className="col-span-1">{user.id}</div>
                        <div className="col-span-4">{user.name}</div>
                        <div className="col-span-4">{user.email}</div>
                        <div className="col-span-2 flex">
                            <button
                                onClick={() => handleChange(user)}
                                className="btn-admin"
                            >
                                Edit
                            </button>
                            <button
                                type="button"
                                // onClick={() => handleDelete(user.id)}
                                className="btn-delete"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            {users.links && <Pagination links={users.links} />}

            {showForm && (
                <div className="bg-gray-200 rounded p-2 mt-4 border-2 border-dotted border-sky-700">
                    <form
                        // onSubmit={handleSubmit}
                        className="text-center"
                    >
                        <h2 className="h2-center">Edit User Name</h2>

                        <div>Id - {chosenUser.id}</div>

                        <div>
                            <span>Name - </span>
                            <input
                                type="text"
                                value={data.name}
                                size={data.name.length}
                                // onChange={(e) =>
                                //     setData("name", e.target.value)
                                // }
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
                                {processing ? "In progress..." : "Update"}
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    setChosenUser(null);
                                    setShowForm(false);
                                    reset();
                                }}
                                className="btn-reset"
                            >
                                Close
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </AdminLayout>
    );
}
