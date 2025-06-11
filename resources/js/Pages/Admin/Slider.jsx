import ConfrimModal from "@/Components/ConfrimModal";
import Pagination from "@/Components/Pagination";
import AdminLayout from "@/Layouts/AdminLayout";
import { router, useForm, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function Slider() {
    const { slides, errors } = usePage().props;

    const [showForm, setShowForm] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [chosenSlide, setChosenSlide] = useState(null);

    const {
        data,
        setData,
        post,
        delete: destroy,
        processing,
        reset,
    } = useForm({
        title: "",
        description: "",
        image: "",
        link: "",
        position: "",
        active: false,
    });

    const handleNewSlide = () => {
        setChosenSlide(null);
        setShowForm(true);
        reset();
    };

    const handleChange = (slide) => {
        setChosenSlide(slide);
        setData({
            title: slide.title,
            description: slide.description,
            image: slide.image_url,
            link: slide.link,
            position: slide.position,
            active: slide.active,
        });
        setShowForm(true);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (chosenSlide) {
            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("description", data.description);

            if (data.image) {
                formData.append("image", data.image);
            }

            formData.append("link", data.link);
            formData.append("position", data.position);
            formData.append("active", data.active);

            router.put(route("admin.slider.update", chosenSlide.id), formData, {
                forceFormData: true,
                onSuccess: () => {
                    setShowForm(false);
                    setChosenSlide(null);
                    reset();
                },
            });
        } else {
            post(route("admin.slider.store"), {
                forceFormData: true,
                onSuccess: () => {
                    setShowForm(false);
                    reset();
                },
            });
        }
    };

    const handleDelete = (slide) => {
        setChosenSlide(slide);
        setShowConfirm(true);
    };

    const confirmDelete = () => {
        destroy(route("admin.slider.destroy", chosenSlide.id), {
            onSuccess: () => {
                setShowConfirm(false);
                setChosenSlide(null);
                reset();
            },
        });
    };

    return (
        <AdminLayout>
            <button onClick={handleNewSlide} className="btn-primary">
                Add new Slide
            </button>
            <h2 className="h2-center">Slides List</h2>

            <ul className="w-full">
                <li className="grid grid-cols-9 gap-4 mb-2 text-center font-medium text-lg">
                    <div>Id</div>
                    <div>Title</div>
                    <div>Description</div>
                    <div>Image</div>
                    <div className="col-span-2">Link</div>
                    <div>Position</div>
                    <div>Active</div>
                    <div></div>
                </li>
                {slides.data.map((slide) => (
                    <li
                        key={slide.id}
                        className="grid grid-cols-9 gap-4 mb-2 text-center"
                    >
                        <div>{slide.id}</div>
                        <div>{slide.title}</div>
                        <div>{slide.description}</div>
                        <div className="flex justify-center">
                            <img
                                src={slide.image_url}
                                alt="Image"
                                className="h-24"
                            />
                        </div>
                        <div className="col-span-2">{slide.link}</div>
                        <div>{slide.position}</div>
                        <div>
                            <input
                                type="checkbox"
                                checked={slide.active}
                                disabled
                            />
                        </div>
                        <div>
                            <button
                                onClick={() => handleChange(slide)}
                                className="btn-admin py-0"
                            >
                                Edit
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            <div className="flex justify-center">
                <Pagination links={slides.links} />
            </div>

            {showForm && (
                <div className="dotted-form">
                    <form
                        onSubmit={handleSubmit}
                        encType="multipart/form-data"
                        className="text-center"
                    >
                        <h2 className="h2-center">
                            {chosenSlide ? "Edit Slide" : "Add new Slide"}
                        </h2>

                        {chosenSlide && <div>Slide ID - {chosenSlide.id}</div>}

                        <div className="my-3">
                            <span>Title - </span>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) =>
                                    setData("title", e.target.value)
                                }
                                className="input-admin"
                            />
                        </div>
                        {errors.title && (
                            <div className="text-red-500 my-1">
                                {errors.title}
                            </div>
                        )}

                        <div>
                            <span>Description - </span>
                            <textarea
                                value={data.description}
                                size={data.description.length}
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                                className="input-admin"
                            ></textarea>
                        </div>
                        {errors.description && (
                            <div className="text-red-500 my-1">
                                {errors.description}
                            </div>
                        )}

                        <div className="my-3">
                            <span>Photo - </span>
                            <input
                                type="file"
                                onChange={(e) =>
                                    setData("image", e.target.files[0])
                                }
                                className="input-admin"
                            />
                        </div>
                        {errors.image && (
                            <div className="text-red-500 my-1">
                                {errors.image}
                            </div>
                        )}

                        <div>
                            <span>Link - </span>
                            <input
                                type="text"
                                value={data.link}
                                size={data.link.length}
                                onChange={(e) =>
                                    setData("link", e.target.value)
                                }
                                className="input-admin"
                            />
                        </div>
                        {errors.link && (
                            <div className="text-red-500 my-1">
                                {errors.link}
                            </div>
                        )}

                        <div className="my-3">
                            <span>Position - </span>
                            <input
                                type="number"
                                value={data.position}
                                onChange={(e) =>
                                    setData("position", e.target.value)
                                }
                                className="input-admin"
                            />
                        </div>
                        {errors.position && (
                            <div className="text-red-500 my-1">
                                {errors.position}
                            </div>
                        )}

                        <div>
                            <span>Active - </span>
                            <input
                                type="checkbox"
                                value={data.active}
                                checked={data.active}
                                onChange={(e) =>
                                    setData("active", e.target.checked)
                                }
                            />
                        </div>
                        {errors.active && (
                            <div className="text-red-500 my-1">
                                {errors.active}
                            </div>
                        )}

                        <div className="flex justify-center gap-4 mt-4">
                            <button
                                type="submit"
                                disabled={processing}
                                className="btn-primary"
                            >
                                {chosenSlide ? "Update" : "Create"}
                            </button>
                            {chosenSlide && (
                                <button
                                    type="button"
                                    onClick={() => handleDelete(chosenSlide)}
                                    className="btn-delete"
                                >
                                    Delete
                                </button>
                            )}
                            <button
                                type="button"
                                onClick={() => {
                                    setChosenSlide(null);
                                    setShowForm(false);
                                    reset();
                                }}
                                className="btn-reset"
                            >
                                Reset
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <ConfrimModal
                show={showConfirm}
                onConfrim={confirmDelete}
                onCancel={() => {
                    setShowConfirm(false);
                }}
                message="Are you sure want to delete this slide?"
            />
        </AdminLayout>
    );
}
