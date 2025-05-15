import ConfrimModal from "@/Components/ConfrimModal";
import Pagination from "@/Components/Pagination";
import AdminLayout from "@/Layouts/AdminLayout";
import { useForm, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function Attribute() {
    const { attributes } = usePage().props;

    const [showConfirm, setShowConfirm] = useState(false);
    const [chosenAttribute, setChosenAttribute] = useState(null);
    const [valueName, setValueName] = useState(null);

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

    const addValue = (e, attributeId) => {
        e.preventDefault();

        post(route("admin.attribute.newValue", attributeId), {
            data: { name: valueName },
            onSuccess: () => {
                reset();
                setValueName(null);
            },
        });
    };
    return (
        <AdminLayout>
            <h2 className="h2-center">Attributes</h2>

            <ul className="flex flex-col">
                {attributes.data.map((attribute) => (
                    <li key={attribute.id}>
                        <div className="flex justify-between mx-4 items-center gap-2">
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
                        </div>
                        <div>
                            {attribute.value} <button>Add value</button>
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
