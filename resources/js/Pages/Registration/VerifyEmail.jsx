import { Link } from "@inertiajs/react";

export default function VerifyEmail() {
    return (
        <div className="form-block text-center space-y-4">
            <div className="text-lg font-medium">
                You need be verified to access this page.
            </div>

            <div>
                <Link
                    href={route("verification.send")}
                    method="post"
                    as="button"
                    className="btn-primary"
                >
                    Resend verification email
                </Link>
            </div>
        </div>
    );
}
