import Pagination from "@/Components/Pagination";
import RecentlyViewed from "@/Components/RecentlyViewed";
import { Link, router, usePage } from "@inertiajs/react";
import { CheckCircle, Clock, Mail, Package, User, X, Lock } from "lucide-react";
import { useState } from "react";

export default function Profile() {
    const { user, activeOrders, historyOrders, errors, recentlyViewed } =
        usePage().props;

    const [activeTab, setActiveTab] = useState("active");
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

    const currentOrders = activeTab === "active" ? activeOrders : historyOrders;

    const getStatusColor = (status) => {
        const colors = {
            pending: "bg-yellow-100 text-yellow-700 border-yellow-300",
            processing: "bg-blue-100 text-blue-700 border-blue-300",
            shipped: "bg-purple-100 text-purple-700 border-purple-300",
            delivered: "bg-green-100 text-green-700 border-green-300",
            cancelled: "bg-red-100 text-red-700 border-red-300",
        };
        return (
            colors[status?.toLowerCase()] ||
            "bg-gray-100 text-gray-700 border-gray-300"
        );
    };

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8">
            <div className="bg-gradient-to-r from-sky-600 to-blue-700 rounded-2xl p-8 mb-8 shadow-xl">
                <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                        <User size={32} className="text-sky-600" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-white">
                            Welcome, {user.name}!
                        </h1>
                        <p className="text-sky-100">{user.email}</p>
                    </div>
                </div>

                <div className="flex flex-wrap gap-3 mb-2">
                    <button
                        onClick={() => setEmailForm(true)}
                        className="flex items-center gap-2 bg-white text-sky-700 px-6 py-3  rounded-lg font-semibold hover:bg-sky-100 transition-all shadow-md hover:shadow-lg"
                    >
                        <Mail size={20} />
                        Change Email
                    </button>

                    <button
                        onClick={() => setPassForm(true)}
                        className="flex items-center gap-2 bg-white text-sky-700 px-6 py-3  rounded-lg font-semibold hover:bg-sky-100 transition-all shadow-md hover:shadow-lg"
                    >
                        <Lock size={20} />
                        Change Password
                    </button>

                    {errors.oldPass && (
                        <div className="mt-4 bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg">
                            {errors.oldPass}
                        </div>
                    )}
                </div>

                <div className="mb-8">
                    <div className="flex gap-2 border-b-2 border-gray-200 mb-6">
                        <button
                            onClick={() => setActiveTab("active")}
                            className={`${
                                activeTab === "active"
                                    ? "btn-primary from-sky-700 to-blue-900"
                                    : "btn-secondary"
                            }`}
                        >
                            <Clock size={20} />
                            Active Orders
                            {activeOrders.data.length > 0 && (
                                <span className="bg-sky-100 text-sky-700 px-2 py-0.5 rounded-full text-xs font-bold">
                                    {activeOrders.data.length}
                                </span>
                            )}
                        </button>

                        <button
                            onClick={() => setActiveTab("history")}
                            className={`${
                                activeTab === "history"
                                    ? "btn-primary from-sky-700 to-blue-900"
                                    : "btn-secondary"
                            }`}
                        >
                            <CheckCircle size={20} />
                            Order History
                            {historyOrders.data.length > 0 && (
                                <span className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full text-xs font-bold">
                                    {activeOrders.data.length}
                                </span>
                            )}
                        </button>
                    </div>

                    {currentOrders.data.length > 0 ? (
                        <>
                            <div className="space-y-4">
                                {currentOrders.data.map((order) => (
                                    <div
                                        key={order.id}
                                        className={`bg-white rounded-xl p-6 hover:shadow-lg transition-all border-2 ${
                                            activeTab === "active"
                                                ? "border-sky-200"
                                                : "border-gray-200"
                                        }`}
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                                            <div>
                                                <span className="text-sm text-gray-500">
                                                    Order Id
                                                </span>
                                                <p className="font-bold text-gray-900">
                                                    #{order.id}
                                                </p>
                                            </div>
                                            <div>
                                                <span className="text-sm text-gray-500">
                                                    Status
                                                </span>
                                                <p>
                                                    <span
                                                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                                                            order.status,
                                                        )}`}
                                                    >
                                                        {order.status}
                                                    </span>
                                                </p>
                                            </div>
                                            <div>
                                                <span className="text-sm text-gray-500">
                                                    Total
                                                </span>
                                                <p
                                                    className={`font-bold text-lg ${
                                                        activeTab === "active"
                                                            ? "text-sky-700"
                                                            : "text-gray-700"
                                                    }`}
                                                >
                                                    $
                                                    {Number(
                                                        order.total_price,
                                                    ).toFixed(2)}
                                                </p>
                                            </div>
                                            <div>
                                                <span className="text-sm text-gray-500">
                                                    Items
                                                </span>
                                                <p className="font-semibold text-gray-900">
                                                    {order.items.length} item
                                                    {order.items.length > 1
                                                        ? "s"
                                                        : ""}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="border-t pt-4">
                                            <span className="text-sm text-gray-500 block mb-2">
                                                Products:{" "}
                                            </span>
                                            <div className="flex flex-wrap gap-2">
                                                {order.items.map((item) => (
                                                    <Link
                                                        key={item.id}
                                                        href={route(
                                                            "product.show",
                                                            [
                                                                item.item
                                                                    .product.id,
                                                                item.item.id,
                                                            ],
                                                        )}
                                                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                                                            activeTab ===
                                                            "active"
                                                                ? "bg-sky-50 hover:bg-sky-100 text-sky-700 border-sky-200"
                                                                : "bg-gray-50 hover:bg-gray-100 text-gray-700 border-gray-200"
                                                        }`}
                                                    >
                                                        {item.item.product.name}{" "}
                                                        * {item.quantity}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {currentOrders.links &&
                                currentOrders.links.length > 3 && (
                                    <div className="flex justify-center mt-6">
                                        <Pagination
                                            links={currentOrders.links}
                                        />
                                    </div>
                                )}
                        </>
                    ) : (
                        <div className="text-center py-16 bg-gray-50 rounded-xl">
                            <Package
                                size={64}
                                className="mx-auto text-gray-300 mb-4"
                            />
                            <p className="text-gray-600 text-lg font-medium">
                                {activeTab === "active"
                                    ? "You don't have any active orders yet"
                                    : "Yoy don't have any order history yet"}
                            </p>
                            <Link
                                href={route("catalog.index")}
                                className="btn-primary mt-4 inline-block"
                            >
                                Browse Products
                            </Link>
                        </div>
                    )}
                </div>

                <section>
                    <RecentlyViewed recentlyViewed={recentlyViewed} />
                </section>

                {(emailForm || passForm) && (
                    <div
                        onClick={() => closeForm()}
                        className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4"
                    >
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white p-6 rounded-2xl max-w-md w-full shadow-2xl"
                        >
                            <div className="flex items-center justify-between p-6 border-b">
                                <h2 className="h2-center">
                                    Change {emailForm ? "email" : "password"}
                                </h2>
                                <button
                                    onClick={closeForm}
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="p-6 space-y-4">
                                {emailForm ? (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            New Email
                                        </label>
                                        <input
                                            type="email"
                                            value={newEmail}
                                            onChange={(e) =>
                                                setNewEmail(e.target.value)
                                            }
                                            placeholder="example@email.com"
                                            className="input-admin w-full"
                                        />
                                    </div>
                                ) : (
                                    <>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Current Password
                                            </label>
                                            <input
                                                value={oldPass}
                                                onChange={(e) =>
                                                    setOldPass(e.target.value)
                                                }
                                                placeholder="Enter current password"
                                                className="input-admin w-full"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                New Password
                                            </label>
                                            <input
                                                value={newPass}
                                                onChange={(e) =>
                                                    setNewPass(e.target.value)
                                                }
                                                placeholder="Enter new password"
                                                className="input-admin w-full"
                                            />
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className="flex justify-end gap-4 p-6 border-t bg-gray-50 rounded-b-2xl mt-4">
                                <button
                                    type="button"
                                    onClick={() => {
                                        emailForm
                                            ? sendNewEmail()
                                            : sendNewPass();
                                    }}
                                    className="btn-primary"
                                >
                                    Confrim
                                </button>
                                <button
                                    type="button"
                                    onClick={() => closeForm()}
                                    className="btn-secondary"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
