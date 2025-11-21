import AdminLayout from "@/Layouts/AdminLayout";
import { usePage } from "@inertiajs/react";
import dayjs from "dayjs";
import { useState } from "react";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Legend,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

export default function Dashboard() {
    const {
        ordersByDay,
        incomeByDay,
        topItems,
        defaultRange,
        newCustomers,
        repeatCustomers,
        anonymousCustomers,
    } = usePage().props;

    const [start, setStart] = useState(defaultRange.start);
    const [end, setEnd] = useState(defaultRange.end);

    const data = Object.keys(ordersByDay).map((date) => ({
        date,
        orders: ordersByDay[date],
        income: incomeByDay[date] || 0,
    }));

    const pieData = [
        { name: "New Customers", value: newCustomers },
        { name: "Repeat Customers", value: repeatCustomers },
        { name: "Anonymous Customers", value: anonymousCustomers },
    ];
    const colors = ["#0088FE", "#00C49F", "#FFBB28"];

    const totalOrders = data.reduce((sum, day) => sum + day.orders, 0);
    const totalIncome = data.reduce((sum, day) => sum + day.income, 0);
    const avgOrderValue =
        totalOrders > 0 ? (totalIncome / totalOrders).toFixed(2) : 0;

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
                    className="btn-primary"
                >
                    Apply
                </button>
            </div>

            <div className="mb-4 grid grid-cols-3 gap-4">
                <div className="shadow rounded p-4 text-center text-lg">
                    Total Orders -
                    <span className="font-bold ml-2">{totalOrders}</span>
                </div>
                <div className="shadow rounded p-4 text-center text-lg">
                    Total Income -
                    <span className="font-bold ml-2">{totalIncome}</span>
                </div>
                <div className="shadow rounded p-4 text-center text-lg">
                    Average Order Value -
                    <span className="font-bold ml-2">{avgOrderValue}</span>
                </div>
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

            <div className="mb-4 w-full max-w-[900px] mx-auto">
                <h2 className="h2-center">Customers Type</h2>
                <ResponsiveContainer width="100%" height={400}>
                    <PieChart>
                        <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) =>
                                `${name} ${(percent * 100).toFixed(0)}%`
                            }
                            labelLine={false}
                        >
                            {pieData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={colors[index]}
                                />
                            ))}
                        </Pie>
                        <Tooltip formatter={(value) => value} />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </AdminLayout>
    );
}
