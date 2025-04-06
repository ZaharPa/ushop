import AdminLayout from "@/Layouts/AdminLayout";
import { usePage } from "@inertiajs/react";

export default function Categories() {
    const { categories } = usePage().props;
    return (
        <AdminLayout>
            <ul>
                {categories.map((category) => (
                    <li key={category.id}>
                        <h2>
                            {category.id} - {category.name}
                        </h2>
                    </li>
                ))}
            </ul>
        </AdminLayout>
    );
}
