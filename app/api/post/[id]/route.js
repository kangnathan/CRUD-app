import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"; // Correct import, no need to redefine

export async function DELETE(request, { params }) {
    const id = params.id;

    try {
        const post = await prisma.post.delete({
            where: { id },
        });

        return NextResponse.json(post);
    } catch (error) {
        console.error("Error deleting post:", error);
        return NextResponse.json({ error: "Post not found or deletion failed" }, { status: 404 });
    }
}

export async function PUT(request, { params }) {
    const id = params.id;

    try {
        const { title, content } = await request.json();

        const updatedPost = await prisma.post.update({
            where: { id },
            data: { 
                title, 
                content: content ?? null, 
            },
        });

        return NextResponse.json(updatedPost);
    } catch (error) {
        console.error("Error updating post:", error);
        return NextResponse.json({ error: "Post not found or update failed" }, { status: 404 });
    }
}
