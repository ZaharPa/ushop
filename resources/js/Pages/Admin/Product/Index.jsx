import Pagination from "@/Components/Pagination";
import AdminLayout from "@/Layouts/AdminLayout";
import { usePage } from "@inertiajs/react";

export default function Index() {
    const { products, categories, filters } = usePage().props;

    return (
        <AdminLayout>
            <h2 className="h2-center">Product List</h2>
            <ul className="w-full">
                <li>
                    <form className="flex flex-wrap w-full justify-center gap-2 mb-3">
                        <input
                            type="text"
                            placeholder="Name product"
                            className="input-admin w-full"
                        />
                        <select className="input-admin">
                            <option value={""}>Category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        <input
                            type="text"
                            placeholder="Price From"
                            className="input-admin"
                        />
                        <input
                            type="text"
                            placeholder="Price To"
                            className="input-admin"
                        />
                        <div className="flex gap-3">
                            <button type="submit" className="btn-admin">
                                Filter
                            </button>
                            <button type="reset" className="btn-reset">
                                Reset
                            </button>
                        </div>
                    </form>
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
                    <li className="grid grid-cols-9 gap-2 mt-1 text-center">
                        <div>{product.id}</div>
                        <div className="col-span-2">photo</div>
                        <div className="col-span-2">{product.name}</div>
                        <div className="col-span-1">
                            {product.category?.name}
                        </div>
                        <div className="col-span-2">{product.price}</div>
                        <div className="col-span-1">
                            <button type="button" className="btn-admin">
                                Edit
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
