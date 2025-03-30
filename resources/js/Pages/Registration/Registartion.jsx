import { Link } from "@inertiajs/react";
import InputField from "../../Components/InputField";

export default function Registration() {
    return (
        <div className="form-block">
            <h1 className="text-2xl text-center p-2 mb-6">Registration</h1>
            <form className="flex flex-col space-y-4 text-emerald-900">
                <InputField label="Name" name="name" value={""} />

                <InputField
                    label="Email"
                    type="email"
                    name="email"
                    value={""}
                />

                <InputField
                    label="Password"
                    type="password"
                    name="password"
                    value={""}
                />

                <InputField
                    label="Confrim-Pass"
                    type="password"
                    name="password_confrim"
                    value={""}
                />

                <button type="submit" className="btn-primary mt-4">
                    Register
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
