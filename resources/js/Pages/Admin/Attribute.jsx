import ConfrimModal from "@/Components/ConfrimModal";
import Pagination from "@/Components/Pagination";
import AdminLayout from "@/Layouts/AdminLayout";
import { useForm, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function Attribute() {
    const { attributes } = usePage().props;

    const [showConfirm, setShowConfirm] = useState(false);
    const [chosenAttribute, setChosenAttribute] = useState(null);

    const {
        data,
        setData,
        post,
        put,
        delete: deleteForm,
        processing,
        reset,
    } = useForm({
        attribute: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (chosenAttribute) {
            put(route("admin.attribute.update", chosenAttribute.id), {
                onSuccess: () => {
                    reset();
                    setChosenAttribute(null);
                },
            });
        } else {
            post(route("admin.attribute.store"), {
                onSuccess: () => {
                    reset();
                },
            });
        }
    };

    const deleteAttribute = () => {
        deleteForm(route("admin.attribute.destroy", chosenAttribute.id), {
            onSuccess: () => {
                setChosenAttribute(null);
                setShowConfirm(false);
            },
        });
    };

    return (
        <AdminLayout>
            <h2 className="h2-center">Attributes</h2>

            <ul className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {attributes.data.map((attribute) => (
                    <li
                        key={attribute.id}
                        className="flex justify-center items-center gap-2"
                    >
                        <span>{attribute.name}</span>
                        <div>
                            <button
                                onClick={() => {
                                    setData("attribute", attribute.name);
                                    setChosenAttribute(attribute);
                                }}
                                className="btn-admin py-0"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => {
                                    setShowConfirm(true);
                                    setChosenAttribute(attribute);
                                }}
                                className="btn-delete py-0"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            <Pagination links={attributes.links} />

            <form onSubmit={handleSubmit}>
                <h2 className="h2-center mt-6">
                    {chosenAttribute ? "Edit Attribute" : "Add new Attribute"}
                </h2>
                <div className="flex justify-center gap-2">
                    <input
                        type="text"
                        value={data.attribute}
                        onChange={(e) => setData("attribute", e.target.value)}
                        placeholder="Attribute name"
                        className="input-admin"
                    />

                    <button
                        type="submit"
                        disabled={processing}
                        className="btn-admin"
                    >
                        {chosenAttribute ? "Update" : "Add"}
                    </button>

                    <button
                        type="reset"
                        onClick={() => {
                            reset();
                            setChosenAttribute();
                            setData("attribute", "");
                        }}
                        className="btn-reset"
                    >
                        Reset
                    </button>
                </div>
            </form>

            <ConfrimModal
                show={showConfirm}
                onConfrim={deleteAttribute}
                onCancel={() => {
                    setShowConfirm(false), reset();
                }}
                message="Are you sure want to delete this attribute?"
            />
        </AdminLayout>
    );
}
