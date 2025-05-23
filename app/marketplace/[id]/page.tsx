import Link from 'next/link';
import Image from 'next/image';
// import { prisma } from '@/app/lib/prisma'; // Removed unused import

// Define minimal types
interface Image { id?: string; url: string; }
interface Seller { name: string; location?: { name: string } | null }
interface Item {
  id: string;
  title: string;
  description: string;
  price: number;
  condition: string;
  category: { name: string };
  location: { name: string };
  images: Image[];
  createdAt: string;
  seller: Seller;
}

async function getItem(id: string): Promise<Item> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/items/${id}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch item');
  return res.json();
}

export default async function ItemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await getItem(id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <Link href="/marketplace" className="text-blue-600 hover:text-blue-700">
          ← Back to Marketplace
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Images */}
        <div className="space-y-4">
          <div className="relative h-96 w-full">
            <Image
              src={item.images[0]?.url || '/placeholder.png'}
              alt={item.title}
              fill
              className="object-cover rounded-t-lg"
              priority
            />
          </div>
          {item.images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {item.images.slice(1).map((image: Image, index: number) => (
                <div key={image.id || image.url} className="relative h-24 w-24">
                  <Image
                    src={image.url}
                    alt={`${item.title} - Image ${index + 1}`}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{item.title}</h1>
          <p className="text-2xl font-bold text-blue-600 mb-4">RM {item.price}</p>

          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-2">Description</h2>
              <p className="text-gray-600 whitespace-pre-wrap">{item.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Condition</h3>
                <p className="mt-1 capitalize">{item.condition}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Category</h3>
                <p className="mt-1">{item.category.name}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Location</h3>
                <p className="mt-1">{item.location.name}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Listed</h3>
                <p className="mt-1">{new Date(item.createdAt).toLocaleDateString()}</p>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">Seller Information</h2>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="font-medium">{item.seller.name}</p>
                <p className="text-gray-600">{item.seller.location?.name}</p>
              </div>
            </div>

            <div className="flex space-x-4">
              <button className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                Contact Seller
              </button>
              <button className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition">
                Save Item
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 