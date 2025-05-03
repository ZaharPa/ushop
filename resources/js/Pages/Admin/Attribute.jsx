import AdminLayout from "@/Layouts/AdminLayout";
import { useForm, usePage } from "@inertiajs/react";

export default function Attribute() {
    const { attributes } = usePage().props;
    const { data, setData, post, processing, reset } = useForm({
        attribute: "",
    });

    const createAttribute = () => {
        post(route("admin.attribute.store"), {
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <AdminLayout>
            <ul>
                {attributes.data.map((attribute) => (
                    <li key={attribute.id}>{attribute.name}</li>
                ))}
            </ul>

            <form onSubmit={createAttribute}>
                <h2 className="h2-center">Add new Attibute</h2>
                <input
                    type="text"
                    value={data.attribute}
                    onChange={(e) => setData("attribute", e.target.value)}
                    className="input-admin"
                />
                <button
                    type="submit"
                    disabled={processing}
                    className="btn-admin"
                >
                    Add
                </button>
            </form>
        </AdminLayout>
    );
}
