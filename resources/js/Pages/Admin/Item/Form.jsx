import ConfrimModal from "@/Components/ConfrimModal";
import { useState } from "react";

export default function Form({
    handleSubmit,
    data,
    setData,
    errors,
    processing,
    reset,
    products,
    attributes,
    handleDelete = false,
}) {
    const [showConfirm, setShowConfirm] = useState(false);
    const [previewPhotos, setPreviewPhotos] = useState([]);

    const handleAttributeToggle = (attributeId) => {
        setData((prevData) => {
            const newAttribute = prevData.attribute_values.includes(attributeId)
                ? prevData.attribute_values.filter((id) => id !== attributeId)
                : [...prevData.attribute_values, attributeId];
            return { ...prevData, attribute_values: newAttribute };
        });
    };

    const handlePhotoChange = (e) => {
        const files = Array.from(e.target.files);
        setData("photos", files);

        const previews = files.map((file) => URL.createObjectURL(file));
        setPreviewPhotos(previews);
    };
    return (
        <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="grid grid-cols-2 gap-5 items-center"
        >
            <div className="col-span-2">
                <select
                    value={data.product_id}
                    onChange={(e) => setData("product_id", e.target.value)}
                    className="input-admin"
                >
                    <option value={""}>Product</option>
                    {products.map((product) => (
                        <option key={product.id} value={product.id}>
                            {product.name}
                        </option>
                    ))}
                </select>
            </div>

            {errors.product_id && (
                <div className="text-red-500 my-1">{errors.product_id}</div>
            )}

            <div className="col-span-1">
                <div>Price</div>
                <input
                    type="number"
                    placeholder="Price"
                    value={data.price}
                    onChange={(e) => setData("price", e.target.value)}
                    className="input-admin"
                />
            </div>

            {errors.price && (
                <div className="text-red-500 my-1">{errors.price}</div>
            )}

            <div className="col-span-1">
                <div>Quantity</div>
                <input
                    type="number"
                    placeholder="Quantity"
                    value={data.quantity}
                    onChange={(e) => setData("quantity", e.target.value)}
                    className="input-admin"
                />
            </div>

            {errors.quantity && (
                <div className="text-red-500 my-1">{errors.quantity}</div>
            )}

            <div className="col-span-2">
                <label className="text-lg">Attributes</label>
                <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-x-5 gap-y-2 mt-1">
                    {attributes.map((attribute) => (
                        <div
                            key={attribute.id}
                            className="flex flex-col items-start text-center shadow-sm cursor-pointer select-none"
                        >
                            <label>{attribute.name}</label>
                            <div className="flex gap-2 my-1">
                                {attribute.values.map((value) => (
                                    <div key={value.id}>
                                        <input
                                            type="checkbox"
                                            id={`attribute-${value.id}`}
                                            checked={data.attribute_values.includes(
                                                value.id
                                            )}
                                            onChange={() =>
                                                handleAttributeToggle(value.id)
                                            }
                                            className="hidden peer"
                                        />
                                        <label
                                            htmlFor={`attribute-${value.id}`}
                                            className="w-full px-2 py-1 border border-gray-400 rounded-md peer-checked:text-white peer-checked:bg-blue-600 transition-colors cursor-pointer"
                                        >
                                            {value.value}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {errors.attribute_values && (
                <div className="text-red-500 my-1">
                    {errors.attribute_values}
                </div>
            )}

            <div className="col-span-2">
                <div>Photos</div>
                <input type="file" multiple onChange={handlePhotoChange} />

                <div className="mt-2 flex flex-wrap gap-2">
                    {previewPhotos.map((src, index) => (
                        <img
                            key={index}
                            src={src}
                            alt={`preview-${index}`}
                            className="w-20 h-20 object-cover rounded"
                        />
                    ))}
                </div>
            </div>

            {errors.photos && (
                <div className="text-red-500 my-1">{errors.photos}</div>
            )}

            <div className="flex gap-4 justify-center col-span-2">
                <button
                    type="submit"
                    disabled={processing}
                    className="btn-primary"
                >
                    {processing ? "Sending..." : "Send"}
                </button>
                <button
                    onClick={() => reset()}
                    type="reset"
                    disabled={processing}
                    className="btn-reset"
                >
                    Reset
                </button>

                {handleDelete && (
                    <button
                        onClick={() => {
                            setShowConfirm(true);
                        }}
                        type="button"
                        className="btn-delete"
                    >
                        Delete
                    </button>
                )}
            </div>

            <ConfrimModal
                show={showConfirm}
                onConfrim={handleDelete}
                onCancel={() => {
                    setShowConfirm(false);
                }}
                message="Are you sure want to delete this item?"
            />
        </form>
    );
}
