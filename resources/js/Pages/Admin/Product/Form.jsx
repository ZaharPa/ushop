import ConfrimModal from "@/Components/ConfrimModal";
import { useEffect, useState } from "react";

export default function Form({
    handleSubmit,
    data,
    setData,
    errors,
    processing,
    reset,
    categories,
    handleDelete = false,
    photo_url = "",
}) {
    const [features, setFeatures] = useState([]);
    const [showConfirm, setShowConfirm] = useState(false);

    useEffect(() => {
        if (data.category_id) {
            fetch(route("admin.category.features", data.category_id), {
                credentials: "same-origin",
            })
                .then((res) => res.json())
                .then((data) => setFeatures(data))
                .catch((error) => {
                    console.log("Error fetching error: ", error);
                    setFeatures([]);
                });
        } else {
            setFeatures([]);
        }
    }, [data.category_id]);

    const handleFeatureToggle = (featureId) => {
        setData((prevData) => {
            const newFeatures = prevData.features.includes(featureId)
                ? prevData.features.filter((id) => id !== featureId)
                : [...prevData.features, featureId];
            return { ...prevData, features: newFeatures };
        });
    };

    const handleFeatureValueChange = (featureId, value) => {
        setData((prevData) => ({
            ...prevData,
            feature_values: {
                ...prevData.feature_values,
                [featureId]: value,
            },
        }));
    };

    return (
        <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
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
                <div className="text-red-500 my-1">{errors.description}</div>
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
                <div className="text-red-500 my-1">{errors.category_id}</div>
            )}

            <div className="col-span-1">
                <input
                    type="file"
                    onChange={(e) => setData("photo", e.target.files[0])}
                    className="input-admin"
                />
            </div>

            {errors.photo && (
                <div className="text-red-500 my-1">{errors.photo}</div>
            )}

            {photo_url && (
                <div className="col-span-2 flex justify-center h-60">
                    <img src={photo_url} />
                </div>
            )}

            <div className="col-span-2">
                <label className="text-lg">Features</label>
                <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-x-5 gap-y-2 mt-1">
                    {features.map((feature) => (
                        <div
                            key={feature.id}
                            className="flex flex-col items-start text-center shadow-sm cursor-pointer select-none"
                        >
                            <input
                                type="checkbox"
                                id={`feature-${feature.id}`}
                                checked={data.features.includes(feature.id)}
                                onChange={() => handleFeatureToggle(feature.id)}
                                className="hidden peer"
                            />
                            <label
                                htmlFor={`feature-${feature.id}`}
                                className="w-full px-2 py-1 border border-gray-400 rounded-md peer-checked:text-white peer-checked:bg-blue-600 transition-colors"
                            >
                                {feature.name}
                            </label>

                            {data.features.includes(feature.id) && (
                                <input
                                    type="text"
                                    value={
                                        data.feature_values[feature.id] || ""
                                    }
                                    onChange={(e) =>
                                        handleFeatureValueChange(
                                            feature.id,
                                            e.target.value
                                        )
                                    }
                                    placeholder={`Enter value`}
                                    className="mt-2 pl-1 border border-sky-700 rounded-lg w-full"
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>

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
                message="Are you sure want to delete this product?"
            />
        </form>
    );
}
