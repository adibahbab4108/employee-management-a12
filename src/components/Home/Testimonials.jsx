import { useEffect, useState } from "react";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import TestimonialCard from "./TestimonialCard";
import Marquee from "react-fast-marquee";

const Testimonials = () => {
    const axiosPublic = useAxiosPublic();
    const [testimonials, setTestimonials] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axiosPublic.get("/reviews");
                setTestimonials(response.data);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };
        fetchReviews();
    }, [axiosPublic]);
    console.log(testimonials)
    return (
        <div className="mt-20">
            <h1 className="text-3xl font-bold text-center my-10">Customer Testimonials</h1>
            <Marquee pauseOnHover={true} gradient>
                {
                    testimonials.map(testimonial => <TestimonialCard key={testimonial._id} testimonial={testimonial} />)
                }
            </Marquee>

        </div>
    );
};

export default Testimonials;