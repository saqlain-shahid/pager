import React from 'react'
import {Dialog, DialogTitle, DialogContent,DialogActions, Button, DialogContentText} from '@mui/material'

const ConfirmDeleteDialog = ({open, handleClose, deleteHandler}) => {
  return (
    <Dialog open={open} onClose={handleClose} >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
            <DialogContentText>Are you sure? You want to delete this group?</DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>No</Button>
            <Button onClick={deleteHandler}>Yes</Button>
        </DialogActions>
    </Dialog>
  )
}

export default ConfirmDeleteDialog