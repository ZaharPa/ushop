import Pagination from "@/Components/Pagination";
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

    const editFeature = () => {};

    const deleteFeature = () => {};

    return (
        <AdminLayout>
            <h2 className="h2-center">Features</h2>
            <ul className="grid grid-cols-2">
                {features.data.map((feature) => (
                    <li key={feature.id} className="flex items-center gap-2">
                        <span>{feature.name}</span>
                        <div>
                            <button
                                onClick={editFeature}
                                className="btn-admin py-0"
                            >
                                Edit
                            </button>
                            <button
                                onClick={deleteFeature}
                                className="btn-delete py-0"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            <Pagination links={features.links} />

            <form onSubmit={createFeature}>
                <h2 className="h2-center mt-6">Add new Features</h2>
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
