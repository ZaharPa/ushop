import Pagination from "@/Components/Pagination";
import AdminLayout from "@/Layouts/AdminLayout";
import { router, usePage } from "@inertiajs/react";

export default function DeletedProducts() {
    const { products } = usePage().props;

    return (
        <AdminLayout>
            <h2 className="h2-center">Deleted Products List</h2>
            <ul className="w-full">
                <li className="grid grid-cols-7 gap-4 mb-2 text-center font-medium text-lg">
                    <div>Id</div>
                    <div className="col-span-2">Photo</div>
                    <div>Name</div>
                    <div>Category</div>
                    <div>Features</div>
                    <div></div>
                </li>
                {products.data.map((product) => (
                    <li
                        key={product.id}
                        className="grid grid-cols-7 gap-2 text-center mt-4"
                    >
                        <div>{product.id}</div>
                        <div className="col-span-2 flex justify-center">
                            <img
                                src={product.photo_url}
                                alt="Photo"
                                className="h-32"
                            />
                        </div>
                        <div className="col-span-1">{product.name}</div>
                        <div className="col-span-1">
                            {product.category?.name}
                        </div>
                        <div className="col-span-1 flex flex-col gap-1">
                            {product.features.map((feature) => (
                                <li key={feature.id}>
                                    {feature.name} {feature.pivot.value}
                                </li>
                            ))}
                        </div>
                        <div className="col-span-1">
                            <button
                                type="button"
                                onClick={() => {
                                    router.put(
                                        route(
                                            "admin.product.restore",
                                            product.id
                                        )
                                    );
                                }}
                                className="btn-primary"
                            >
                                Restore
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            {products.links && (
                <div className="flex justify-center mt-2 mb-4">
                    <Pagination links={products.links} />
                </div>
            )}
        </AdminLayout>
    );
}
