import { useForm } from "@inertiajs/react";

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors } = useForm({
        token,
        email: email || "",
        password: "",
        password_confirmation: "",
    });

    function submit(e) {
        e.preventDefault();
        post(route("password.update"));
    }

    return (
        <div className="form-block">
            <h2 className="h2-center">Reset Password</h2>

            <form onSubmit={submit} className="flex flex-col gap-3">
                <input
                    type="email"
                    value={data.email}
                    onChange={(e) => setData("email", e.target.value)}
                    className="input-admin"
                />

                <input
                    type="password"
                    placeholder="New Password"
                    value={data.password}
                    onChange={(e) => setData("password", e.target.value)}
                    className="input-admin"
                />

                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={data.password_confirmation}
                    onChange={(e) =>
                        setData("password_confirmation", e.target.value)
                    }
                    className="input-admin"
                />

                {errors.email && (
                    <div className="text-red-500">{errors.email}</div>
                )}
                {errors.password && (
                    <div className="text-red-500">{errors.password}</div>
                )}

                <button
                    type="submit"
                    disabled={processing}
                    className="btn-primary"
                >
                    {processing ? "Updating..." : "Reset Password"}
                </button>
            </form>
        </div>
    );
}
