import AdminLayout from "@/Layouts/AdminLayout";
import { router, useForm, usePage } from "@inertiajs/react";
import { useState } from "react";
import Form from "./Form";

export default function Edit() {
    const { item, products, attributes, errors } = usePage().props;

    const [oldPhotos, setOldPhotos] = useState(item.photos || []);
    const [newPhotos, setNewPhotos] = useState([]);

    const {
        data,
        setData,
        delete: DeleteItem,
        processing,
        reset,
    } = useForm({
        product_id: item.product_id,
        price: item.price,
        quantity: item.quantity,
        attribute_values: item.attribute_values?.map((av) => av.id) || [],
    });
    console.log(oldPhotos);
    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("product_id", data.product_id);
        formData.append("price", data.price);
        formData.append("quantity", data.quantity);
        formData.append(
            "attribute_values",
            JSON.stringify(data.attribute_values)
        );

        oldPhotos.forEach((photo, i) => {
            formData.append(`old_photos[${i}]`, photo.id);
        });

        newPhotos.forEach((file, i) => {
            formData.append(`photos[${i}]`, file);
        });

        formData.append("_method", "put");

        router.post(route("admin.item.update", item.id), formData, {
            forceFormData: true,
            onSuccess: () => reset(),
        });
    };

    const handleDelete = () => {
        DeleteItem(route("admin.item.destroy", item.id), {
            onSuccess: () => {
                reset();
            },
        });
    };

    return (
        <AdminLayout>
            <h2 className="h2-center">Edit Item</h2>
            <Form
                handleSubmit={(e) => handleSubmit(e)}
                data={data}
                setData={setData}
                processing={processing}
                reset={reset}
                errors={errors}
                handleDelete={(e) => handleDelete()}
                products={products}
                attributes={attributes}
                oldPhotos={oldPhotos}
                setOldPhotos={setOldPhotos}
                newPhotos={newPhotos}
                setNewPhotos={setNewPhotos}
            />
        </AdminLayout>
    );
}
