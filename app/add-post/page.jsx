'use client'
import { useState } from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { Button, Container, FormControl, Typography } from "@mui/material";


export default function AddPost() {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleContentChange = (event) => {
        setContent(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            await fetch('/api/add-post', {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, content })
            });
            router.refresh();

        } catch (error) {
            console.error(error);
        }

        setTitle('');
        setContent('');
    };

    return (
        <Container>
            <Typography variant="h1">Add Post</Typography>
            <Button variant="contained">
                <Link href={'/'}>View Feed</Link>
            </Button>
            
                <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input 
                        type="text"
                        id="title"
                        value={title}
                        onChange={handleTitleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="content">Content:</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={handleContentChange}
                        required
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </Container>
    )
}
