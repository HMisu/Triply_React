import {React} from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import '../../scss/ui/ToggleMenu.scss';

const ToggleMenu = ({anchorEl, open, onClose, items}) => {
    if (!items) {
        items = [];
    }

    return (
        <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={onClose}
            keepMounted
        >
            {items.map((item, index) => (
                <MenuItem key={index} onClick={() => {
                    onClose();
                    item.onClick();
                }}>
                    {item.label}
                </MenuItem>
            ))}
        </Menu>
    );
}

export default ToggleMenu;