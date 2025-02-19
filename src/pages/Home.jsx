import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import HomeSlider from '../components/Home/HomeSlider';
import Services from '../components/Home/Services';
import Testimonials from '../components/Home/Testimonials';
import AboutUs from '../components/Home/AboutUs';
import { Link } from 'react-router-dom';
import KeyFeatures from '../components/Home/KeyFeatures';

const Home = () => {
    return (
        <div>
            <div className='relative h-[calc(100vh-72px)] overflow-hidden'>
                {/* Hero Featuring */}
                <div className='absolute left-1/2 -translate-x-1/2 z-10 text-center  top-40 '>
                    {/* Title */}
                    <h1 className='text-6xl font-extrabold text-gray-200  '>Streamline Your Workforce <br /> Maximize Productivity</h1>
                    {/* Subtitile */}
                    <h2 className='text-gray-300/80 text-3xl py-6'>A smart, all-in-one employee management solution designed to simplify HR tasks, payroll, and performance tracking</h2>
                    <Link to="/dashboard"><button className='btn btn-primary text-white mt-32'>Get Started ↠</button></Link>
                </div>
                {/* Hero Slider */}
                <HomeSlider />
            </div>
            <div className='container mx-auto'>
                <Services />
                <KeyFeatures/>
                <Testimonials />
                <AboutUs />

            </div>
        </div>
    );
};

export default Home;