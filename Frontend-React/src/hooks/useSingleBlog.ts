import axios from 'axios';
import { useEffect, useState } from 'react';
import { BACKEND_URL } from '../config';

interface SingBlog {
  id: number;
  tiitle: string;
  content: string;
  author: {
    name: string;
  };
}

const useSingleBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [singleBlog, setSingleBlog] = useState<SingBlog[]>([]);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}api/v1/blog/${id}`, {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        });
        setSingleBlog(res.data.blog);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlog();
  }, []);

  return {
    loading,
    singleBlog,
  };
};

export default useSingleBlog;
