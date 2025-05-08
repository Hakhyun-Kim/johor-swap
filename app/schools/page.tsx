import Link from 'next/link';

export default function SchoolsPage() {
  const schools = [
    {
      name: "International School 1",
      type: "International School",
      location: "Tebrau",
      description: "Leading international school with Korean language program",
      features: ["Korean Language Program", "IB Curriculum", "Sports Facilities"],
    },
    {
      name: "International School 2",
      type: "International School",
      location: "Mount Austin",
      description: "Modern international school with strong academic focus",
      features: ["Korean Language Program", "Cambridge Curriculum", "Arts Program"],
    },
    {
      name: "Korean School",
      type: "Korean School",
      location: "Sutera",
      description: "Dedicated Korean school with comprehensive curriculum",
      features: ["Full Korean Curriculum", "English Program", "Cultural Activities"],
    },
  ];

  const forumTopics = [
    {
      title: "School Bus Service Information",
      author: "Parent1",
      replies: 12,
      lastUpdate: "2 hours ago",
    },
    {
      title: "After-school Activities for Korean Students",
      author: "Teacher1",
      replies: 8,
      lastUpdate: "5 hours ago",
    },
    {
      title: "School Uniform Exchange Program",
      author: "Parent2",
      replies: 15,
      lastUpdate: "1 day ago",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">International Schools in Johor</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Find information about international schools, connect with other parents, 
          and share resources within the Korean community.
        </p>
      </div>

      {/* Schools Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Featured Schools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {schools.map((school, index) => (
            <div key={index} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{school.name}</h3>
                    <p className="text-sm text-gray-500">{school.type}</p>
                  </div>
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    {school.location}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{school.description}</p>
                <div className="space-y-2">
                  {school.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <Link
                    href={`/schools/${school.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Community Forum Section */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Community Forum</h2>
          <Link
            href="/schools/forum/new"
            className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700"
          >
            New Topic
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="divide-y divide-gray-200">
            {forumTopics.map((topic, index) => (
              <div key={index} className="p-6 hover:bg-gray-50 transition">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold mb-1">{topic.title}</h3>
                    <p className="text-sm text-gray-500">
                      Posted by {topic.author} • {topic.lastUpdate}
                    </p>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    {topic.replies} replies
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Resources Section */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">Helpful Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-semibold mb-2">School Bus Services</h3>
            <p className="text-gray-600 mb-4">Information about school bus routes and schedules</p>
            <Link href="/schools/resources/bus" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Learn More →
            </Link>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-semibold mb-2">After-School Programs</h3>
            <p className="text-gray-600 mb-4">List of available after-school activities and programs</p>
            <Link href="/schools/resources/programs" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Learn More →
            </Link>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-semibold mb-2">Parent Guide</h3>
            <p className="text-gray-600 mb-4">Essential information for new parents in Johor</p>
            <Link href="/schools/resources/guide" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Learn More →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 