import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useEffect, useState } from "react";

const EmployeeRecords = () => {
    const [worksheet, setWorksheet] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState("");
    const [selectedMonth, setSelectedMonth] = useState("");
    const axiosPublic = useAxiosPublic();

    const { data } = useQuery({
        queryKey: ['employeeWorks'],
        queryFn: async () => {
            const { data } = await axiosPublic.get('/employee-progress');
            return data;
        },
    });

    // Use useEffect to update worksheet state when data changes
    useEffect(() => {
        if (data) {
            // Flatten worksheets from all employees and update the state
            const worksheets = data.flatMap(employee => employee.worksheet);
            setWorksheet(worksheets);
        }
    }, [data]);

    console.log(worksheet)

    const employeeNames = data?.map((employee) => employee.name);

    const allDates = worksheet?.map((work) => {
        const date = new Date(work.date); // Convert to Date object
        return isNaN(date) ? null : date; 
    });

    const uniqueMonths = [
        ...new Set(
            allDates.map((date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`)
        ),
    ];
    

    // console.log(employeeNames, allDates)


    // Filter the records
    const filteredWorksheet = data?.filter((employee) => {
        if (selectedEmployee && employee.name !== selectedEmployee) {
            return false;
        }
        if (selectedMonth) {
            const hasWorkInMonth = employee.worksheet.some((work) => {
                const workMonth = `${new Date(work.date).getFullYear()}-${String(new Date(work.date).getMonth() + 1).padStart(2, "0")}`;
                return workMonth === selectedMonth;
            });
            return hasWorkInMonth;
        }
        return true;
    });



    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Employee Work Records</h1>

            {/* Filters */}
            <div className="mb-4 flex flex-wrap gap-4">
                {/* Employee Filter */}
                <select
                    className="select select-bordered w-full max-w-xs"
                    value={selectedEmployee}
                    onChange={(e) => setSelectedEmployee(e.target.value)}
                >
                    <option value="">All Employees</option>
                    {employeeNames?.map((name) => (
                        <option key={name} value={name}>
                            {name}
                        </option>
                    ))}
                </select>

                {/* Month Filter */}
                <select
                    className="select select-bordered w-full max-w-xs"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                >
                    <option value="">All Months</option>
                    {uniqueMonths?.map((month) => (
                        <option key={month} value={month}>
                            {month}
                        </option>
                    ))}
                </select>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border border-gray-200">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">#</th>
                            <th className="border border-gray-300 px-4 py-2">Employee</th>
                            <th className="border border-gray-300 px-4 py-2">Task</th>
                            <th className="border border-gray-300 px-4 py-2">Hours Worked</th>
                            <th className="border border-gray-300 px-4 py-2">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredWorksheet?.map((employee, index) =>
                            employee.worksheet.map((work, i) => {
                                const workMonth = `${new Date(work.date).getFullYear()}-${String(new Date(work.date).getMonth() + 1).padStart(2, "0")}`;
                                if (selectedMonth && workMonth !== selectedMonth) {
                                    return null;
                                }
                                return (
                                    <tr key={`${employee._id}-${i}`} className="hover:bg-gray-100">
                                        <td className="border border-gray-300 px-4 py-2">{i+1}</td>
                                        <td className="border border-gray-300 px-4 py-2">{employee.name}</td>
                                        <td className="border border-gray-300 px-4 py-2">{work.task}</td>
                                        <td className="border border-gray-300 px-4 py-2">{work.hoursWorked}</td>
                                        <td className="border border-gray-300 px-4 py-2">{work.date}</td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmployeeRecords;