import Link from 'next/link';
import Image from 'next/image';
// import { prisma } from '@/app/lib/prisma'; // Removed unused import

// Define minimal types
interface Category { id: string; name: string; }
interface Location { id: string; name: string; }
interface Item {
  id: string;
  title: string;
  description: string;
  price: number;
  condition: string;
  category: Category;
  location: Location;
  images: { url: string }[];
}

async function getCategories() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
}

async function getLocations() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/locations`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch locations');
  return res.json();
}

async function getItems(searchParams: { [key: string]: string | string[] | undefined }) {
  const params = new URLSearchParams();
  if (searchParams.category) params.append('category', searchParams.category as string);
  if (searchParams.minPrice) params.append('minPrice', searchParams.minPrice as string);
  if (searchParams.maxPrice) params.append('maxPrice', searchParams.maxPrice as string);
  if (searchParams.condition) params.append('condition', searchParams.condition as string);
  if (searchParams.location) params.append('location', searchParams.location as string);

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/items?${params.toString()}`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch items');
  return res.json();
}

export default async function MarketplacePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  const [items, categories, locations] = await Promise.all([
    getItems(resolvedSearchParams),
    getCategories(),
    getLocations(),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Marketplace</h1>
          <p className="text-gray-600">Browse second-hand items in Johor</p>
        </div>
        <Link
          href="/sell"
          className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700"
        >
          Sell Item
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Filters</h2>
            
            {/* Categories */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Categories</h3>
              <div className="space-y-2">
                {categories.map((category: Category) => (
                  <label key={category.id} className="flex items-center">
                    <input
                      type="checkbox"
                      name="category"
                      value={category.id}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">{category.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Price Range (RM)</h3>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  name="minPrice"
                  placeholder="Min"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                />
                <input
                  type="number"
                  name="maxPrice"
                  placeholder="Max"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                />
              </div>
            </div>

            {/* Condition */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Condition</h3>
              <div className="space-y-2">
                {['new', 'like-new', 'good', 'fair'].map((condition) => (
                  <label key={condition} className="flex items-center">
                    <input
                      type="checkbox"
                      name="condition"
                      value={condition}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-600 capitalize">{condition}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Location</h3>
              <div className="space-y-2">
                {locations.map((location: Location) => (
                  <label key={location.id} className="flex items-center">
                    <input
                      type="checkbox"
                      name="location"
                      value={location.id}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-600">{location.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
            >
              Apply Filters
            </button>
          </div>
        </div>

        {/* Items Grid */}
        <div className="lg:col-span-3">
          {/* Search Bar */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search items..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item: Item) => (
              <Link
                key={item.id}
                href={`/marketplace/${item.id}`}
                className="bg-white rounded-lg shadow hover:shadow-lg transition"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={item.images[0]?.url || '/placeholder.png'}
                    alt={item.title}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-1">{item.title}</h3>
                  <p className="text-gray-600 text-sm mb-2 line-clamp-2">{item.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-blue-600">RM {item.price}</span>
                    <span className="text-sm text-gray-500 capitalize">{item.condition}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {items.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No items found matching your criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 