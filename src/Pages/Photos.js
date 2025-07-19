import { motion } from "motion/react";
import GalleryTile from "../Components/GalleryTile";

function Photos() {
    return (
        <motion.section
            className="bg-main-background w-screen bg-center px-6 pt-20 pb-8 flex flex-col gap-6"
            initial={{opacity:0.5, scale:1}}
            animate={{opacity:1, scale:1}}
            exit={{opacity:0.5, scale:0.1}}
            transition={{duration:0.5, ease:'easeInOut'}}
        >
           
           <GalleryTile position='start' title='In the Swiss Alps' slug='swiss'/> 
           <GalleryTile position='end' title='Deep in the forest' slug='forest'/> 
           <GalleryTile position='start' title='Running in the Jungle' slug='jungle'/> 
           <GalleryTile position='start' title='Running in the Jungle' slug='jungle'/> 
            
        </motion.section>
    )
}

export default Photos;
