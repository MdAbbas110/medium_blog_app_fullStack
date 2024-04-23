import { useParams } from 'react-router-dom';
import useSingleBlog from '../hooks/useSingleBlog';
import SingleBlogPage from '../components/SingleBlogPage';
import Spinner from '../components/Spinner';
import Navbar from '../components/Navbar';

const Blog = () => {
  const { id } = useParams();
  const { loading, singleBlog } = useSingleBlog({
    id: id || '',
  });

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="h-full pt-10 flex justify-center ">
          <div className="flex justify-center">
            <Spinner />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <SingleBlogPage
        name={singleBlog.author.name}
        title={singleBlog.tiitle}
        content={singleBlog.content}
      />
    </div>
  );
};

export default Blog;
