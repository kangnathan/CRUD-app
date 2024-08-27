'use client';
import { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, CircularProgress, Typography } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import EditIcon from '@mui/icons-material/Edit';


export default function EditPostButton({ postId, initialTitle, initialContent }) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState(initialTitle);
    const [content, setContent] = useState(initialContent);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setTitle(initialTitle);
        setContent(initialContent);
        setOpen(false);
    };

    const handleSave = async () => {
        setIsLoading(true);
        setError('');

        try {
            await axios.put(`/api/post/${postId}`, { title, content });
            router.refresh(); 
            handleClose();
        } catch (error) {
            console.error("Failed to update the post:", error.response?.data || error.message);
            setError(error.response?.data?.message || 'Failed to update the post. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <EditIcon style={{ color: 'white' }} onClick={handleClickOpen}></EditIcon>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="edit-post-dialog-title"
                aria-describedby="edit-post-dialog-description"
                PaperProps={{
                style: {
                    borderRadius: '25px',
                    backgroundColor: "#d9d9d9",
                    padding: "15px 20px 15px 20px"
                }
            }}
            >
                <DialogTitle id="edit-post-dialog-title">Edit Post</DialogTitle>
                <DialogContent id="edit-post-dialog-description">
                    {error && <Typography color="error">{error}</Typography>}
                    <TextField
                        
                        margin="dense"
                        label="Title"
                        type="text"
                        fullWidth
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Content"
                        type="text"
                        fullWidth
                        multiline
                        rows={4}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} style={{
                            marginRight: "15px",
                            color: "black",
                            borderRadius:"20px"
                        }}  disabled={isLoading}>
                        Cancel
                    </Button>
                    <Button onClick={handleSave} variant='contained' size='small'style={{
                            marginRight: "15px",
                            backgroundColor: "#cd733b",
                            borderRadius:"20px"
                        }} disabled={isLoading}>
                        {isLoading ? <CircularProgress size={24} /> : 'Save'}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
