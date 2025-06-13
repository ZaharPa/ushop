import { Link } from "@inertiajs/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

export default function Slider({ slides }) {
    const [current, setCurrent] = useState(0);
    const length = slides.length;

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % length);
        }, 5000);
        return () => clearInterval(interval);
    }, [length]);

    const prevSlide = () => setCurrent((current - 1 + length) % length);
    const nextSlide = () => setCurrent((current + 1) % length);
    return (
        <div className="relative w-full max-w-screen-xl mx-auto h-[400px] overflow-hidden">
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                        index === current ? "opacity-100 z-10" : "opacity-0 z-0"
                    }`}
                >
                    <img
                        src={slide.image_url}
                        className="w-full h-full object-cover"
                    />

                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-1 pb-10">
                        <div className="max-w-4xl mx-auto text-center">
                            <h2 className="text-3xl font-bold">
                                {slide.title}
                            </h2>
                            <p className="mt-2 mb-3 max-w-2xl">
                                {slide.description}
                            </p>
                            {slide.link && (
                                <Link href={slide.link} className="btn-admin">
                                    Learn More
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            ))}

            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 z-20"
            >
                <ArrowLeft />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 z-20"
            >
                <ArrowRight />
            </button>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`w-3 h-3 rounded-full ${
                            index === current ? "bg-white" : "bg-white/50"
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}
