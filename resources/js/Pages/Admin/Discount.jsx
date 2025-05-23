import Pagination from "@/Components/Pagination";
import AdminLayout from "@/Layouts/AdminLayout";
import { useForm, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function Discount() {
    const { discounts, items, errors } = usePage().props;

    const [showForm, setShowForm] = useState(false);
    const [chosenDiscount, setChosenDiscount] = useState(null);

    const {
        data,
        setData,
        post,
        put,
        delete: deleteData,
        processing,
        reset,
    } = useForm({
        item_id: "",
        percentage: "",
        start_date: "",
        end_date: "",
    });

    const handleNewDiscount = () => {
        setChosenDiscount(null);
        setData({
            item_id: "",
            percentage: "",
            start_date: "",
            end_date: "",
        });
        reset();
        setShowForm(true);
    };

    const handleChange = (discount) => {
        setChosenDiscount(discount);
        setData({
            item_id: discount.item_id,
            percentage: discount.percentage,
            start_date: discount.start_date,
            end_date: discount.end_date,
        });

        setShowForm(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (chosenDiscount) {
            put(route("admin.discount.update", chosenDiscount.id), {
                onSuccess: () => {
                    setShowForm(false);
                    setChosenDiscount(null);
                    reset();
                },
            });
        } else {
            post(route("admin.discount.store"), {
                onSuccess: () => {
                    setShowForm(false);
                    reset();
                },
            });
        }
    };

    const handleDelete = () => {
        deleteData(route("admin.discount.destroy", chosenDiscount.id), {
            onSuccess: () => {
                setShowForm(false);
                setChosenDiscount(null);
                reset();
            },
        });
    };

    return (
        <AdminLayout>
            <button onClick={handleNewDiscount} className="btn-primary">
                Create Discount
            </button>
            <h2 className="h2-center">Discounts</h2>
            <ul>
                <li className="grid grid-cols-7 gap-4 mb-2 text-center font-medium text-lg">
                    <div>Id</div>
                    <div className="col-span-2">Item</div>
                    <div>Percent</div>
                    <div>Start</div>
                    <div>End</div>
                    <div></div>
                </li>
                {discounts.data.map((discount) => (
                    <li
                        key={discount.id}
                        className="grid grid-cols-7 gap-4 mb-2 text-center"
                    >
                        <div>{discount.id}</div>
                        <div className="col-span-2">
                            {discount.item.product.name} - {discount.item.id}
                        </div>
                        <div>{discount.percentage}</div>
                        <div>{discount.start_date}</div>
                        <div>{discount.end_date}</div>
                        <div>
                            <button
                                onClick={() => handleChange(discount)}
                                className="btn-admin"
                            >
                                Edit
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            <div className="flex justify-center">
                <Pagination links={discounts.links} />
            </div>

            {showForm && (
                <div className="dotted-form">
                    <form
                        onSubmit={handleSubmit}
                        className="text-center flex flex-col gap-2"
                    >
                        <h2 className="h2-center text-lg">
                            {chosenDiscount
                                ? "Edit Discount"
                                : "Add new Discount"}
                        </h2>
                        {chosenDiscount && <div>Id - {chosenDiscount.id}</div>}

                        <div>
                            <span>Item - </span>
                            <select
                                value={data.item_id || ""}
                                onChange={(e) =>
                                    setData("item_id", e.target.value)
                                }
                                className="px-1 border border-gray-600 rounded-lg mt-2"
                            >
                                <option value="">None</option>
                                {items.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.product.name} - {item.id} -{" "}
                                        {item.price}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {errors.item_id && (
                            <div className="text-red-500 my-1">
                                {errors.item_id}
                            </div>
                        )}

                        <div>
                            <span>Percentage - </span>
                            <input
                                type="number"
                                value={data.percentage}
                                onChange={(e) =>
                                    setData("percentage", e.target.value)
                                }
                                className="input-admin"
                            />
                        </div>
                        {errors.percentage && (
                            <div className="text-red-500 my-1">
                                {errors.percentage}
                            </div>
                        )}

                        <div>
                            <span>Start Date - </span>
                            <input
                                type="date"
                                value={data.start_date}
                                onChange={(e) =>
                                    setData("start_date", e.target.value)
                                }
                                className="input-admin"
                            />
                        </div>
                        {errors.start_date && (
                            <div className="text-red-500 my-1">
                                {errors.start_date}
                            </div>
                        )}

                        <div>
                            <span>End Date - </span>
                            <input
                                type="date"
                                value={data.end_date}
                                onChange={(e) =>
                                    setData("end_date", e.target.value)
                                }
                                className="input-admin"
                            />
                        </div>
                        {errors.end_date && (
                            <div className="text-red-500 my-1">
                                {errors.end_date}
                            </div>
                        )}
                        <div className="flex justify-center gap-4 mt-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className="btn-primary"
                            >
                                {chosenDiscount ? "Update" : "Create"}
                            </button>

                            {chosenDiscount && (
                                <button
                                    onClick={handleDelete}
                                    type="button"
                                    className="btn-delete"
                                >
                                    Delete
                                </button>
                            )}

                            <button
                                type="button"
                                onClick={() => {
                                    setShowForm(false);
                                    setChosenDiscount(null);
                                    reset();
                                }}
                                className="btn-reset"
                            >
                                Reset
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </AdminLayout>
    );
}
