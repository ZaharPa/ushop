import Pagination from "@/Components/Pagination";
import AdminLayout from "@/Layouts/AdminLayout";
import { useForm, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function Layout() {
    const { links, errors } = usePage().props;

    const [showForm, setShowForm] = useState(false);
    const [chosenLink, setChosenLink] = useState(null);

    const {
        data,
        setData,
        post,
        put,
        delete: destroy,
        processing,
        reset,
    } = useForm({
        label: "",
        url: "",
        position: "",
        is_active: false,
    });

    const handleNewLink = () => {
        setChosenLink(null);
        setShowForm(true);
        reset();
    };

    const handleChange = (link) => {
        setChosenLink(link);
        setData({
            label: link.label,
            url: link.url,
            position: link.position,
            is_active: link.is_active,
        });
        setShowForm(true);
    };

    const handleSumbit = (e) => {
        e.preventDefault();
        if (chosenLink) {
            put(route("admin.layout.update", chosenLink.id), data);
        } else {
            post(route("admin.layout.store"), data);
        }
        setShowForm(false);
        reset();
    };

    const handleDelete = () => {
        destroy(route("admin.layout.destroy", chosenLink.id), {
            onSuccess: () => {
                setShowForm(false);
                reset();
            },
        });
    };

    return (
        <AdminLayout>
            <button onClick={handleNewLink} className="btn-primary">
                Add new Link
            </button>
            <h2 className="h2-center">Layout Links List</h2>

            <ul className="w-full">
                <li className="grid grid-cols-8 gap-4 mb-2 text-center font-medium text-lg">
                    <div>Id</div>
                    <div>Label</div>
                    <div className="col-span-3">URL</div>
                    <div>Position</div>
                    <div>Is_Active</div>
                    <div></div>
                </li>
                {links.data.map((link) => (
                    <li
                        key={link.id}
                        className="grid grid-cols-8 gap-4 mb-2 text-center"
                    >
                        <div>{link.id}</div>
                        <div>{link.label}</div>
                        <div className="col-span-3">{link.url}</div>
                        <div>{link.position}</div>
                        <div>
                            <input
                                type="checkbox"
                                checked={link.is_active}
                                disabled
                            />
                        </div>
                        <div>
                            <button
                                onClick={() => handleChange(link)}
                                className="btn-admin py-0"
                            >
                                Edit
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            <div className="flex justify-center">
                <Pagination links={links.links} />
            </div>

            {showForm && (
                <form
                    onSubmit={handleSumbit}
                    className="text-center flex flex-col gap-2"
                >
                    <h2 className="h2-center text-xl">
                        {chosenLink ? "Edit" : "Update"}
                    </h2>

                    {chosenLink && <div>Link Id - {chosenLink.id}</div>}

                    <div>
                        <span>Label - </span>
                        <input
                            type="text"
                            value={data.label}
                            onChange={(e) => setData("label", e.target.value)}
                            className="input-admin"
                        />
                    </div>
                    {errors.label && (
                        <div className="text-red-500 my-1">{errors.label}</div>
                    )}

                    <div>
                        <span>URL - </span>
                        <input
                            type="text"
                            value={data.url}
                            onChange={(e) => setData("url", e.target.value)}
                            className="input-admin"
                        />
                    </div>
                    {errors.url && (
                        <div className="text-red-500 my-1">{errors.url}</div>
                    )}

                    <div>
                        <span>Position - </span>
                        <input
                            type="number"
                            value={data.position}
                            onChange={(e) =>
                                setData("position", e.target.value)
                            }
                            className="input-admin"
                        />
                    </div>
                    {errors.position && (
                        <div className="text-red-500 my-1">
                            {errors.position}
                        </div>
                    )}

                    <div>
                        <span>Is_Active - </span>
                        <input
                            type="checkbox"
                            value={data.is_active}
                            checked={data.is_active}
                            onChange={(e) =>
                                setData("is_active", e.target.checked)
                            }
                        />
                    </div>
                    {errors.is_active && (
                        <div className="text-red-500 my-1">
                            {errors.is_active}
                        </div>
                    )}

                    <div className="flex justify-center gap-4 mt-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="btn-primary"
                        >
                            {chosenLink ? "Update" : "Create"}
                        </button>

                        {chosenLink && (
                            <button
                                onClick={handleDelete}
                                type="button"
                                className="btn-delete"
                            >
                                Delete
                            </button>
                        )}

                        <button
                            type="button"
                            onClick={() => {
                                setShowForm(false);
                                setChosenLink(null);
                                reset();
                            }}
                            className="btn-reset"
                        >
                            Reset
                        </button>
                    </div>
                </form>
            )}
        </AdminLayout>
    );
}
