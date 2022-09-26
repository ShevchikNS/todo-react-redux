import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CreateNewFolderOutlinedIcon from "@mui/icons-material/CreateNewFolderOutlined";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {store} from "../store";
import {addFolderAction} from "../store/folderReducer";
import {addDoc, collection} from "firebase/firestore";
import {db} from "../firebase";

//
//  TODO    change folders for todos: localStorage => firebase
//

export default function FormDialog() {
    const dispatch = useDispatch()
    const [open, setOpen] = React.useState(false);
    const [folder, setFolder] = useState("")

    const changeFolderName = (e) => {
        setFolder(e.target.value)
    }
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleAddFolder = async (folder) => {
        const newFolder = {
            userId: store.getState().currentUser.user.userId,
            folderId: Date.now(),
            folderName: folder
        }
        dispatch(addFolderAction(newFolder))
        await addDoc(collection(db, "folders"), newFolder)
        setFolder('')
        handleClose()
    }

    return (
        <div className="inputFolderName">
            <Button sx={{fontSize: 16}}
                    onClick={handleClickOpen}
                    startIcon={
                        <CreateNewFolderOutlinedIcon/>
                    }
            >
                Add Folder
            </Button>

            <Dialog open={open} onClose={handleClose} fullWidth>
                <DialogTitle>Folder Name</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Folder name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={folder}
                        onChange={changeFolderName}

                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleClose()}>Cancel</Button>
                    <Button onClick={async () => handleAddFolder(folder)}>Add</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
