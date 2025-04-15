export default function UserRow({ user, actions }) {
    return (
        <li className="grid grid-cols-10 lg:grid-cols-11 text-center mt-2 gap-4">
            <div className="col-span-1">{user.id}</div>
            <div className="col-span-3 lg:col-span-4">{user.name}</div>
            <div className="col-span-4">{user.email}</div>
            <div className="col-span-2 flex">{actions}</div>
        </li>
    );
}
