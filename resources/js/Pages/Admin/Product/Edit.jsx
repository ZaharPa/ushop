import AdminLayout from "@/Layouts/AdminLayout";
import Form from "./Form";
import { useForm, usePage } from "@inertiajs/react";

export default function Edit() {
    const { product, categories } = usePage().props;
    const { data, setData, processing, errors, reset } = useForm({
        name: product.name,
        description: product.description,
        category_id: product.category_id,
        price: product.price,
    });

    const handleSubmit = () => {};

    return (
        <AdminLayout>
            <h2 className="h2-center">Edit Category</h2>
            <Form
                handleSubmit={handleSubmit}
                data={data}
                setData={setData}
                processing={processing}
                reset={reset}
                errors={errors}
                categories={categories}
                isDelete={true}
            />
        </AdminLayout>
    );
}
