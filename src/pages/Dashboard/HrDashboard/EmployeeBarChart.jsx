import { useQuery } from '@tanstack/react-query';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from 'recharts';
import useAxiosPublic from '../../../hooks/useAxiosPublic';

const colors = ['#0088FE','red','#FF8042', 'blue', '#FFBB28',  'pink'];




const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
  Z`;
};

const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

const EmployeeBarChart = ({ employee }) => {
    const { email, role } = employee;
    const axiosPublic = useAxiosPublic();
    const { data: userPaymentData, refetch } = useQuery({
        queryKey: ["payments"],
        queryFn: async () => {
            const { data } = await axiosPublic.get(`/payroll?email=${email}`)
            return data
        }
    })

    const data = userPaymentData?.map((payment, index) => {
        return {
            name: payment.month, // Use month as the name for the X-axis
            uv: parseFloat(payment.salary), // Salary for the Y-axis (ensure it's a number)
        };
    });
    


    return (
        <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Bar dataKey="uv" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                {data?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                ))}
            </Bar>
        </BarChart>
    );
};

export default EmployeeBarChart;