import AdminLayout from "@/Layouts/AdminLayout";
import { useForm, usePage } from "@inertiajs/react";

export default function Create() {
    const { categories } = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        description: "",
        category_id: "",
        price: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.product.store"), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AdminLayout>
            <h2 className="h2-center">New Product</h2>
            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-2 gap-5 items-center"
            >
                <div className="flex flex-col col-span-2">
                    <span>Name</span>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        className="input-admin"
                    />
                </div>

                {errors.name && (
                    <div className="text-red-500 my-1">{errors.name}</div>
                )}

                <div className="flex flex-col col-span-2">
                    <span>Description</span>
                    <textarea
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                        className="input-admin"
                    ></textarea>
                </div>

                {errors.description && (
                    <div className="text-red-500 my-1">
                        {errors.description}
                    </div>
                )}

                <div className="col-span-1">
                    <input
                        type="text"
                        value={data.price}
                        onChange={(e) => setData("price", e.target.value)}
                        placeholder="Price"
                        className="input-admin"
                    />
                </div>

                {errors.price && (
                    <div className="text-red-500 my-1">{errors.price}</div>
                )}

                <div className="col-span-1">
                    <select
                        value={data.category_id}
                        onChange={(e) => setData("category_id", e.target.value)}
                        className="input-admin"
                    >
                        <option value={""}>Category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                {errors.category_id && (
                    <div className="text-red-500 my-1">
                        {errors.category_id}
                    </div>
                )}

                <div className="flex gap-4 justify-center col-span-2">
                    <button
                        type="submit"
                        disabled={processing}
                        className="btn-primary"
                    >
                        {processing ? "Creating..." : "Send"}
                    </button>
                    <button
                        onClick={() => reset()}
                        type="reset"
                        className="btn-reset"
                    >
                        Reset
                    </button>
                </div>
            </form>
        </AdminLayout>
    );
}
