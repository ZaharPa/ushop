import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export default function FAQItem({ question, answer }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="border-b py-4 border-sky-200">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex justify-between items-center text-left text-sky-700 text-lg"
            >
                <span>{question}</span>
                {open ? (
                    <ChevronUp className="h-5 w-5" />
                ) : (
                    <ChevronDown className="h-5 w-5" />
                )}
            </button>
            {open && <p className="mt-2">{answer}</p>}
        </div>
    );
}
