import React from 'react';
import '../../scss/ui/NewToggleMenu.scss';

const NewToggleMenu = ({anchorEl, open, onClose, items}) => {
    return (
        <div className={`menu ${open ? 'show' : ''}`}
             style={{position: 'absolute', top: anchorEl?.offsetTop + 30, left: anchorEl?.offsetLeft}}>
            {items.map((item, index) => (
                <div key={index} className="menuItem" onClick={() => {
                    onClose();
                    item.onClick();
                }}>
                    {item.label}
                </div>
            ))}
        </div>
    );
};

export default NewToggleMenu;