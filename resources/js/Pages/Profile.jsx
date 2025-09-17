import Pagination from "@/Components/Pagination";
import { Link, router, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function Profile() {
    const { user, activeOrders, historyOrders, errors } = usePage().props;

    const [emailForm, setEmailForm] = useState(false);
    const [newEmail, setNewEmail] = useState("");

    const [passForm, setPassForm] = useState(false);
    const [newPass, setNewPass] = useState("");
    const [oldPass, setOldPass] = useState("");

    const closeForm = () => {
        setNewEmail("");
        setNewPass("");
        setOldPass("");
        setPassForm(false);
        setEmailForm(false);
    };

    const sendNewEmail = () => {
        router.post(route("profile.newEmail", { newEmail }));

        closeForm();
    };

    const sendNewPass = () => {
        router.post(route("profile.newPass"), { oldPass, newPass });

        closeForm();
    };

    return (
        <>
            <h2 className="h2-center">Welcome {user.name}</h2>

            <div className="flex gap-4">
                <button
                    onClick={() => setEmailForm(true)}
                    className="btn-admin"
                >
                    Change Email
                </button>

                <button onClick={() => setPassForm(true)} className="btn-admin">
                    Change Password
                </button>

                {errors.oldPass && (
                    <div className="text-red-500 my-1">{errors.oldPass}</div>
                )}
            </div>

            <div className="mt-6">
                {activeOrders.data.length > 0 && (
                    <>
                        <h3 className="text-lg font-medium mx-auto text-center">
                            Your Active orders
                        </h3>
                        {activeOrders.data.map((order) => (
                            <div
                                key={order.id}
                                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 border p-4 my-2 rounded"
                            >
                                <div>Order ID: {order.id}</div>
                                <div>Status: {order.status}</div>
                                <div>Total: {order.total_price}</div>
                                <div className="flex gap-2 text-sm">
                                    {order.items.map((item, i) => (
                                        <div key={item.id}>
                                            <Link
                                                href={route("product.show", [
                                                    item.item.product.id,
                                                    item.item.id,
                                                ])}
                                                className="hover:text-sky-600"
                                            >
                                                {item.item.product.name.slice(
                                                    0,
                                                    10
                                                )}
                                            </Link>
                                            {i < order.items.length - 1 && (
                                                <span className="mx-1">|</span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}

                        <div className="flex justify-center">
                            <Pagination links={activeOrders.links} />
                        </div>
                    </>
                )}

                <div className="mt-6">
                    {historyOrders.data.length > 0 && (
                        <>
                            <h3 className="text-lg font-medium mx-auto text-center">
                                Your History orders
                            </h3>
                            {historyOrders.data.map((order) => (
                                <div
                                    key={order.id}
                                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 border p-4 my-2 rounded"
                                >
                                    <div>Order ID: {order.id}</div>
                                    <div>Status: {order.status}</div>
                                    <div>Total: {order.total_price}</div>
                                    <div className="flex gap-2 text-sm">
                                        {order.items.map((item, i) => (
                                            <div key={item.id}>
                                                <Link
                                                    href={route(
                                                        "product.show",
                                                        [
                                                            item.item.product
                                                                .id,
                                                            item.item.id,
                                                        ]
                                                    )}
                                                    className="hover:text-sky-600"
                                                >
                                                    {item.item.product.name.slice(
                                                        0,
                                                        10
                                                    )}
                                                </Link>
                                                {i < order.items.length - 1 && (
                                                    <span className="mx-1">
                                                        |
                                                    </span>
                                                )}
                                                <span className="mx-1">|</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}

                            <div className="flex justify-center">
                                <Pagination links={historyOrders.links} />
                            </div>
                        </>
                    )}
                </div>
            </div>

            {(emailForm || passForm) && (
                <div
                    onClick={() => closeForm()}
                    className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white p-6 rounded-lg w-96"
                    >
                        <h2 className="h2-center">
                            New {emailForm ? "email" : "password"}
                        </h2>
                        {emailForm ? (
                            <input
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                                className="input-admin w-full"
                            />
                        ) : (
                            <>
                                <span>Input your old password</span>
                                <input
                                    value={oldPass}
                                    onChange={(e) => setOldPass(e.target.value)}
                                    className="input-admin w-full"
                                />

                                <span>Input your new password</span>
                                <input
                                    value={newPass}
                                    onChange={(e) => setNewPass(e.target.value)}
                                    className="input-admin w-full"
                                />
                            </>
                        )}

                        <div className="flex justify-end gap-4 mt-4">
                            <button
                                type="button"
                                onClick={() => {
                                    emailForm ? sendNewEmail() : sendNewPass();
                                }}
                                className="btn-primary"
                            >
                                Confrim
                            </button>
                            <button
                                type="button"
                                onClick={() => closeForm()}
                                className="btn-reset"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
