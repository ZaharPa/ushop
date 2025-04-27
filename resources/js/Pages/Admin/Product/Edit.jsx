import AdminLayout from "@/Layouts/AdminLayout";
import Form from "./Form";
import { router, useForm, usePage } from "@inertiajs/react";

export default function Edit() {
    const { product, categories } = usePage().props;
    const {
        data,
        setData,
        delete: deleteProduct,
        processing,
        errors,
        reset,
    } = useForm({
        name: product.name,
        description: product.description,
        category_id: product.category_id,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("category_id", data.category_id);
        formData.append("_method", "put");

        router.post(route("admin.product.update", product.id), formData, {
            forceFormData: true,
        });
    };

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this category?")) {
            deleteProduct(route("admin.product.destroy", product.id), {
                onSuccess: () => {
                    reset();
                },
            });
        }
    };

    return (
        <AdminLayout>
            <h2 className="h2-center">Edit Category</h2>
            <Form
                handleSubmit={(e) => handleSubmit(e)}
                data={data}
                setData={setData}
                processing={processing}
                reset={reset}
                errors={errors}
                categories={categories}
                handleDelete={(e) => handleDelete()}
            />
        </AdminLayout>
    );
}
