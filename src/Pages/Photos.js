import GalleryTile from "../Components/GalleryTile";

function Photos() {
    return (
        <section className="bg-main-background w-screen bg-center px-6 py-6 flex flex-col gap-6">
           
           <GalleryTile position='start' title='In the Swiss Alps'/> 
           <GalleryTile position='end' title='Deep in the forest'/> 
           <GalleryTile position='start' title='Running in the Jungle'/> 
            
        </section>
    )
}

export default Photos;
