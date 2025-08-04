import Pagination from "@/Components/Pagination";
import AdminLayout from "@/Layouts/AdminLayout";
import { Link, usePage } from "@inertiajs/react";

export default function Index() {
    const { ordersByStatus } = usePage().props;

    return (
        <AdminLayout>
            <h2 className="h2-center">Orders List</h2>
            {Object.entries(ordersByStatus).map(([status, orders]) => (
                <div key={status} className="mb-12">
                    <h3 className="text-center text-xl font-bold mb-2 capitalize">
                        {status}
                    </h3>
                    <ul className="w-full">
                        <li className="grid grid-cols-4 gap-4 mb-2 text-center font-medium text-lg">
                            <div>ID</div>
                            <div>Customer</div>
                            <div>Total</div>
                            <div></div>
                        </li>
                        {orders.data.map((order) => (
                            <li
                                key={order.id}
                                className="grid grid-cols-4 gap-4 mb-2 text-center"
                            >
                                <div>{order.id}</div>
                                <div>{order.name}</div>
                                <div>{order.total_price}</div>
                                <Link
                                    href={route("admin.order.show", order.id)}
                                    type="button"
                                    className="btn-admin"
                                >
                                    View
                                </Link>
                            </li>
                        ))}

                        <li className="mt-6 mx-auto w-fit">
                            <Pagination links={orders.links} />
                        </li>
                    </ul>
                </div>
            ))}
        </AdminLayout>
    );
}
