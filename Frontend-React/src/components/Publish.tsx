import { useRef, useState, ChangeEvent } from 'react';
import JoditEditor from 'jodit-react';
import Navbar from './Navbar';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import { useNavigate } from 'react-router-dom';

const Publish = () => {
  const editor = useRef<any>(null); // Use 'any' type for editor ref if no specific type is available
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [timer, setTimer] = useState(0);
  const navigate = useNavigate();
  const [disable, setDisable] = useState(false);
  const [emptyInput, setEmptyInput] = useState('');

  const joditConfig = {
    placeholder: `Bring up what's in your mind...`,
    height: '500px',
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    if (timer) {
      clearTimeout(timer);
    }

    const hold = setTimeout(() => {
      setTitle(value);
    }, 1000);

    setTimer(hold);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (title.length <= 10 || content.length <= 20) {
      return setEmptyInput('Title needs to be at least five words');
    } else {
      setDisable(true);
      const postData = await axios.post(
        `${BACKEND_URL}api/v1/blog`,
        {
          tiitle: title,
          content,
        },
        {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        }
      );
      setDisable(false);
      navigate(`/blog/${postData.data.blogID}`);
    }
  };

  return (
    <div className="w-full h-full">
      <Navbar />
      <form onSubmit={handleSubmit} className="flex py-12 justify-center px-10">
        <div className="flex flex-col gap-10">
          <div>
            <label className="text-lg">Title for blog</label>
            <div className="w-full mt-3 px-3 rounded-lg border border-lime-700">
              <input
                placeholder="Blog Title"
                className="py-3 focus:outline-none px-4 w-full"
                type="text"
                onChange={handleChange}
              />
            </div>
            <p className=" text-red-700 font-medium">{emptyInput}</p>
          </div>
          <div>
            <JoditEditor
              config={joditConfig}
              ref={(ref: any) => (editor.current = ref)}
              value={content}
              onBlur={(newContent: string) => setContent(newContent)}
            />
            <p className=" text-red-700 font-medium">{emptyInput}</p>
          </div>
          <div>
            <button
              disabled={disable}
              className="px-6 py-3  text-base rounded-xl inline-block text-white hover:bg-lime-800 bg-lime-600"
              type="submit"
            >
              Publish Article
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Publish;
