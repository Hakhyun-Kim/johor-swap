import Link from 'next/link';

export default function LocalInfoPage() {
  const categories = [
    {
      title: "Korean Restaurants",
      items: [
        { name: "Restaurant 1", description: "Authentic Korean BBQ", location: "Tebrau" },
        { name: "Restaurant 2", description: "Korean Street Food", location: "Mount Austin" },
        { name: "Restaurant 3", description: "Traditional Korean Cuisine", location: "Sutera" },
      ],
    },
    {
      title: "Korean Grocery Stores",
      items: [
        { name: "Store 1", description: "Full range of Korean ingredients", location: "Tebrau" },
        { name: "Store 2", description: "Korean snacks and beverages", location: "Mount Austin" },
        { name: "Store 3", description: "Fresh Korean produce", location: "Sutera" },
      ],
    },
    {
      title: "Korean Services",
      items: [
        { name: "Service 1", description: "Korean Hair Salon", location: "Tebrau" },
        { name: "Service 2", description: "Korean Language Classes", location: "Mount Austin" },
        { name: "Service 3", description: "Korean Medical Clinic", location: "Sutera" },
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">Local Information for Korean Residents</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover the best Korean restaurants, grocery stores, and services in Johor. 
          All recommendations are verified by our community members.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search places..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="">All Areas</option>
            <option value="tebrau">Tebrau</option>
            <option value="mount-austin">Mount Austin</option>
            <option value="sutera">Sutera</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option value="">All Categories</option>
            <option value="restaurants">Restaurants</option>
            <option value="grocery">Grocery Stores</option>
            <option value="services">Services</option>
          </select>
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-12">
        {categories.map((category, index) => (
          <div key={index}>
            <h2 className="text-2xl font-bold mb-6">{category.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.items.map((item, itemIndex) => (
                <div key={itemIndex} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
                  <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {item.location}
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      View Details
                    </button>
                    <button className="text-gray-600 hover:text-gray-700 text-sm">
                      Save
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Add New Place Button */}
      <div className="fixed bottom-8 right-8">
        <Link
          href="/local-info/add"
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
        </Link>
      </div>
    </div>
  );
} 