import React, { useState } from 'react';

const EmployeeWorkSheet = () => {
    const [tasks, setTasks] = useState([]);
    const [formData, setFormData] = useState({
        task: "sales",
        hoursWorked: "",
        date: new Date().toISOString().split("T")[0], // Default to current date
    });
    const [editIndex, setEditIndex] = useState(null); //to toggle update/Add operation

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleAddOrUpdate = (e) => {
        e.preventDefault();
        if (editIndex !== null) {
            const updatedTasks = [...tasks];
            updatedTasks[editIndex] = formData;
            setTasks(updatedTasks);
            setEditIndex(null);
        } else {
            setTasks([...tasks, formData]);
        }
        setFormData({
            task: "sales",
            hoursWorked: "",
            date: new Date().toISOString().split("T")[0],
        });
    };

    const handleEdit = (index) => {
        setFormData(tasks[index]);
        setEditIndex(index);
    };

    const handleDelete = (index) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };

    return (
        <div className="p-4">
            <form onSubmit={handleAddOrUpdate} className="mb-4">
                <table className="table-auto w-full border-collapse ">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="px-4 py-2">Serial</th>
                            <th className="px-4 py-2">Task</th>
                            <th className="px-4 py-2">Hours Worked</th>
                            <th className="px-4 py-2">Date</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td className=" ">
                                <select
                                    name="task"
                                    value={formData.task}
                                    onChange={handleInputChange}
                                    className="w-full border  border-b rounded p-2"
                                >
                                    <option value="sales">Sales</option>
                                    <option value="support">Support</option>
                                    <option value="content">Content</option>
                                    <option value="paper-work">Paper Work</option>
                                    <option value="marketing">Marketing</option>
                                </select>
                            </td>
                            <td className="">
                                <input
                                    type="number"
                                    name="hoursWorked"
                                    value={formData.hoursWorked}
                                    onChange={handleInputChange}
                                    className="w-full border rounded p-2"
                                    placeholder="Enter hours"
                                    required
                                />
                            </td>
                            <td className="">
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleInputChange}
                                    className="w-full border rounded p-2"
                                    required
                                />
                            </td>
                            <td className="text-center">
                                <button
                                    type="submit"
                                    className={`px-4 py-2 text-white ${editIndex !== null ? "bg-yellow-500" : "bg-green-500"
                                        } rounded`}
                                >
                                    {editIndex !== null ? "Update" : "Add"}
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>

            {/* Tasks Table */}
            {tasks.length > 0 && (
                <div>
                    <table className="table-auto w-full border-collapse border border-gray-300">
                        <tbody>
                            {tasks.map((task, index) => (
                                <tr key={index}>
                                    <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                                    <td className="border border-gray-300 px-4 py-2">{task.task}</td>
                                    <td className="border border-gray-300 px-4 py-2">{task.hoursWorked}</td>
                                    <td className="border border-gray-300 px-4 py-2">{task.date}</td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">
                                        <button
                                            className="px-2 py-1 bg-blue-500 text-white rounded mr-2"
                                            onClick={() => handleEdit(index)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="px-2 py-1 bg-red-500 text-white rounded"
                                            onClick={() => handleDelete(index)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default EmployeeWorkSheet;
