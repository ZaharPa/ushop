import { Link, useForm } from "@inertiajs/react";
import InputField from "../../Components/InputField";
import ReCAPTCHA from "react-google-recaptcha";
import { route } from "ziggy-js";
import { useEffect, useRef } from "react";

export default function Login() {
    const captchaRef = useRef();

    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
        remember: false,
        captcha: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("login.store"));
    };

    useEffect(() => {
        if (errors.email || errors.captcha || errors.password) {
            captchaRef.current?.reset();
            setData("captcha", "");
        }
    }, [errors]);

    return (
        <div className="form-block">
            <h1 className="text-2xl text-center p-2 mb-6">Login</h1>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col space-y-4 text-emerald-900"
            >
                <InputField
                    label="Email"
                    type="email"
                    name="email"
                    value={data.email}
                    onChange={(e) => setData("email", e.target.value)}
                />

                <InputField
                    label="Password"
                    type="password"
                    name="password"
                    value={data.password}
                    onChange={(e) => setData("password", e.target.value)}
                />

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

                <ReCAPTCHA
                    ref={captchaRef}
                    sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                    onChange={(token) => setData("captcha", token)}
                />
                {errors.captcha && (
                    <span className="text-red-500">{errors.captcha}</span>
                )}

                <Link
                    href={route("password.request")}
                    className="emphasis-text mx-auto"
                >
                    Forget your password?
                </Link>

                <button
                    type="submit"
                    disabled={processing}
                    className="btn-primary"
                >
                    {processing ? "Logging in..." : "Sign in"}
                </button>
                <div className="text-center mt-2">
                    Don't have an account? Click
                    <Link
                        href={route("register.create")}
                        className="emphasis-text px-0.5"
                    >
                        here
                    </Link>
                    to register
                </div>
            </form>
        </div>
    );
}
