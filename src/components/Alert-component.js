import React from 'react';
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {Alert, Collapse} from "@mui/material";

const AlertComponent = ({open, setOpen, text}) => {
    return (
        <Collapse in={open}>
            <Alert
                severity="error"
                action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={setOpen}
                    >
                        <CloseIcon fontSize="inherit"/>
                    </IconButton>
                }
                sx={{mb: 2}}
            >
                {text}
            </Alert>
        </Collapse>
    );
};

export default AlertComponent;