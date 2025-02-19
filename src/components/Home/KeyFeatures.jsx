import SectionTitle from "../shared/SectionTitle";
import {MdPayments , MdManageAccounts, MdAssessment  } from "react-icons/md"
import { TbReportSearch } from "react-icons/tb";
const KeyFeatures = () => {
    return (
        <div>
            <SectionTitle title="Our Main Features" />
            <div className="grid grid-cols-4">
                {/* employee tracking, payroll management, 
            performance reviews, and reporting. */}
                <div className="bg-red-500 text-center">
                    {/* logo */}
                    <MdManageAccounts className="text-6xl text-secondary mx-auto" />
                    <h2 className="text-2xl font-bold">Employee Tracking</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit ut aperiam voluptatum cum. Ad incidunt ullam id molestiae odio voluptates libero, ducimus ratione cupiditate non eius obcaecati harum alias sequi.</p>
                </div>
                <div>
                    {/* logo */}
                    <MdPayments  className="text-6xl text-secondary mx-auto" />
                    <h2 className="text-2xl font-bold">Payroll Management</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit ut aperiam voluptatum cum. Ad incidunt ullam id molestiae odio voluptates libero, ducimus ratione cupiditate non eius obcaecati harum alias sequi.</p>
                </div>
                <div>
                    {/* logo */}
                    <MdAssessment  className="text-6xl text-secondary mx-auto" />
                    <h2 className="text-2xl font-bold">Performance Review</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit ut aperiam voluptatum cum. Ad incidunt ullam id molestiae odio voluptates libero, ducimus ratione cupiditate non eius obcaecati harum alias sequi.</p>
                </div>
                <div>
                    {/* logo */}
                    <TbReportSearch  className="text-6xl text-secondary mx-auto" />
                    <h2 className="text-2xl font-bold">Reporting</h2>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit ut aperiam voluptatum cum. Ad incidunt ullam id molestiae odio voluptates libero, ducimus ratione cupiditate non eius obcaecati harum alias sequi.</p>
                </div>
            </div>
        </div>
    );
};

export default KeyFeatures;