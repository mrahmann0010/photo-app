import GalleryTile from "../Components/GalleryTile";

function Photos() {
    return (
        <section className="bg-main-background w-screen bg-center px-6 pt-20 pb-8 flex flex-col gap-6">
           
           <GalleryTile position='start' title='In the Swiss Alps' slug='swiss'/> 
           <GalleryTile position='end' title='Deep in the forest' slug='forest'/> 
           <GalleryTile position='start' title='Running in the Jungle' slug='jungle'/> 
           <GalleryTile position='start' title='Running in the Jungle' slug='jungle'/> 
            
        </section>
    )
}

export default Photos;
