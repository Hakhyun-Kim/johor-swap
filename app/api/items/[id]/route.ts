import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

// Using the correct route segment config type
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const item = await prisma.item.findUnique({
      where: { id },
      include: {
        category: true,
        location: true,
        images: true,
        seller: {
          select: {
            id: true,
            name: true,
            location: true,
          },
        },
      },
    });

    if (!item) {
      return NextResponse.json(
        { error: 'Item not found' },
        { status: 404 }
      );
    }

    // Increment view count
    await prisma.item.update({
      where: { id },
      data: { views: { increment: 1 } },
    });

    return NextResponse.json(item);
  } catch (error) {
    console.error('Error fetching item:', error);
    return NextResponse.json(
      { error: 'Failed to fetch item' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const body = await request.json();
    const { title, description, price, condition, categoryId, locationId, status, images } = body;

    const item = await prisma.item.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(description && { description }),
        ...(price && { price: parseFloat(price) }),
        ...(condition && { condition }),
        ...(categoryId && { categoryId }),
        ...(locationId && { locationId }),
        ...(status && { status }),
        ...(images && {
          images: {
            deleteMany: {},
            create: images.map((url: string) => ({ url })),
          },
        }),
      },
      include: {
        category: true,
        location: true,
        images: true,
        seller: {
          select: {
            id: true,
            name: true,
            location: true,
          },
        },
      },
    });

    return NextResponse.json(item);
  } catch (error) {
    console.error('Error updating item:', error);
    return NextResponse.json(
      { error: 'Failed to update item' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    // Soft delete by updating status
    const item = await prisma.item.update({
      where: { id },
      data: { status: 'deleted' },
    });

    return NextResponse.json(item);
  } catch (error) {
    console.error('Error deleting item:', error);
    return NextResponse.json(
      { error: 'Failed to delete item' },
      { status: 500 }
    );
  }
} 