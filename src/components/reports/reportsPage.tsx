
const reports = () => {
 return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100 px-6">
      
      <div className="bg-white p-10 rounded-3xl shadow-2xl text-center max-w-xl w-full">
        
        {/* Icon */}
        <div className="text-6xl mb-6">🚧</div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          We'll Be Back Soon Reports!
        </h1>

        {/* Description */}
        <p className="text-gray-600 mb-6">
          Our system is currently undergoing scheduled maintenance.
          We’re working hard to improve your experience.
          Please check back later.
        </p>

        {/* Button */}
        <button
          onClick={() => window.location.reload()}
          className="bg-[#007aff] hover:bg-blue-600 text-white px-6 py-3 rounded-xl shadow-lg transition"
        >
          Refresh Page
        </button>

        {/* Footer Text */}
        <p className="text-sm text-gray-400 mt-6">
          Estimated downtime: 30 minutes
        </p>

      </div>
    </div>
  );
}

export default reports