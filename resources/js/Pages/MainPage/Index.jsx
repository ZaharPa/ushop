import CategorySlider from "@/Components/CategorySlider";
import Slider from "@/Components/Slider";
import { usePage } from "@inertiajs/react";

export default function Index() {
    const { slides, categories } = usePage().props;
    return (
        <div>
            <Slider slides={slides} />

            <div>Popular products by month</div>

            <CategorySlider categories={categories} />

            <div>Some products</div>

            <div>Buttons to see products by brand</div>

            <div>Latest comments</div>
        </div>
    );
}
