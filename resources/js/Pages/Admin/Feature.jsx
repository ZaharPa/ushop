import ConfrimModal from "@/Components/ConfrimModal";
import Pagination from "@/Components/Pagination";
import AdminLayout from "@/Layouts/AdminLayout";
import { useForm, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function Feature() {
    const { features, errors } = usePage().props;

    const [showConfirm, setShowConfirm] = useState(false);
    const [chosenFeature, setChosenFeature] = useState(null);

    const {
        data,
        setData,
        post,
        put,
        delete: deleteForm,
        processing,
        reset,
    } = useForm({
        name: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (chosenFeature) {
            put(route("admin.feature.update", chosenFeature.id), {
                onSuccess: () => {
                    reset();
                    setChosenFeature(null);
                },
            });
        } else {
            post(route("admin.feature.store"), {
                onSuccess: () => {
                    reset();
                },
            });
        }
    };

    const deleteFeature = () => {
        deleteForm(route("admin.feature.destroy", chosenFeature.id), {
            onSuccess: () => {
                setChosenFeature(null);
                setShowConfirm(false);
            },
        });
    };

    return (
        <AdminLayout>
            <h2 className="h2-center">Features</h2>
            <ul className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {features.data.map((feature) => (
                    <li
                        key={feature.id}
                        className="flex justify-center items-center gap-2"
                    >
                        <span>{feature.name}</span>
                        <div>
                            <button
                                onClick={() => {
                                    setData("name", feature.name);
                                    setChosenFeature(feature);
                                }}
                                className="btn-admin py-0"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => {
                                    setShowConfirm(true);
                                    setChosenFeature(feature);
                                }}
                                className="btn-delete py-0"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            <Pagination links={features.links} />

            <form onSubmit={handleSubmit}>
                <h2 className="h2-center mt-6">
                    {chosenFeature ? "Edit Feature" : "Add new Features"}
                </h2>
                <div className="flex justify-center gap-2">
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
                        {chosenFeature ? "Update" : "Add"}
                    </button>

                    <button
                        type="reset"
                        onClick={() => {
                            reset();
                            setChosenFeature();
                            setData("name", "");
                        }}
                        className="btn-reset"
                    >
                        Reset
                    </button>
                </div>
            </form>

            <ConfrimModal
                show={showConfirm}
                onConfrim={deleteFeature}
                onCancel={() => {
                    setShowConfirm(false), reset();
                }}
                message="Are you sure want to delete this feature?"
            />
        </AdminLayout>
    );
}
