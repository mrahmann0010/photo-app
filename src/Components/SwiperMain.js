import { useParams } from "react-router-dom";

// External Lib
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from 'swiper/modules';
import "swiper/css";
import "swiper/css/effect-cards";
import { motion } from "motion/react";


function SwiperMain() {

    const { slug } = useParams();
    console.log(slug);

    const imageMap = {
    'swiss':['/1.jpg', '/2.jpg', '/4.jpg'],
    'forest':['/1.jpg', '/4.jpg', '/2.jpg'],
    'jungle':['/2.jpg', '/4.jpg', '/1.jpg'],
    };

    const titleMap = {
        'swiss':'In the Alps',
        'forest':'Lost in the forest',
        'jungle':'Breathing in the Jungle',
    }

    const images = imageMap[slug] || [];
    const title = titleMap[slug] || 'Gallery';

    
    return (
        <motion.section
        initial={{opacity:0, scale:0.85}}
        animate={{opacity:1, scale:1}}
        exit={{opacity:0, scale:0.85}}
        transition={{duration:0.6}}
        className="py-4 flex flex-col gap-6 items-center">
        

            <div className="flex flex-col items-center">
                <h3 className="text-xl text-blue-600">{title}</h3>
                <h4 className="text-sm text-green-600">{`${images.length} Photos`}</h4>
            </div>

            <Swiper
                effect={"cards"}
                grabCursor={true}
                modules={[EffectCards]}
                className="mySwiper"
                speed={500}
                >
                    {images.map((image, index)=>(
                        <SwiperSlide>
                            <img src={image} alt={`${image}-${index}`} key={index}/>
                        </SwiperSlide>
                    ))}
            </Swiper>
        </motion.section>
    )
}

export default SwiperMain;


{/* <SwiperSlide><img src="/2.jpg" alt="img-s"/></SwiperSlide>
<SwiperSlide><img src="/4.jpg" alt="img-s"/></SwiperSlide> */}