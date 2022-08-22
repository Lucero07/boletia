import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from '@mui/icons-material/Delete';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { DialogContent, DialogContentText, IconButton } from "@mui/material";

export default function ConfirmDeletionDialog(props) {
  const { handleDelete, onChange, cardInfo } = props
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <span>
      <div style={{ display: 'flex', flexDirection: 'column', }}>
        <IconButton aria-label="delete" onClick={() => {
          handleClickOpen(true)
        }}>
          <DeleteIcon />
        </IconButton>
      </div>
      <Dialog open={open}
        onClose={handleClose}
        fullWidth
        maxWidth={'sm'}>
        <DialogTitle>Eliminar banner</DialogTitle>
        <DialogContent>
          <Alert severity="error">
            <AlertTitle>Precaución</AlertTitle>
            ¿Estas seguro que deseas eliminar este banner?
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button color='error' onClick={() => {
            handleDelete(cardInfo.id)
            handleClose()
          }} >Eliminar</Button>
        </DialogActions>
      </Dialog>
    </span>
  );
}
