import AdminLayout from "@/Layouts/AdminLayout";
import { useForm, usePage } from "@inertiajs/react";
import Form from "./Form";
import { useState } from "react";

export default function Create() {
    const { products, attributes, errors } = usePage().props;

    const [newPhotos, setNewPhotos] = useState([]);

    const { data, setData, post, processing, reset } = useForm({
        product_id: "",
        price: "",
        quantity: "",
        attribute_values: [],
        photos: [],
    });

    const handleSubmit = () => {
        post(route("admin.item.store"), {
            forceFormData: true,
            onSuccess: () => {
                setNewPhotos([]);
                reset();
            },
        });
    };

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
                newPhotos={newPhotos}
                setNewPhotos={setNewPhotos}
            />
        </AdminLayout>
    );
}
