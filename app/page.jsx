import prisma from '@/lib/prisma';
import HomeClient from './components/HomeClient'; // Ensure the path is correct

async function getPosts() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    include: { author: { select: { name: true } } },
  });
  return posts;
}

export default async function Home() {
  const posts = await getPosts();
  return <HomeClient posts={posts} />;
}
