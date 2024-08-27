import prisma from '@/lib/prisma';
import HomeClient from './components/HomeClient';
import { formatDateTime } from '@/utils/formatDateTime';

async function getPosts() {
  try {
    const posts = await prisma.post.findMany({
      include: { author: { select: { name: true } } },
    });

    return posts.map(post => ({
      ...post,
      authorName: post.author ? post.author.name : 'Unknown', // Handle null author
      createdAt: formatDateTime(post.createdAt),
      updatedAt: formatDateTime(post.updatedAt),
      deletedAt: post.deletedAt ? formatDateTime(post.deletedAt) : null,
    }));
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export default async function Home() {
  const posts = await getPosts();
  return <HomeClient posts={posts} />;
}

