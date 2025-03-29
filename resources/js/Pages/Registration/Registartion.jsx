import { Link } from "@inertiajs/react";

export default function Registration() {
    return (
        <div className="w-3/4 lg:w-1/2 mx-auto mt-10 p-4 bg-sky-100 shadow-lg rounded-lg text-lg">
            <h1 className="text-2xl text-center p-2 mb-6">Registration</h1>
            <form>
                <div>
                    <span>Name</span>
                    <input type="text" name="name" required />
                </div>

                <div>
                    <span>Email</span>
                    <input type="email" name="email" required />
                </div>

                <div>
                    <span>Password</span>
                    <input type="password" name="password" required />
                </div>

                <div>
                    <span>Confrim password</span>
                    <input type="password" name="password_confrim" required />
                </div>

                <button type="submit">Register</button>

                <div>
                    Do you have an account? Click{" "}
                    <Link href={route("login")}>here</Link> to sign in
                </div>
            </form>
        </div>
    );
}
