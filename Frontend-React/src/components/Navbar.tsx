import { Link } from 'react-router-dom';
import { Avatar } from './BlogCards';
import logo from '../assets/medium.png';

const Navbar = () => {
  return (
    <div className="w-full px-20 py-2 flex items-center justify-between border-b border-gray-400  ">
      <Link to={'/blogs'}>
        <img className="w-52 h-14" src={logo} alt="logo" />
      </Link>
      <div className="flex items-center gap-4">
        <Link to={'/publish'}>
          <button className="px-5 py-2 font-semibold text-lg rounded-xl text-white hover:bg-lime-800 bg-lime-600">
            Add Article
          </button>
        </Link>
        <Avatar name="LG" />
      </div>
    </div>
  );
};

export default Navbar;
