import AdminLayout from "@/Layouts/AdminLayout";
import { usePage } from "@inertiajs/react";
import dayjs from "dayjs";
import { useState } from "react";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

export default function Dashboard() {
    const { ordersByDay, incomeByDay, topItems, defaultRange } =
        usePage().props;

    const [start, setStart] = useState(defaultRange.start);
    const [end, setEnd] = useState(defaultRange.end);

    const data = Object.keys(ordersByDay).map((date) => ({
        date,
        orders: ordersByDay[date],
        income: incomeByDay[date] || 0,
    }));

    return (
        <AdminLayout>
            <div className="flex gap-4 mb-4">
                <input
                    type="date"
                    value={start}
                    onChange={(e) => setStart(e.target.value)}
                    className="input-admin"
                />
                <input
                    type="date"
                    value={end}
                    onChange={(e) => setEnd(e.target.value)}
                    className="input-admin"
                />
                <button
                    onClick={() =>
                        (window.location.href = `?start=${start}&end=${end}`)
                    }
                    className="btn-admin"
                >
                    Apply
                </button>
            </div>

            <div className="mb-4 w-full max-w-[900px] mx-auto">
                <h2 className="h2-center">Orders & Income</h2>
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip
                            formatter={(value, name) => [
                                name === "income"
                                    ? `$${value.toFixed(2)}`
                                    : value,
                                name.charAt(0).toUpperCase() + name.slice(1),
                            ]}
                            labelFormatter={(label) =>
                                dayjs(label).format("DD MMM YYYY")
                            }
                        />
                        <Line
                            type="monotone"
                            dataKey="orders"
                            stroke="#8884d8"
                            name="Orders"
                        />
                        <Line
                            type="monotone"
                            dataKey="income"
                            stroke="#82ca9d"
                            name="Income"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>

            <div>
                <h2 className="h2-center">Top Items</h2>
                <ResponsiveContainer width="100%" height={400}>
                    <BarChart width={800} height={400} data={topItems}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar
                            dataKey="quantity"
                            fill="#8884d8"
                            name="Quantity"
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </AdminLayout>
    );
}
