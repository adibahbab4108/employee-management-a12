import React, { useEffect, useState } from 'react';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useUserInfo from '../../../hooks/useUserInfo';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Swal from 'sweetalert2'

const EmployeeWorkSheet = () => {
    const [tasks, setTasks] = useState([]);
    const [oldTask, setOldtask] = useState([]);
    const [updateBtn, setUpdateBtn] = useState(false)
    const { userData } = useUserInfo();
    const axiosPublic = useAxiosPublic();

    const [formData, setFormData] = useState({
        task: "sales",
        hoursWorked: "",
        date: new Date().toISOString().split("T")[0], // Default to current date
    });

    // Fetch tasks from the backend on component amount
    useEffect(() => {
        if (userData?.email) {
            axiosPublic.get(`/employee-worksheet?email=${userData.email}`)
                .then((response) => {
                    console.log("Fetched worksheet:", response.data);
                    setTasks(response.data?.worksheet || []);
                })
                .catch((error) => {
                    console.error("Error fetching worksheet:", error);
                });
        }
    }, [userData, axiosPublic]);

    const handleAdd = async (e) => {
        e.preventDefault();

        // Prepare the new task
        const newTask = { ...formData };

        try {
            // Send the new task to the backend
            const response = await axiosPublic.post("/employee-worksheet", {
                email: userData.email,
                name: userData.name,
                worksheet: [newTask], // Only send the new task
            });

            if (response.data.insertStatus) {
                // Update tasks locally if the backend confirms insertion
                setTasks([...tasks, newTask]);

                Swal.fire({
                    icon: "success",
                    title: "Task added successfully!",
                });
            } else {
                Swal.fire({
                    icon: "warning",
                    title: "The task already exists or couldn't be added!",
                    text: "Please Add new or Update that task"
                });
            }
        } catch (error) {
            console.error("Error sending employee worksheet:", error);
            Swal.fire({
                icon: "error",
                title: "An error occurred while adding the task.",
            });
        }

        // Reset form data after submission
        setFormData({
            task: "sales",
            hoursWorked: "",
            date: new Date().toISOString().split("T")[0], // Reset to the current date
        });
    };

    const handleUpdateSetup = async (task, index) => {
        setFormData(tasks[index]);
        setUpdateBtn(true)
        setOldtask(task)

    };
    const handleUpdate = async (e) => {
        e.preventDefault();

        // Prepare the payload for the update
        const payload = {
            email: userData.email,
            oldTask: oldTask.task,
            oldDate: oldTask.date,
            newTask: formData.task,
            newHoursWorked: formData.hoursWorked,
            newDate: formData.date,
        };
        console.log("Payload for update:", payload);

        try {
            // Send the update request to the server
            const response = await axiosPublic.put('/employee-worksheet', payload);
            console.log(response)
            
            if (response.status === 200) {
                Swal.fire({
                    icon: "success",
                    title: "Task updated successfully.",
                });
                setUpdateBtn(false); // Hide the update button after success
            } else {
                Swal.fire({
                    icon: "error",
                    title: "An error occurred while updating the task.",
                    text: response.data.message || "Unknown error occurred",
                });
            }
        } catch (error) {
            console.error("Error updating task:", error);
            Swal.fire({
                icon: "error",
                title: "Failed to update the task.",
                text: error.response?.data?.error || "Network or server error occurred.",
            });
        }
    };


    const handleDelete = async (task) => {
        // Construct the payload for the DELETE request
        const payload = {
            email: userData.email,
            deleteTask: task.task,
            deleteHoursWorked: task.hoursWorked,
            deleteDate: task.date,
        };

        try {
            // Send the DELETE request to the backend
            const response = await axiosPublic.delete('/employee-worksheet', payload);
            console.log(response)
            if (response.status === 200) {
                Swal.fire({
                    icon: "success",
                    title: "Task deleted successfully.",
                });
                setTasks(updatedTasks); // Update the state with the remaining tasks
            } else {
                Swal.fire({
                    icon: "error",
                    title: response.data.message || "Failed to delete task.",
                });
            }
        } catch (error) {
            console.error("Error deleting task:", error);
            Swal.fire({
                icon: "error",
                title: "An error occurred while deleting the task.",
            });
        }
    };


    return (
        <div className="p-4">
            <form onSubmit={updateBtn ? handleUpdate : handleAdd} className="mb-4">
                <table className="table-auto w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-200">
                            <th>Serial</th>
                            <th className="px-4 py-2">Task</th>
                            <th className="px-4 py-2">Hours Worked</th>
                            <th className="px-4 py-2">Date</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td>
                                <select
                                    name="task"
                                    value={formData.task}
                                    onChange={(e) => setFormData({ ...formData, task: e.target.value })}
                                    className="w-full border rounded p-2"
                                >
                                    <option value="sales">Sales</option>
                                    <option value="support">Support</option>
                                    <option value="content">Content</option>
                                    <option value="paper-work">Paper Work</option>
                                    <option value="marketing">Marketing</option>
                                </select>
                            </td>
                            <td>
                                <input
                                    type="number"
                                    name="hoursWorked"
                                    value={formData.hoursWorked}
                                    onChange={(e) => setFormData({ ...formData, hoursWorked: e.target.value })}
                                    className="w-full border rounded p-2"
                                    placeholder="Enter hours"
                                    required
                                />
                            </td>
                            <td>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                    className="w-full border rounded p-2"
                                    required
                                />
                            </td>
                            <td>
                                {
                                    updateBtn ?
                                        <button
                                            type="submit"
                                            className=" ml-4 px-4 py-2 text-white bg-yellow-700 rounded "
                                        >
                                            Update
                                        </button>
                                        :
                                        <button
                                            type="submit"
                                            className=" ml-4 px-4 py-2 text-white bg-green-500 rounded "
                                        >
                                            Add
                                        </button>
                                }
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>

            {tasks.length > 0 && (
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 px-4 py-2">#</th>
                            <th className="border border-gray-300 px-4 py-2">Task</th>
                            <th className="border border-gray-300 px-4 py-2">Hours</th>
                            <th className="border border-gray-300 px-4 py-2">Date</th>
                            <th className="border border-gray-300 px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task, index) => (
                            <tr key={index}>
                                <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">{task.task}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">{task.hoursWorked}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">{task.date}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                    <button
                                        className="btn btn-sm btn-primary  mr-2"
                                        onClick={() => handleUpdateSetup(task, index)}
                                    >
                                        <FaEdit className='text-2xl' />
                                    </button>
                                    <button
                                        className="btn btn-sm btn-error"
                                        onClick={() => handleDelete(task)}
                                    >
                                        <MdDelete className='text-2xl text-white' />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default EmployeeWorkSheet;
