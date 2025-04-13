import Pagination from "@/Components/Pagination";
import AdminLayout from "@/Layouts/AdminLayout";
import { usePage } from "@inertiajs/react";

export default function User() {
    const { users } = usePage().props;
    console.log(users.links);
    return (
        <AdminLayout>
            <h2>Users list</h2>
            <ul>
                {users.data.map((user) => (
                    <li key={user.id}>
                        <span>
                            {user.id} - {user.name}
                        </span>
                    </li>
                ))}
            </ul>

            {users.links && <Pagination links={users.links} />}
        </AdminLayout>
    );
}
