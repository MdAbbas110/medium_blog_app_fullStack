const BlogScletons = () => {
  return (
    <div className=" w-full">
      <div className="max-w-3xl mx-auto px-20 border-gray-600">
        <div className="flex flex-col cursor-pointer gap-3 py-5">
          <div className="flex gap-4 items-center">
            {/* Avatar Placeholder */}
            <div className="w-12 h-12 rounded-full bg-gray-300"></div>
            <div className="flex items-center gap-2">
              {/* Author Name Placeholder */}
              <div className="w-24 h-4 bg-gray-300"></div>
              <div className="size-1 rounded-full bg-gray-300"></div>
            </div>
            {/* Publish Date Placeholder */}
            <div className="w-16 h-4 bg-gray-300"></div>
          </div>
          <div className="max-w-2xl">
            {/* Title Placeholder */}
            <div className="w-11/12 h-8 bg-gray-300 mb-2"></div>
            {/* Content Placeholder */}
            <div className="w-full h-12 bg-gray-300"></div>
          </div>
          <div>
            {/* Read Time Placeholder */}
            <div className="w-20 h-4 bg-gray-300"></div>
          </div>
        </div>
        <div className="border-b border-lime-300 h-1 max-w-2xl"></div>
      </div>
    </div>
  );
};

export default BlogScletons;
