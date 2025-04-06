import { Link } from "@inertiajs/react";

export default function Pagination({ links }) {
    return (
        <div className="flex flex-wrap gap-2 mt-4">
            {links.map((link, i) => (
                <Link
                    key={i}
                    href={link.url || ""}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                    className={`px-4 py-2 rounded text-gray-50
                        hover:bg-emerald-400 hover:text-gray-800 transition duration-200 ${
                            link.active ? "bg-emerald-500" : "bg-sky-700 "
                        }`}
                />
            ))}
        </div>
    );
}
