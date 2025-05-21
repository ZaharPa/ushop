import AdminLayout from "@/Layouts/AdminLayout";
import { Link, usePage } from "@inertiajs/react";

export default function Index() {
    const { items } = usePage().props;

    return (
        <AdminLayout>
            <Link href={route("admin.item.create")} className="btn-primary">
                Add new Item
            </Link>
            <h2 className="h2-center">Items List</h2>
            <ul className="w-full">
                <li className="grid grid-cols-7 gap-4 mb-2 text-center font-medium text-lg">
                    <div>Id</div>
                    <div>Product</div>
                    <div>Price</div>
                    <div>Quantity</div>
                    <div className="col-span-2">Attributes</div>
                    <div></div>
                </li>
                {items.data.map((item) => (
                    <li
                        key={item.id}
                        className="grid grid-cols-7 gap-4 mb-2 text-center"
                    >
                        <div>{item.id}</div>
                        <div>{item.product.name}</div>
                        <div>{item.price}</div>
                        <div>{item.quantity}</div>
                        <div className="col-span-2">
                            {item.attribute_values?.map((attr) => (
                                <div key={attr.id}>
                                    <div>
                                        {attr.attribute.name} - {attr.value}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div>
                            <Link
                                href={route("admin.item.edit", item.id)}
                                type="button"
                                className="btn-admin"
                            >
                                Edit
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>
        </AdminLayout>
    );
}
