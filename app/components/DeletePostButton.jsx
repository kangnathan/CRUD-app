'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, CircularProgress, Typography } from '@mui/material';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

export default function DeletePostButton({ postId }) {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = async () => {
        setIsLoading(true); // Set loading state to true
        setError(''); // Reset error message

        try {
            const response = await fetch(`/api/post/${postId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete the post'); // Throw error if response is not OK
            }

            router.refresh(); // Refresh the page to reflect the changes
            handleClose(); // Close the confirmation dialog
        } catch (e) {
            console.error('Failed to delete the post:', e);
            setError('Failed to delete the post. Please try again.'); 
        } finally {
            setIsLoading(false); // Set loading state to false
        }
    };

    return (
        <>
            <DeleteRoundedIcon onClick={handleClickOpen} style={{ color: 'white' }}></DeleteRoundedIcon>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        borderRadius: '25px',
                        backgroundColor: "#d9d9d9",
                        padding: "8px 13px 8px 13px"
                    },
                }}
            >
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    {error && <Typography color="error">{error}</Typography>}
                        <Typography >Are you sure you want to delete this post?</Typography>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose} style={{ color: "black", borderRadius:"20px" }}>
                        Cancel
                    </Button>
                    <Button
                        onClick={handleDelete}
                        variant='contained'
                        size='small'
                        style={{
                            marginRight: "15px",
                            backgroundColor: "#d45555",
                            borderRadius:"20px"
                        }}
                        disabled={isLoading}
                    >
                        {isLoading ? <CircularProgress size={24} /> : 'Delete'}
                    </Button>
                </DialogActions>
            </Dialog>

        </>
    );
}
