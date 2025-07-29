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
                Total Price : <strong>{order.total_price}</strong>
            </div>

            <div className="text-center mb-4">
                Status: <strong>{order.status}</strong>
                <select
                    value={data.status}
                    onChange={handleStatusChange}
                    className="input-admin p-1 ml-4"
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
        </AdminLayout>
    );
}
