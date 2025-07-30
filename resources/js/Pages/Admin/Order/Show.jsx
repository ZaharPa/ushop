import AdminLayout from "@/Layouts/AdminLayout";
import { useForm, usePage } from "@inertiajs/react";
import { useEffect } from "react";

export default function Show() {
    const { order } = usePage().props;

    const { data, setData, put } = useForm({
        status: order.status || "",
    });

    const handleStatusChange = (e) => {
        setData("status", e.target.value);
    };

    useEffect(() => {
        if (data.status) {
            put(route("admin.order.update", order.id));
        }
    }, [data.status]);

    return (
        <AdminLayout>
            <h2 className="h2-center">Order №{order.id}</h2>
            <div className="text-center mb-4">
                Ordered by: {order.user_id ? ` id - ${order.user_id} ` : ""}
                <strong>{order.name}</strong>
            </div>

            <div className="text-center mb-4">
                Created at:
                <strong className="ml-2">
                    {new Date(order.created_at).toLocaleString()}
                </strong>
            </div>

            <div className="text-center mb-4">
                Status:
                <select
                    value={data.status}
                    onChange={handleStatusChange}
                    className="input-admin p-1 ml-4 font-bold"
                >
                    <option value={""}>Select status</option>
                    <option value={"pending"}>Pending</option>
                    <option value={"confirmed"}>Confirmed</option>
                    <option value={"paid"}>Paid</option>
                    <option value={"shipped"}>Shipped</option>
                    <option value={"delivered"}>Delivered</option>
                    <option value={"cancelled"}>Cancelled</option>
                </select>
            </div>

            <div className="text-center mb-4">
                Address:
                <strong className="ml-2">
                    {order.address} {order?.address2}
                </strong>
            </div>

            <div className="text-center mb-4">
                Phone:
                <strong className="ml-2">{order.phone}</strong>
            </div>

            <div className="text-center mb-4">
                Email:
                <strong className="ml-2">{order.email}</strong>
            </div>

            <div className="text-center mb-4">
                Total Price: <strong>{order.total_price}</strong>
            </div>

            <div className="text-center mb-4">
                Items:
                <div className="flex flex-col items-center gap-3">
                    {order.items.map((it) => (
                        <div key={it.id}>
                            <span> Name - {it.item.product.name}</span>
                            <span className="ml-4">
                                Quantity: {it.quantity}
                            </span>
                            <span className="ml-4">Price: {it.price}</span>
                            <span className="ml-4">
                                Subtotal: {it.subtotal}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
}
