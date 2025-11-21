import Pagination from "@/Components/Pagination";
import UserRow from "@/Components/UserRow";
import AdminLayout from "@/Layouts/AdminLayout";
import { useForm, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function User() {
    const { users, deletedUsers, errors } = usePage().props;

    const [chosenUser, setChosenUser] = useState(null);

    const {
        data,
        setData,
        put,
        delete: deleteUser,
        processing,
        reset,
    } = useForm({
        name: "",
    });

    const handleChange = (user) => {
        setChosenUser(user);
        setData({
            name: user.name,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("admin.user.update", chosenUser.id), {
            onSuccess: () => {
                setChosenUser(null);
                reset();
            },
        });
    };

    const handleDelete = (userId) => {
        if (window.confirm("Are you sure want to delete this category?")) {
            deleteUser(route("admin.user.destroy", userId), {
                onSuccess: () => {
                    setChosenUser(null);
                    reset();
                },
            });
        }
    };

    const handleRestore = (userId) => {
        put(route("admin.user.restore", userId), {
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <AdminLayout>
            <h2 className="h2-center">Users list</h2>
            <div>
                <ul className="w-full">
                    <li className="grid grid-cols-10 lg:grid-cols-11 text-center font-medium text-lg mb-2 gap-4">
                        <div className="col-span-1">Id</div>
                        <div className="col-span-3 lg:col-span-4">Name</div>
                        <div className="col-span-4">Email</div>
                        <div className="col-span-2"></div>
                    </li>
                    {users.data.map((user) => (
                        <UserRow
                            key={user.id}
                            user={user}
                            actions={
                                <>
                                    <button
                                        onClick={() => handleChange(user)}
                                        className="btn-primary"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleDelete(user.id)}
                                        className="btn-danger"
                                    >
                                        Delete
                                    </button>
                                </>
                            }
                        />
                    ))}
                </ul>
            </div>

            {users.links && (
                <div className="flex justify-center mt-2 mb-4">
                    <Pagination links={users.links} />
                </div>
            )}

            {chosenUser && (
                <div className="bg-gray-200 rounded p-2 mt-4 border-2 border-dotted border-sky-700">
                    <form onSubmit={handleSubmit} className="text-center">
                        <h2 className="h2-center">Edit User Name</h2>

                        <div>Id - {chosenUser.id}</div>

                        <div>
                            <span>Name - </span>
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
                                {processing ? "In progress..." : "Update"}
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    setChosenUser(null);
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

            {deletedUsers && (
                <ul className="pt-6">
                    <li>
                        <h2 className="h2-center"> Deleted Users list</h2>
                    </li>
                    {deletedUsers.data.map((user) => (
                        <UserRow
                            key={user.id}
                            user={user}
                            actions={
                                <button
                                    onClick={() => handleRestore(user.id)}
                                    className="btn-primary"
                                >
                                    Restore
                                </button>
                            }
                        />
                    ))}
                </ul>
            )}

            {deletedUsers.links && (
                <div className="flex justify-center mt-4">
                    <Pagination links={deletedUsers.links} />
                </div>
            )}
        </AdminLayout>
    );
}
