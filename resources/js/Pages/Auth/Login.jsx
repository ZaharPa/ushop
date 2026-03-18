import { Link, useForm } from "@inertiajs/react";
import InputField from "../../Components/InputField";
import ReCAPTCHA from "react-google-recaptcha";
import { route } from "ziggy-js";
import { useEffect, useRef } from "react";
import { LogIn } from "lucide-react";

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
            <div className="flex items-center justify-center gap-3 mb-6">
                <LogIn size={32} className="text-sky-600" />
                <h1 className="text-3xl text-center text-gray-800">Login</h1>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
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

                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        name="remember"
                        id="remember"
                        checked={data.remember}
                        onChange={(e) => setData("remember", e.target.checked)}
                        className="w-4 h-4 text-sky-600 border border-gray-300 rounded focus:ring focus:ring-sky-500"
                    />
                    <span
                        htmlFor="remember"
                        className="text-sm text-gray-700 cursor-pointer"
                    >
                        Remember me
                    </span>
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
                    <p className="text-red-500">{errors.captcha}</p>
                )}

                <div className="grid grid-cols-1 gap-4">
                    <Link
                        href={route("password.request")}
                        className="emphasis-text mx-auto block"
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
                </div>
            </form>
        </div>
    );
}
