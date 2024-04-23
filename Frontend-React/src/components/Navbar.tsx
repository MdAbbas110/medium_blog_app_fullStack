import { Link } from 'react-router-dom';
import { Avatar } from './BlogCards';

const Navbar = () => {
  return (
    <div className="w-full px-20 py-2 flex items-center justify-between border-b border-gray-400  ">
      <Link to={'/blogs'}>
        <div className="text-xl cursor-pointer font-medium">Medium</div>
      </Link>
      <div className="flex items-center gap-4">
        <Link to={'/publish'}>
          <button className="px-4 py-1  text-base rounded-xl text-white hover:bg-lime-800 bg-lime-600">
            Add Article
          </button>
        </Link>
        <Avatar name="LG" />
      </div>
    </div>
  );
};

export default Navbar;
