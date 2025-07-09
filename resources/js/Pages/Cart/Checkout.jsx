import { usePage } from "@inertiajs/react";

export default function Checkout() {
    const { items } = usePage().props;

    return (
        <div>
            <div>
                {items.map((item) => (
                    <div key={item.id} className="text-sm px-2">
                        <div>
                            {item.product.name} - ${item.price}
                        </div>
                        <div>{item.quantity}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
