import { Link } from 'react-router-dom';
import { Avatar } from './BlogCards';
import logo from '../assets/medium.png';

const Navbar = () => {
  return (
    <div className="w-full px-20 py-2 flex items-center justify-between border-b border-gray-400  ">
      <Link to={'/blogs'}>
        <img className="md:w-52 w-32 h-9 md:h-14" src={logo} alt="logo" />
      </Link>
      <div className="flex items-center gap-4">
        <Link to={'/publish'}>
          <button className="md:px-5 px-3 py-2 font-semibold text-lg rounded-xl text-white hover:bg-lime-800 bg-lime-600">
            Add Article
          </button>
        </Link>
        <Avatar name="LG" />
      </div>
    </div>
  );
};

export default Navbar;
