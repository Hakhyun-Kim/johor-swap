import Link from 'next/link';

export default function MyItemsPage() {
  // Sample data - this would come from the database in a real app
  const myItems = [
    {
      id: 1,
      title: "Samsung TV 55-inch",
      price: 1200,
      status: "active",
      views: 45,
      createdAt: "2024-03-15",
      image: "/placeholder.jpg",
    },
    {
      id: 2,
      title: "IKEA Bookshelf",
      price: 150,
      status: "sold",
      views: 89,
      createdAt: "2024-03-10",
      image: "/placeholder.jpg",
    },
    {
      id: 3,
      title: "Gaming Chair",
      price: 300,
      status: "active",
      views: 23,
      createdAt: "2024-03-18",
      image: "/placeholder.jpg",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Items</h1>
          <p className="text-gray-600">Manage your listings and track their performance</p>
        </div>
        <Link
          href="/sell"
          className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700"
        >
          List New Item
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Active Listings</h3>
          <p className="text-2xl font-bold text-blue-600">2</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Total Views</h3>
          <p className="text-2xl font-bold text-blue-600">157</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Items Sold</h3>
          <p className="text-2xl font-bold text-blue-600">1</p>
        </div>
      </div>

      {/* Items List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="divide-y divide-gray-200">
          {myItems.map((item) => (
            <div key={item.id} className="p-6 hover:bg-gray-50 transition">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0">
                    {/* Item image would go here */}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    <p className="text-gray-600 text-sm mb-1">Listed on {item.createdAt}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{item.views} views</span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {item.status}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="font-bold text-blue-600">RM {item.price}</span>
                  <div className="flex space-x-2">
                    <button className="text-gray-600 hover:text-blue-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button className="text-gray-600 hover:text-red-600">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 