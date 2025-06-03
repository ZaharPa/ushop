import AdminLayout from "@/Layouts/AdminLayout";
import { usePage } from "@inertiajs/react";

export default function Layout() {
    const { links } = usePage().props;
    return (
        <AdminLayout>
            <button className="btn-primary">Add new Link</button>
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
                            <input type="checkbox" checked={link.is_active} />
                        </div>
                        <div>
                            <button className="btn-admin py-0">Edit</button>
                            <button className="btn-delete py-0">Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </AdminLayout>
    );
}
