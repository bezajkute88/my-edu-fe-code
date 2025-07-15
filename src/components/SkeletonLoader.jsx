function SkeletonLoader() {
  return (
    <div className="bg-white rounded-xl border border-border shadow-card overflow-hidden animate-pulse">
      <div className="relative pt-[66.67%] bg-gray-200" />
      <div className="p-6 space-y-4">
        <div className="h-6 bg-gray-200 rounded w-3/4" />
        <div className="h-8 bg-gray-200 rounded w-1/3" />
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
        </div>
        <div className="h-10 bg-gray-200 rounded-lg mt-4" />
      </div>
    </div>
  );
}

export default SkeletonLoader; 