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
                <li className="grid grid-cols-9 gap-4 mb-2 text-center font-medium text-lg">
                    <div>Id</div>
                    <div className="col-span-2">Photo</div>
                    <div className="col-span-2">Name</div>
                    <div>Category</div>
                    <div className="col-span-2">Price</div>
                    <div></div>
                </li>
                {products.data.map((product) => (
                    <li
                        key={product.id}
                        className="grid grid-cols-9 gap-2 mt-1 text-center"
                    >
                        <div>{product.id}</div>
                        <div className="col-span-2">photo</div>
                        <div className="col-span-2">{product.name}</div>
                        <div className="col-span-1">
                            {product.category?.name}
                        </div>
                        <div className="col-span-2">{product.price}</div>
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
