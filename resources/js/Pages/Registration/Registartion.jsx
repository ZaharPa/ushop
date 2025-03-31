import { Link, useForm } from "@inertiajs/react";
import InputField from "../../Components/InputField";

export default function Registration() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("register.store"));
    };

    return (
        <div className="form-block">
            <h1 className="text-2xl text-center p-2 mb-6">Registration</h1>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col space-y-4 text-emerald-900"
            >
                <InputField
                    label="Name"
                    name="name"
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                />
                <div className="text-center">
                    {errors.name && (
                        <span className="text-red-500">{errors.name}</span>
                    )}
                </div>

                <InputField
                    label="Email"
                    type="email"
                    name="email"
                    value={data.email}
                    onChange={(e) => setData("email", e.target.value)}
                />
                <div className="text-center">
                    {errors.email && (
                        <span className="text-red-500">{errors.email}</span>
                    )}
                </div>

                <InputField
                    label="Password"
                    type="password"
                    name="password"
                    value={data.password}
                    onChange={(e) => setData("password", e.target.value)}
                />
                <div className="text-center">
                    {errors.password && (
                        <span className="text-red-500">{errors.password}</span>
                    )}
                </div>

                <InputField
                    label="Confrim-Pass"
                    type="password"
                    name="password_confirmation"
                    value={data.password_confirmation}
                    onChange={(e) =>
                        setData("password_confirmation", e.target.value)
                    }
                />

                <button
                    type="submit"
                    disabled={processing}
                    className="btn-primary mt-4"
                >
                    {processing ? "Processing..." : "Sign up"}
                </button>

                <div className="text-center mt-2">
                    Do you have an account? Click{" "}
                    <Link href={route("login")} className="emphasis-text">
                        here
                    </Link>{" "}
                    to sign in
                </div>
            </form>
        </div>
    );
}
