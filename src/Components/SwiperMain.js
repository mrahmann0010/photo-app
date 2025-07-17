import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from 'swiper/modules';
import "swiper/css";
import "swiper/css/effect-cards";

function SwiperMain() {
    return (
        <div className="">
            <Swiper
                effect={"cards"}
                grabCursor={true}
                modules={[EffectCards]}
                className="mySwiper"
                speed={500}
                >
                <SwiperSlide><img src="/1.jpg" alt="img-s"/></SwiperSlide>
                <SwiperSlide><img src="/2.jpg" alt="img-s"/></SwiperSlide>
                <SwiperSlide><img src="/4.jpg" alt="img-s"/></SwiperSlide>
            </Swiper>
        </div>
    )
}

export default SwiperMain;
