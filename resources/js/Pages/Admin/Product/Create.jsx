import AdminLayout from "@/Layouts/AdminLayout";

export default function Create() {
    return (
        <AdminLayout>
            <h2 className="h2-center">New Product</h2>
            <form>
                <div>
                    <span>Name</span>
                    <input type="text" />
                </div>
                <div>
                    <span>Description</span>
                    <textarea></textarea>
                </div>
                <div>
                    <span>Price</span>
                    <input type="text" />
                </div>
                <div>
                    <span>Category</span> <select></select>
                </div>
                <div>
                    <button type="sumbit" className="btn-primary">
                        Send
                    </button>
                    <butoon type="reset" className="btn-reset">
                        Reset
                    </butoon>
                </div>
            </form>
        </AdminLayout>
    );
}
