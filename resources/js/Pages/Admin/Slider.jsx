import Pagination from "@/Components/Pagination";
import AdminLayout from "@/Layouts/AdminLayout";
import { useForm, usePage } from "@inertiajs/react";
import { useState } from "react";

export default function Slider() {
    const { slides, errors } = usePage().props;

    const [showForm, setShowForm] = useState(false);
    const [chosenSlide, setChosenSlide] = useState(null);

    const {
        data,
        setData,
        post,
        put,
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
        </AdminLayout>
    );
}
