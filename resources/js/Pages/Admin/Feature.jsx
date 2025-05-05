import AdminLayout from "@/Layouts/AdminLayout";
import { useForm, usePage } from "@inertiajs/react";

export default function Feature() {
    const { features } = usePage().props;

    const { data, setData, post, processing, reset } = useForm({
        name: "",
    });

    const createFeature = () => {
        post(route("admin.feature.store"), {
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <AdminLayout>
            <ul>
                {features.data.map((feature) => (
                    <li key={feature.id}>{feature.name}</li>
                ))}
            </ul>

            <form onSubmit={createFeature}>
                <h2 className="h2-center">Add new Features</h2>
                <input
                    type="text"
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    placeholder="Feature name"
                    className="input-admin"
                />

                <button
                    type="submit"
                    disabled={processing}
                    className="btn-admin"
                >
                    Add
                </button>

                <button type="reset" onClick={reset} className="btn-reset">
                    Reset
                </button>
            </form>
        </AdminLayout>
    );
}
