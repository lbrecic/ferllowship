import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { useTransition, animated } from 'react-spring'
import Menu from './Menu'

function Navigation() {
    const [showMenu, setShowMenu] = useState(false);

    const transitions = useTransition(showMenu, null, {
        from: { opacity: 0, transform: 'translateY(-100%)' },
        enter: { opacity: 1, transform: 'translateY(0%)' },
        leave: { opacity: 0, transform: 'translateY(-100%)' },
    })

    return (
        <nav>
            <span className="relative text-xl z-50">
                <FontAwesomeIcon 
                    icon={faBars}
                    onClick={() => setShowMenu(!showMenu)}
                />
            </span>

            {
                transitions.map(({ item, key, props }) =>
                    item && 
                    <animated.div 
                        key={key} 
                        style={props}
                        className="z-40 fixed bg-white top-0 left-0 h-screen w-full p-3"
                    >
                        <Menu show={setShowMenu}/>
                    </animated.div>
                )
            }
        </nav>
    );
}

export default Navigation;