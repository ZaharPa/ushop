import Slider from "@/Components/Slider";
import { usePage } from "@inertiajs/react";

export default function Index() {
    const { slides } = usePage().props;
    return (
        <div>
            <div>
                <Slider slides={slides} />
            </div>

            <div>Popular products by month</div>

            <div>Buttons to see products by category</div>

            <div>Some products</div>

            <div>Buttons to see products by brand</div>

            <div>Latest comments</div>
        </div>
    );
}
