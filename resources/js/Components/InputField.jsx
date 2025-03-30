export default function InputField({
    label,
    type = "text",
    name,
    value,
    onChange,
    required = true,
}) {
    return (
        <div className="flex gap-4 items-center">
            <span className="w-27">{label}</span>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                required={required}
                className="flex-1 px-2 border border-emerald-900 rounded-lg bg-white"
            />
        </div>
    );
}
