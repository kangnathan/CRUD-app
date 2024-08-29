import prisma from '@/lib/prisma';
import HomeClient from './components/HomeClient';
import { formatDateTime } from '@/utils/formatDateTime';

// Fetch posts with filtering parameters
async function getPosts({ startDate, endDate, showDeleted }) {
  try {
    const posts = await prisma.post.findMany({
      where: {
        AND: [
          {
            createdAt: {
              gte: startDate ? new Date(startDate) : undefined,
            },
          },
          {
            createdAt: {
              lte: endDate ? new Date(endDate) : undefined,
            },
          },
          {
            deletedAt: showDeleted === 'show' ? { not: null } : null,
          },
        ],
      },
      include: { author: { select: { name: true } } },
    });

    return posts.map(post => ({
      ...post,
      authorName: post.author ? post.author.name : 'Unknown',
      createdAt: formatDateTime(post.createdAt),
      updatedAt: formatDateTime(post.updatedAt),
      deletedAt: post.deletedAt ? formatDateTime(post.deletedAt) : null,
    }));
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export default async function Home({ searchParams }) {
  const { startDate, endDate, showDeleted } = searchParams;
  const posts = await getPosts({ startDate, endDate, showDeleted });
  return <HomeClient posts={posts} startDate={startDate} endDate={endDate} showDeleted={showDeleted} />;
}
