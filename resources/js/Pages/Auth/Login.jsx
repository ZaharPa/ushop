import { Link, useForm } from "@inertiajs/react";

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("login.store"));
    };

    return (
        <div className="w-3/4 lg:w-1/2 mx-auto mt-10 p-4 bg-sky-100 shadow-lg rounded-lg text-lg">
            <h1 className="text-2xl text-center p-2 mb-6">Login</h1>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col space-y-4 text-emerald-900"
            >
                <div className="flex gap-4 items-center">
                    <span className="w-20">Email</span>
                    <input
                        type="email"
                        name="email"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        required
                        className="flex-1 px-2 border border-emerald-900 rounded-lg bg-white"
                    />
                </div>

                <div className="flex gap-4 items-center">
                    <span className="w-20">Password</span>
                    <input
                        type="password"
                        name="password"
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                        required
                        className="flex-1 px-2 border border-emerald-900 rounded-lg bg-white"
                    />
                </div>

                <div>
                    <span className="mt-2 ">Remember me</span>
                    <input
                        type="checkbox"
                        name="remember"
                        checked={data.remember}
                        onChange={(e) => setData("remember", e.target.checked)}
                        className="w-10 h-4"
                    />
                </div>

                <div className="text-center">
                    {errors.email && (
                        <span className="text-red-500">{errors.email}</span>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    className="border border-gray-400 rounded-lg bg-emerald-300 text-emerald-800 font-semibold w-fit self-center px-3 py-1 cursor-pointer hover:bg-sky-50 hover:text-emerald-600
                    disabled:cursor-not-allowed disabled:bg-emerald-600 disabled:text-emerald-100"
                >
                    {processing ? "Logging in..." : "Sign in"}
                </button>
                <div className="text-center mt-2">
                    Don't have an account? Click
                    <Link
                        href={route("register.create")}
                        className="text-sky-700 underline px-1 hover:text-sky-500"
                    >
                        here
                    </Link>
                    to register
                </div>
            </form>
        </div>
    );
}
