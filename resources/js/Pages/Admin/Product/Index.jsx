import FilterProduct from "@/Components/FilterProduct";
import Pagination from "@/Components/Pagination";
import AdminLayout from "@/Layouts/AdminLayout";
import { Link, usePage } from "@inertiajs/react";

export default function Index() {
    const { products, filters } = usePage().props;

    return (
        <AdminLayout>
            <Link href={route("admin.product.create")} className="btn-primary">
                Add new Product
            </Link>
            <h2 className="h2-center">Product List</h2>
            <ul className="w-full">
                <li>
                    <FilterProduct
                        filters={filters}
                        pageRoute={"admin.product.index"}
                    />
                </li>
                <li className="grid grid-cols-7 gap-4 mb-2 text-center font-medium text-lg">
                    <div>Id</div>
                    <div className="col-span-2">Photo</div>
                    <div className="col-span-2">Name</div>
                    <div>Category</div>
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
                        <div className="col-span-2">{product.name}</div>
                        <div className="col-span-1">
                            {product.category?.name}
                        </div>
                        <div className="col-span-1">
                            <Link
                                href={route("admin.product.edit", product.id)}
                                type="button"
                                className="btn-admin"
                            >
                                Edit
                            </Link>
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
