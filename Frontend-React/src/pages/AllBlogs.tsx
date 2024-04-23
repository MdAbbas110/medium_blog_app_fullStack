import BlogCards from '../components/BlogCards';
import BlogScletons from '../components/BlogScletons';
import Navbar from '../components/Navbar';
import useBlogs from '../hooks/useBlogs';

const AllBlogs = () => {
  const { loading, blogs } = useBlogs();

  if (loading) {
    return (
      <div className="flex justify-center flex-col gap-5">
        <Navbar />
        <BlogScletons />
        <BlogScletons />
        <BlogScletons />
        <BlogScletons />
      </div>
    );
  }
  return (
    <>
      <Navbar />
      <div className="flex justify-center">
        <div className="my-10 flex flex-col gap-5">
          {blogs.map((blog) => {
            return (
              <div key={blog.id}>
                <BlogCards
                  id={blog.id}
                  authorName={blog.author.name || 'Anonymous'}
                  title={blog.tiitle}
                  content={blog.content}
                  publishDate={'12/12/2020'}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default AllBlogs;
