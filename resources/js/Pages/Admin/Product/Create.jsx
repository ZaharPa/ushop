import AdminLayout from "@/Layouts/AdminLayout";
import { useForm, usePage } from "@inertiajs/react";
import Form from "./Form";

export default function Create() {
    const { categories, errors } = usePage().props;
    const { data, setData, post, processing, reset } = useForm({
        name: "",
        description: "",
        category_id: "",
        photo: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("admin.product.store"), {
            forceFormData: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <AdminLayout>
            <h2 className="h2-center">New Product</h2>
            <Form
                handleSubmit={handleSubmit}
                data={data}
                setData={setData}
                errors={errors}
                processing={processing}
                reset={reset}
                categories={categories}
            />
        </AdminLayout>
    );
}
