import ConfrimModal from "@/Components/ConfrimModal";
import Pagination from "@/Components/Pagination";
import AdminLayout from "@/Layouts/AdminLayout";
import { router, useForm, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function Attribute() {
    const { attributes } = usePage().props;

    const [showConfirm, setShowConfirm] = useState(false);
    const [chosenAttribute, setChosenAttribute] = useState(null);

    const [valueFormVisibleId, setValueFormVisibleId] = useState(null);
    const [valueName, setValueName] = useState(null);
    const [valueToDelete, setValueToDelete] = useState(null);

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
        router.post(
            route("admin.attribute.newValue", { attribute: attributeId }),
            {
                name: valueName,
                onSuccess: () => {
                    reset();
                    setValueName(null);
                },
            }
        );
    };

    const confirmDeleteValue = (valueId, attributeId) => {
        setValueToDelete(valueId);
        setShowConfirm(true);
        setChosenAttribute(attributeId);
    };

    const deleteValue = () => {
        router.delete(
            route("admin.attribute.removeValue", {
                attribute: chosenAttribute,
                value: valueToDelete,
            }),
            {
                onSuccess: () => {
                    setValueToDelete(null);
                    setShowConfirm(false);
                },
            }
        );
    };

    return (
        <AdminLayout>
            <h2 className="h2-center">Attributes</h2>

            <ul className="flex flex-col">
                {attributes.data.map((attribute) => (
                    <li key={attribute.id}>
                        <div className="shadow-xl mb-4">
                            <div className="flex justify-between mx-4 items-center gap-2 shadow-xs">
                                <span>{attribute.name}</span>
                                <div>
                                    <button
                                        onClick={() => {
                                            setData(
                                                "attribute",
                                                attribute.name
                                            );
                                            setChosenAttribute(attribute);
                                        }}
                                        className="btn-primary py-0"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => {
                                            setShowConfirm(true);
                                            setChosenAttribute(attribute);
                                        }}
                                        className="btn-danger py-0"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                            <div>
                                <div className="mx-4 flex mb-1">
                                    {attribute.values.map((value) => (
                                        <div
                                            key={value.id}
                                            onClick={() =>
                                                confirmDeleteValue(
                                                    value.id,
                                                    attribute.id
                                                )
                                            }
                                        >
                                            <span className="cursor-pointer hover:text-red-500">
                                                {value.value}
                                            </span>
                                            <span className="mx-1">|</span>
                                        </div>
                                    ))}
                                    <button
                                        onClick={() =>
                                            setValueFormVisibleId(attribute.id)
                                        }
                                        className="text-blue-700 cursor-pointer"
                                    >
                                        Add value
                                    </button>
                                </div>
                                {valueFormVisibleId === attribute.id && (
                                    <form
                                        onSubmit={(e) =>
                                            addValue(e, attribute.id)
                                        }
                                    >
                                        <input
                                            value={valueName}
                                            onChange={(e) =>
                                                setValueName(e.target.value)
                                            }
                                            placeholder="New value"
                                            className="border border-gray-400 rounded-2xl mb-1 mx-2 placeholder:text-sm placeholder:pl-2"
                                        />
                                        <button
                                            type="submit"
                                            className="btn-primary p-1 text-sm"
                                        >
                                            Save
                                        </button>
                                    </form>
                                )}
                            </div>
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
                        className="btn-primary"
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
                        className="btn-secondary"
                    >
                        Reset
                    </button>
                </div>
            </form>

            <ConfrimModal
                show={showConfirm}
                onConfrim={() => {
                    if (valueToDelete) deleteValue();
                    else deleteAttribute();
                }}
                onCancel={() => {
                    setShowConfirm(false);
                    setValueToDelete(null);
                    reset();
                }}
                message="Are you sure want to delete?"
            />
        </AdminLayout>
    );
}
