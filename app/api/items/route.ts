import { NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const condition = searchParams.get('condition');
    const location = searchParams.get('location');

    const where = {
      ...(category && { categoryId: category }),
      ...(condition && { condition }),
      ...(location && { locationId: location }),
      ...(minPrice && maxPrice && {
        price: {
          gte: parseFloat(minPrice),
          lte: parseFloat(maxPrice),
        },
      }),
      status: 'active',
    };

    const items = await prisma.item.findMany({
      where,
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
      orderBy: {
        createdAt: 'desc',
      },
    });

    return NextResponse.json(items);
  } catch (error) {
    console.error('Error fetching items:', error);
    return NextResponse.json(
      { error: 'Failed to fetch items' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, description, price, condition, categoryId, locationId, sellerId, images } = body;

    const item = await prisma.item.create({
      data: {
        title,
        description,
        price: parseFloat(price),
        condition,
        categoryId,
        locationId,
        sellerId,
        images: {
          create: images?.map((url: string) => ({ url })) || [],
        },
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
    console.error('Error creating item:', error);
    return NextResponse.json(
      { error: 'Failed to create item' },
      { status: 500 }
    );
  }
} 