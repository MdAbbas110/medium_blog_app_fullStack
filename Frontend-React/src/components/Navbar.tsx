import { Avatar } from './BlogCards';

const Navbar = () => {
  return (
    <div className="w-full px-20 py-2 flex items-center justify-between border-b border-gray-400  ">
      <div className="text-xl font-medium">Medium</div>
      <div className="flex items-center gap-4">
        <button className="px-4 py-1  text-base rounded-xl bg-lime-300">
          publish
        </button>
        <Avatar name="LG" />
      </div>
    </div>
  );
};

export default Navbar;
