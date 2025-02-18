// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Autoplay } from 'swiper/modules';
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

    return (
        <>
            <Swiper
                effect={'fade'}
                centeredSlides={true}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                modules={[Autoplay, EffectFade]}

                className="mySwiper brightness-50 bg-red-500 h-full w-full"
            >
                <SwiperSlide>
                    <img className='h-full w-full object-cover' src={img1} alt="Slide 1" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className='h-full w-full object-cover' src={img2} alt="Slide 2" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className='h-full w-full object-cover' src={img3} alt="Slide 3" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className='h-full w-full object-cover' src={img4} alt="Slide 4" />
                </SwiperSlide>

            </Swiper>
        </>
    );
};

export default HomeSlider;