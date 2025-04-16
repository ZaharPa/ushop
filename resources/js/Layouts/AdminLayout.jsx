import AdminLinks from "@/Components/AdminLinks";

export default function AdminLayout({ children }) {
    return (
        <div className="flex">
            <aside className="w-64 bg-sky-900 text-emerald-300 h-screen fixed p-4 flex flex-col text-center gap-4">
                <AdminLinks label="Dashboard" routeName="admin.dashboard" />
                <AdminLinks label="Layouts" routeName="main" />
                <AdminLinks label="Products" routeName="admin.product.index" />
                <AdminLinks
                    label="Categories"
                    routeName="admin.categories.index"
                />
                <AdminLinks label="Users" routeName="admin.user.index" />
                <AdminLinks label="Orders" routeName="main" />
                <AdminLinks label="Discount" routeName="main" />
                <AdminLinks label="Settings" routeName="main" />
            </aside>
            <main className="ml-64 p-6 bg-gray-100 min-h-screen w-full">
                {children}
            </main>
        </div>
    );
}
