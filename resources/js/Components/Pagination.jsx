import { Link } from "@inertiajs/react";

export default function Pagination({ links }) {
    if (!links || links.length <= 3) return null;

    const renderLinks = () => {
        const visableLinks = [];
        const first = links[0];
        const last = links[links.length - 1];
        const current = links.find((link) => link.active);
        const currentIndex = links.indexOf(current);

        if (first.url) {
            visableLinks.push(first);
        }

        for (let i = 1; i < links.length - 1; i++) {
            const page = links[i];
            const label = page.label;

            const isNearCurrent =
                Math.abs(i - currentIndex) <= 1 ||
                i === 1 ||
                i === links.length - 2;

            if (isNearCurrent) {
                visableLinks.push(page);
            } else if (visableLinks[visableLinks.length - 1].label !== "...") {
                visableLinks.push({ label: "...", url: null });
            }
        }

        if (last.url) {
            visableLinks.push(last);
        }

        return visableLinks.map((link, i) =>
            link.url ? (
                <Link
                    key={i}
                    href={link.url}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                    className={`px-4 py-2 rounded text-gray-50
                            hover:bg-sky-500 transition duration-200 ${
                                link.active ? "bg-sky-600" : "bg-sky-800 "
                            }`}
                />
            ) : (
                <span
                    key={i}
                    className="px-4 py-2 rounded bg-gray-300 text-gray-700"
                >
                    ...
                </span>
            )
        );
    };

    return <div className="flex flex-wrap gap-2 mt-4">{renderLinks()}</div>;
}
