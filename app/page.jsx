import prisma from "@/lib/prisma";
import Post from "./components/Post";
import Link from "next/link";
import { Container, Typography, Button } from "@mui/material";

async function getPosts() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    include: {
      author: {
        select:{name: true}
      }
    }
  })
  return posts;
}

export default async function Home() {
  const posts = await getPosts();
  return (
    <Container>
      <Typography variant="h1">Feed</Typography>
      <Button variant="contained">
        <Link href={'/add-post'}>Add Post</Link> 
      </Button>

    {
      posts.map((post) => {
        return (
          <Post
            key={post.id}
            id={post.id}
            title={post.title}
            content={post.content}
            authorName={post.author.name}
          />
        )
      })
    }
  </Container>
  );
}
