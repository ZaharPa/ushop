import Pagination from "@/Components/Pagination";
import AdminLayout from "@/Layouts/AdminLayout";
import { useForm, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function Setting() {
    const { settings } = usePage().props;

    const [chosenSetting, setChosenSetting] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const {
        data,
        setData,
        post,
        put,
        delete: deleteRoute,
        processing,
        reset,
    } = useForm({
        key: "",
        value: "",
    });

    const handleNewSetting = () => {
        setChosenSetting(null);
        reset();
        setShowForm(true);
    };

    const handleChange = (setting) => {
        setChosenSetting(setting);
        setData({
            key: setting.key,
            value: setting.value,
        });
        setShowForm(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (chosenSetting) {
            put(route("admin.settings.update", chosenSetting.id), data);
        } else {
            post(route("admin.settings.store"), data);
        }
        reset();
        setShowForm(false);
    };

    const handleDelete = () => {
        deleteRoute(route("admin.categories.destroy", chosenSetting.id), {
            onSuccess: () => {
                setChosenSetting(null);
                reset();
                setShowForm(false);
            },
        });
    };

    return (
        <AdminLayout>
            <button onClick={handleNewSetting} className="btn-primary">
                Add New Setting
            </button>
            <h2 className="h2-center">Settings</h2>
            <ul>
                {settings.data.map((setting) => (
                    <li key={setting.id}>
                        <strong className="mr-1">{setting.key}</strong>-{" "}
                        {setting.value}
                        <button
                            onClick={() => handleChange(setting.id)}
                            className="btn-admin m-0 px-1 py-0 ml-2"
                        >
                            Edit
                        </button>
                    </li>
                ))}
            </ul>
            <div className="flex justify-center">
                <Pagination links={settings.links} />
            </div>

            {showForm && (
                <form onSubmit={handleSubmit}>
                    <h2 className="h2-center text-xl mt-4">Edit</h2>
                    <div className="mt-3 flex justify-center gap-4">
                        <input
                            type="text"
                            name="key"
                            placeholder="Setting key"
                            className="input-admin"
                        />
                        <input
                            type="text"
                            name="value"
                            placeholder="Setting value"
                            className="input-admin"
                        />
                    </div>
                    <div className="flex justify-center gap-3 mt-3">
                        <button type="submit" className="btn-primary">
                            Submit
                        </button>
                        <button
                            onClick={handleDelete}
                            type="button"
                            className="btn-delete"
                        >
                            Delete
                        </button>
                        <button
                            onClick={() => {
                                setChosenSetting(null);
                                setShowForm(false);
                                reset();
                            }}
                            type="button"
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
