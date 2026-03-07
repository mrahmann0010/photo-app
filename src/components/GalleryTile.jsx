import { Link } from "react-router-dom";

function GalleryTile({position, title, slug}) {

    const alignment = position === 'start'? 'self-start': 'self-end';

    return (
        <Link to={`/photos/${slug}`}
        className={`flex flex-col w-[75%] gap-4 ${alignment}`}>

            <h2 className={`text-white text-md rounded-full border border-white px-3 py-2 bg-transparent backdrop-blur-lg w-max ${alignment}`}>{title}</h2>
            <div className="grid grid-cols-3 gap-3">
                <img className="rounded-lg" src="/1.jpg" alt="here-we-go"/>
                <img className="rounded-lg" src="/2.jpg" alt="here-we-go"/>
                <img className="rounded-lg" src="/4.jpg" alt="here-we-go"/>
            </div>


        </Link>
    )
}

export default GalleryTile;
