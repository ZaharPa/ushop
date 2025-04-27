import AdminLayout from "@/Layouts/AdminLayout";
import { useForm, usePage } from "@inertiajs/react";
import Form from "./Form";

export default function Create() {
    const { categories } = usePage().props;
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        description: "",
        category_id: "",
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
