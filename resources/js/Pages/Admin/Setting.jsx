import Pagination from "@/Components/Pagination";
import AdminLayout from "@/Layouts/AdminLayout";
import { usePage } from "@inertiajs/react";

export default function Setting() {
    const { settings } = usePage().props;

    return (
        <AdminLayout>
            <h2 className="h2-center">Settings</h2>
            <ul>
                {settings.data.map((setting) => (
                    <li key={setting.id}>
                        <strong className="mr-1">{setting.key}</strong>-{" "}
                        {setting.value}
                        <button className="btn-admin m-0 px-1 py-0 ml-2">
                            Edit
                        </button>
                    </li>
                ))}
            </ul>
            <div className="flex justify-center">
                <Pagination links={settings.links} />
            </div>

            <form>
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
                    <button type="button" className="btn-delete">
                        Delete
                    </button>
                    <button type="button" className="btn-reset">
                        Reset
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
}
