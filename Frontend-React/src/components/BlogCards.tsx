import { Link } from 'react-router-dom';

interface BlogCardsProp {
  authorName: string;
  title: string;
  content: string;
  publishDate: string;
  id: number;
}

const BlogCards = ({
  authorName,
  title,
  content,
  publishDate,
  id,
}: BlogCardsProp) => {
  return (
    <Link to={`/blog/${id}`}>
      <div className="max-w-4xl  px-20 border-gray-600">
        <div className="flex flex-col cursor-pointer gap-3 py-5">
          <div className="flex gap-4 items-center">
            <Avatar name={authorName} />
            <div className="flex items-center gap-2">
              <h2 className=" capitalize text-base font-medium">
                {authorName}
              </h2>
              <div className="size-1 rounded-full bg-gray-500 "></div>
            </div>
            <h2 className="text-sm font-light">{publishDate}</h2>
          </div>
          <div className="max-w-2xl ">
            <h1 className="text-xl font-semibold">{`${
              title.length >= 80 ? title.slice(0, 80) + '...' : title
            }`}</h1>
            <p className=" text-slate-500 pt-2 font-normal">
              {content.slice(0, 120) + '...'}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-thin text-slate-500">{`${Math.ceil(
              content.length / 100
            )} minutes(s) read`}</h3>
          </div>
        </div>
        <div className="border-b border-gray-300 h-1 max-w-2xl"></div>
      </div>
    </Link>
  );
};

export const Avatar = ({ name }: { name: string }) => {
  return (
    <div className="size-10 grid place-items-center bg-gray-200 rounded-full">
      <span className="font-medium text-sm uppercase text-gray-600">{`${name[0]}${name[1]}`}</span>
    </div>
  );
};

export default BlogCards;
