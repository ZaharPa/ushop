import { useForm } from "@inertiajs/react";

export default function ForgetPassword() {
    const { data, setData, post, processing, errors } = useForm({ email: "" });

    function submit(e) {
        e.preventDefault();
        post(route("password.email"));
    }

    return (
        <div className="form-block">
            <h2 className="h2-center">Forget Password</h2>

            <form onSubmit={submit} className="flex flex-col gap-3">
                <input
                    type="email"
                    value={data.email}
                    onChange={(e) => setData("email", e.target.value)}
                    placeholder="Email"
                    className="input-admin"
                />
                {errors.email && (
                    <div className="text-red-500">{errors.email}</div>
                )}

                <button
                    type="submit"
                    disabled={processing}
                    className="btn-primary"
                >
                    {processing ? "Sending..." : "Send reset link"}
                </button>
            </form>
        </div>
    );
}
