// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useRef } from 'react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import img1 from '../../assets/Banner/slider1.jpg'
import img2 from '../../assets/Banner/slider2.jpg'
import img3 from '../../assets/Banner/slider3.jpg'
import img4 from '../../assets/Banner/slider4.jpg'

const HomeSlider = () => {

    const settings = {
        spaceBetween: 30,
        centeredSlides: true,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        pagination: {
            clickable: true,
        },
        navigation: true,
        modules: [Autoplay, Pagination, Navigation],
    };

    return (
        <>
            <Swiper
                {...settings}
                className="mySwiper"
            >
                <SwiperSlide>
                    <img src={img1} alt="Slide 1" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={img2} alt="Slide 2" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={img3} alt="Slide 3" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src={img4} alt="Slide 4" />
                </SwiperSlide>

            </Swiper>
        </>
    );
};

export default HomeSlider;