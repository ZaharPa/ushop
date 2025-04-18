import Pagination from "@/Components/Pagination";
import AdminLayout from "@/Layouts/AdminLayout";
import { router, useForm, usePage } from "@inertiajs/react";

export default function Index() {
    const { products, categories, filters } = usePage().props;

    const { data, setData, get, processing, reset } = useForm({
        name: filters.name || "",
        priceFrom: filters.priceFrom || "",
        priceTo: filters.priceTo || "",
        category: filters.category || "",
    });

    const handleFilter = (e) => {
        e.preventDefault();
        get(route("admin.product.index"), {
            onSuccess: () => {
                reset();
            },
        });
    };

    const handleReset = () => {
        setData({
            name: "",
            priceFrom: "",
            priceTo: "",
            category: "",
        });

        reset();

        router.visit(route("admin.product.index"), {
            replace: true,
            preserveState: false,
        });
    };

    return (
        <AdminLayout>
            <h2 className="h2-center">Product List</h2>
            <ul className="w-full">
                <li>
                    <form
                        onSubmit={handleFilter}
                        className="flex flex-wrap w-full justify-center gap-2 mb-3"
                    >
                        <input
                            type="text"
                            placeholder="Name product"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="input-admin w-full"
                        />
                        <select
                            className="input-admin"
                            defaultValue={data.category}
                            onChange={(e) =>
                                setData("category", e.target.value)
                            }
                        >
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
                            value={data.priceFrom}
                            onChange={(e) =>
                                setData("priceFrom", e.target.value)
                            }
                            className="input-admin"
                        />
                        <input
                            type="text"
                            placeholder="Price To"
                            value={data.priceTo}
                            onChange={(e) => setData("priceTo", e.target.value)}
                            className="input-admin"
                        />
                        <div className="flex gap-3">
                            <button
                                type="submit"
                                disabled={processing}
                                className="btn-admin"
                            >
                                {processing ? "Applying..." : "Filter"}
                            </button>
                            <button
                                type="reset"
                                onClick={handleReset}
                                className="btn-reset"
                            >
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
