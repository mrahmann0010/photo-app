const footerSegments = [
    {header:'Elsewhere',
    links: [{name:'Figma', href:'/home'},
    {name:'Facebook', href:'/photos'},
    {name:'Instagram', href:'/about'},
    ]}, {header:'Contact', links: [{name:'Contact', href:'/home'},]}
];

export default function Footer() {
    return (
        <footer className="grid grid-cols-2 px-8 py-6 text-navText">
            {footerSegments.map((segment, index)=>(
                <FooterSegment segmentHeader={segment.header} key={index} linkArray={segment.links}/>
            ))}

        </footer>
    );
};


const FooterSegment = ({segmentHeader, linkArray}) => {
    return(
        <div className="flex flex-col gap-3">
            <h6 className="font-semibold text-lg">{segmentHeader}</h6>
            <ul className="flex flex-col">
                {linkArray.map((item, index)=>(
                    <li><a className="text-base" href={item.href} key={index}>{item.name}</a></li>
                ))}
            </ul>
        </div>
    );
};