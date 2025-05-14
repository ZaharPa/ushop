import AdminLayout from "@/Layouts/AdminLayout";
import Form from "./Form";
import { router, useForm, usePage } from "@inertiajs/react";

export default function Edit() {
    const { product, categories, errors } = usePage().props;
    const {
        data,
        setData,
        delete: deleteProduct,
        processing,
        reset,
    } = useForm({
        name: product.name,
        description: product.description,
        category_id: product.category_id,
        features: product.features?.map((f) => f.id) || [],
        feature_values:
            product.features?.reduce((acc, f) => {
                acc[f.id] = f.pivot?.value || "";
                return acc;
            }, {}) || {},
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("category_id", data.category_id);
        formData.append("features", JSON.stringify(data.features));
        formData.append("feature_values", JSON.stringify(data.feature_values));

        if (data.photo) {
            formData.append("photo", data.photo);
        }

        formData.append("_method", "put");

        router.post(route("admin.product.update", product.id), formData, {
            forceFormData: true,
            onSuccess: () => reset(),
        });
    };

    const handleDelete = () => {
        deleteProduct(route("admin.product.destroy", product.id), {
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <AdminLayout>
            <h2 className="h2-center">Edit Product</h2>
            <Form
                handleSubmit={(e) => handleSubmit(e)}
                data={data}
                setData={setData}
                processing={processing}
                reset={reset}
                errors={errors}
                categories={categories}
                handleDelete={(e) => handleDelete()}
                photo_url={product.photo_url}
            />
        </AdminLayout>
    );
}
