export default function DiscountList({ discounts, onEdit }) {
    return (
        <ul>
            <li className="grid grid-cols-7 gap-4 mb-2 text-center font-medium text-lg">
                <div>Id</div>
                <div className="col-span-2">Item</div>
                <div>Percent</div>
                <div>Start</div>
                <div>End</div>
                <div></div>
            </li>
            {discounts.data.map((discount) => (
                <li
                    key={discount.id}
                    className="grid grid-cols-7 gap-4 mb-2 text-center"
                >
                    <div>{discount.id}</div>
                    <div className="col-span-2">
                        {discount.item.product.name} - {discount.item.id}
                    </div>
                    <div>{discount.percentage}</div>
                    <div>{discount.start_date}</div>
                    <div>{discount.end_date}</div>
                    <div>
                        <button
                            onClick={() => onEdit(discount)}
                            className="btn-primary"
                        >
                            Edit
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
}
