'use client';
import { useState } from "react";
import Post from "./Post";
import AddPostModal from "./AddPostModal";
import { Container, Button, Grid, FormControl, Select, MenuItem, InputLabel, Typography } from "@mui/material";

export default function HomeClient({ posts }) {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    console.log(posts); // Debugging line to check data

    return (
        <Container sx={{ backgroundColor: '#1f1f1f', minHeight: '100vh', padding: '20px' }}>
            <Grid container justifyContent="space-between" alignItems="center" sx={{ marginBottom: 4 }}>
                <Grid item>
                    <FormControl variant="filled" sx={{ minWidth: 120, backgroundColor: '#a3a3a3', borderRadius: 3 }}>
                        <InputLabel sx={{ color: 'white' }}>All posts</InputLabel>
                        <Select defaultValue="" label="All posts" sx={{ color: 'white' }}>
                            <MenuItem value=""><em>All posts</em></MenuItem>
                            {/* Add options dynamically if needed */}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item>
                    <Button
                        variant="contained"
                        sx={{ backgroundColor: '#a3a3a3', color: 'black', borderRadius: 20, textTransform: 'none' }}
                        onClick={handleOpen}
                    >
                        New
                    </Button>
                </Grid>
            </Grid>

            <Grid container spacing={4}>
                {posts && posts.length > 0 ? (
                    posts.map((post) => (
                        <Grid item xs={12} sm={6} md={4} key={post.id}>
                            <Post
                                id={post.id}
                                title={post.title}
                                content={post.content}
                                authorName={post.author.name}
                            />
                        </Grid>
                    ))
                ) : (
                    <Typography variant="h6" color="textSecondary">
                        No posts available.
                    </Typography>
                )}
            </Grid>

            <AddPostModal open={open} onClose={handleClose} />
        </Container>
    );
}
