import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
    const baseClass = 'px-3 py-2 rounded-full transition-all duration-600 text-md';
    const activeClass = 'bg-activeBG text-navText';

    const [scrolled, setScrolled] = useState(false);

    useEffect(()=>{
        const onScroll = () => {
            setScrolled(window.scrollY>10);
        };
        window.addEventListener('scroll', onScroll);
        return ()=> window.removeEventListener('scroll', onScroll)
    },[]);

    return (
        <nav className={`my-6 fixed top-0 left-1/2 -translate-x-1/2 ${scrolled? 'bg-navBG px-3 py-4 rounded-full backdrop-blur-[20px] saturate-[1.7] z-50': 'bg-transparent'} transition-all duration-700`}>
            <ul className="list-none flex gap-4 justify-center">
            
                <li>
                    <NavLink to='/' end
                        className={({isActive})=> `${baseClass} ${isActive ? activeClass: ''}`}
                    >
                        Home
                    </NavLink>
                </li>

                <li>
                    <NavLink to='/photos' end
                        className={({isActive})=> `${baseClass} ${isActive ? activeClass: ''}`}
                    >
                        Photos
                    </NavLink>
                </li>

                <li>
                    <NavLink to='/about' end
                        className={({isActive})=> `${baseClass} ${isActive ? activeClass: ''}`}
                    >
                        About
                    </NavLink>
                </li>
            </ul>
      </nav>
    )
}

export default Navbar;
