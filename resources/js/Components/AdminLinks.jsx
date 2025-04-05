import { Link, usePage } from "@inertiajs/react";

export default function AdminLinks({ label, routeName }) {
    const { url } = usePage();
    const getCurrentUrl = (routeName) => {
        return route(routeName).replace(window.location.origin, "");
    };
    return (
        <Link
            href={route(routeName)}
            className={`hover:underline hover:text-emerald-100 ${
                url === getCurrentUrl(routeName)
                    ? "font-medium text-emerald-100 text-lg"
                    : ""
            }`}
        >
            {label}
        </Link>
    );
}
