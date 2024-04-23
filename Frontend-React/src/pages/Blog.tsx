import { useParams } from 'react-router-dom';
import useSingleBlog from '../hooks/useSingleBlog';
import SingleBlogPage from '../components/SingleBlogPage';

const Blog = () => {
  const { id } = useParams();
  const { loading, singleBlog } = useSingleBlog({
    id: id || '',
  });

  if (loading) {
    return <h1>Loading</h1>;
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
