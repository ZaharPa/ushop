import { Link, usePage } from "@inertiajs/react";

export default function AdminLinks({ label, routeName }) {
    const { url } = usePage();
    const getCurrentUrl = (routeName) => {
        return route(routeName).replace(window.location.origin, "");
    };
    return (
        <Link
            href={route(routeName)}
            className={`transition-colors duration-150 hover:underline hover:text-sky-100 ${
                url === getCurrentUrl(routeName)
                    ? "font-semibold text-white text-lg"
                    : ""
            }`}
        >
            {label}
        </Link>
    );
}
