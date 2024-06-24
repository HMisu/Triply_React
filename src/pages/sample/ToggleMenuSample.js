import React, {useRef, useState} from 'react';
import ToggleMenu from '../../components/ui/ToggleMenu';

const ToggleMenuSample = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const anchorRef = useRef(null);
    
    const toggleMenu = () => {
        setMenuOpen((prevOpen) => !prevOpen);
    };

    const menuItems = [
        {label: 'Item 1', onClick: () => console.log('Item 1 selected')},
        {label: 'Item 2', onClick: () => console.log('Item 2 selected')},
    ];

    return (
        <div>
            <div
                ref={anchorRef}
                onClick={toggleMenu}
                style={{
                    cursor: 'pointer',
                    width: '200px',
                    height: '30px',
                    textAlign: 'center',
                    backgroundColor: 'lightgray'
                }}>
                여기를 클릭하세요
            </div>
            <ToggleMenu
                anchorEl={anchorRef.current}
                open={menuOpen}
                onClose={() => setMenuOpen(false)}
                items={menuItems}
            />
        </div>
    );
}

export default ToggleMenuSample;