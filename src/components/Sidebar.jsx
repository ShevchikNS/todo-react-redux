import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from "@mui/icons-material/Menu";
import FormDialog from "./FolderInputForm";
import {useDispatch, useSelector} from "react-redux";
import LongMenu from "./MenuForFolders";
import {removeFolderAction} from "../store/folderReducer";
import {store} from "../store";
import {setCurrentFolderAction} from "../store/currentFolderReducer";
import {useState} from "react";


export default function Sidebar() {
    // const navigate = useNavigate();
    const dispatch = useDispatch()
    const userFolder = useSelector(state => state.folder.folder)
    const currentUser = useSelector(state => state.currentUser.user)

    const [state, setState] = useState({
        left: false
    });
    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }
        setState({...state, [anchor]: open});
    };
    const removeFolderItem = async (folderForDelete) => {
        console.log(folderForDelete)
        dispatch(removeFolderAction(folderForDelete.folderId))
        await localStorage.setItem('todoFolder', JSON.stringify(store.getState().folder.folder))

    }
    const getCurrentFolder = async (folder) => {
        dispatch(setCurrentFolderAction(folder))
    }
    const list = (anchor) => (
        <Box
            sx={{width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250}}
            role="presentation"

            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <ListItemButton onClick={(folder) => getCurrentFolder(folder.name = {
                    userId: currentUser.userId,
                    folderId: "1",
                    folderName: "ALL"
                })}>
                    <ListItemText primary="All"/>
                </ListItemButton>
                {
                    userFolder.length > 0 ?
                        userFolder.map((folder, index) => (
                            <ListItem key={folder.folderName} disablePadding>
                                <ListItemButton onClick={() => getCurrentFolder(folder)}>
                                    <ListItemText primary={folder.folderName}/>
                                </ListItemButton>
                                <LongMenu onDelete={() => removeFolderItem(folder)}/>
                            </ListItem>
                        )) : console.log()
                }

            </List>
            <Divider/>
        </Box>
    );

    return (
        <div>
            {['left'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <MenuIcon onClick={toggleDrawer(anchor, true)}/>
                    <SwipeableDrawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                        onOpen={toggleDrawer(anchor, true)}
                    >
                        <FormDialog/>
                        {list(anchor)}
                    </SwipeableDrawer>
                </React.Fragment>
            ))}
        </div>
    );
}
