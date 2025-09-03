import FAQItem from "@/Components/FAQItem";
import { Link } from "@inertiajs/react";

export default function Help() {
    return (
        <div className="container mx-auto p-4 max-w-2xl leading-relaxed">
            <h1 className="text-2xl font-bold text-sky-800 mb-4">Help</h1>

            <section className="mb-6">
                <FAQItem
                    question="How do I place an order?"
                    answer="Browse products, add items to cart and proceed to checkout
                    by following the steps."
                />
            </section>

            <section className="mb-6">
                <FAQItem
                    question="What paymant methods are accepted?"
                    answer="We accept Visa, MasterCard and Paypal."
                />
            </section>

            <section className="mb-6">
                <FAQItem
                    question="Are the products tested?"
                    answer="Yes, every product is tested, cleaned and verified before it
                    listed on the site."
                />
            </section>

            <section className="mb-6">
                <FAQItem
                    question="Can I return a product?"
                    answer=" You can return products withun 14 days if it doesn't match
                    the description or has defects."
                />
                <Link
                    href={route("refund.create")}
                    className="text-sky-700 font-medium mt-4 text-lg hover:text-sky-600 hover:underline"
                >
                    Form of refund products
                </Link>
            </section>

            <section className="mb-6">
                <h2 className="text-xl font-semibold text-sky-700 mb-2">
                    Need more help?
                </h2>
                <p>
                    Contact our support team at{" "}
                    <a
                        href="mailto:support@ushop.com"
                        className="text-emerald-600 hover:underline"
                    >
                        support@ushop.com
                    </a>
                </p>
            </section>
        </div>
    );
}
