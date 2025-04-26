export default function ConfrimModal({ show, onConfrim, onCancel, message }) {
    if (!show) return null;

    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black/50 z-50">
            <div className="bg-white p-6 rounded shadow-sm">
                <p>{message}</p>
                <div className="flex justify-end gap-4 mt-4">
                    <button onClick={onConfrim} className="btn-delete">
                        Yes
                    </button>
                    <button onClick={onCancel} className="btn-reset">
                        No
                    </button>
                </div>
            </div>
        </div>
    );
}
