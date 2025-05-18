import AdminLayout from "@/Layouts/AdminLayout";
import { useForm, usePage } from "@inertiajs/react";
import Form from "./Form";

export default function Create() {
    const { products, attributes, errors } = usePage().props;

    const { data, setData, processing, reset } = useForm({
        product_id: "",
        price: "",
        quantity: "",
        attribute_values: [],
        photos: [],
    });

    const handleSubmit = () => {};
    return (
        <AdminLayout>
            <h2 className="h2-center">New Item</h2>
            <Form
                handleSubmit={handleSubmit}
                data={data}
                setData={setData}
                errors={errors}
                processing={processing}
                reset={reset}
                products={products}
                attributes={attributes}
            />
        </AdminLayout>
    );
}
