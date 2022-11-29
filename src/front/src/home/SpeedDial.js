import React, {useState} from 'react';
import {ArrowUpward, Share} from "@material-ui/icons";
import {SpeedDialAction, SpeedDialIcon} from "@mui/lab";
import Box from "@mui/material/Box";

function SpeedDial(props) {
    const actions = [
        { icon: <ArrowUpward />, name: 'Print' },
        { icon: <Share />, name: 'Share' },
    ];

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    return (
        <Box sx={{ height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
            <SpeedDial
                sx={{ position: 'absolute', bottom: 16, right: 16 }}
                icon={<SpeedDialIcon />}
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={handleClose}
                    />
                ))}
            </SpeedDial>
        </Box>
    );
}

export default SpeedDial;