import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import HomeSlider from '../components/Home/HomeSlider';
import Services from '../components/Home/Services';
import Testimonials from '../components/Home/Testimonials';

const Home = () => {
    return (
        <div>
            <HomeSlider />
            <div className='container mx-auto'>
                <Services />
                <Testimonials/>

            </div>
        </div>
    );
};

export default Home;