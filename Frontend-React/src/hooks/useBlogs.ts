import axios from 'axios';
import { useEffect, useState } from 'react';
import { BACKEND_URL } from '../config';

interface Blog {
  id: number;
  tiitle: string;
  content: string;
  author: {
    name: string;
  };
}

const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await axios.get(`${BACKEND_URL}api/v1/blog/bulk`, {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      });
      if (res.data.blog) {
        setBlogs(res.data.blog);
        setLoading(false);
      } else {
        alert('something went wrong');
      }
    };
    fetchBlogs();
  }, []);

  return { loading, blogs };
};

export default useBlogs;
