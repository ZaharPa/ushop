import Pagination from "@/Components/Pagination";
import AdminLayout from "@/Layouts/AdminLayout";
import { router, usePage } from "@inertiajs/react";

export default function Refund() {
    const { refunds } = usePage().props;

    function changeStatus(id, status) {
        router.put(route("admin.refund.update", id), { status });
    }
    return (
        <AdminLayout>
            <h2 className="h2-center">List of Refund's request</h2>
            <ul className="">
                {refunds.data.map((refund) => (
                    <li key={refund.id}>
                        <div>
                            <span className="font-bold">{refund.order_id}</span>
                            - {refund.reason} - {refund.details}
                        </div>
                        <div className="text-sm text-gray-600">
                            {refund.amount} - {refund.status}
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() =>
                                    changeStatus(refund.id, "approved")
                                }
                                className="btn-primary"
                            >
                                Approve
                            </button>
                            <button
                                onClick={() =>
                                    changeStatus(refund.id, "rejected")
                                }
                                className="btn-delete"
                            >
                                Reject
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            <div className="flex justify-center">
                <Pagination links={refunds.links} />
            </div>
        </AdminLayout>
    );
}
