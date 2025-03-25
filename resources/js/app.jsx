import { createInertiaApp } from "@inertiajs/react";
import { createRoot } from "react-dom/client";
import { route } from "ziggy-js";
import MainLayout from "./Layouts/MainLayout";

window.route = route;

createInertiaApp({
    resolve: (name) => {
        const pages = import.meta.glob("./Pages/**/*.jsx", { eager: true });
        const page = pages[`./Pages/${name}.jsx`].default;

        page.layout ??= (page) => <MainLayout>{page}</MainLayout>;

        return page;
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
});
