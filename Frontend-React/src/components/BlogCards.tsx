interface BlogCardsProp {
  authorName: string;
  title: string;
  content: string;
  publishDate: string;
}

const BlogCards = ({
  authorName,
  title,
  content,
  publishDate,
}: BlogCardsProp) => {
  return (
    <div className="w-full my-10 p-20 border-gray-600">
      <div className="border-b border-gray-300 py-5">
        <div className="flex gap-4 items-center">
          <Avatar name={authorName} />
          <div className="flex items-center gap-2">
            <h2>{authorName}</h2>
            <div className="size-1 rounded-full bg-gray-500 "></div>
          </div>
          <h2>{publishDate}</h2>
        </div>
        <div className="max-w-xl ">
          <h1 className="text-xl font-semibold">{title}</h1>
          <p className=" text-slate-500 font-normal">
            {content.slice(0, 100) + '...'}
          </p>
        </div>
        <div>
          <h3 className="text-sm font-thin text-slate-500">{`${Math.ceil(
            content.length / 100
          )} minutes(s) read`}</h3>
        </div>
      </div>
    </div>
  );
};

const Avatar = ({ name }: { name: string }) => {
  return (
    <div className="size-10 grid place-items-center bg-gray-200 rounded-full">
      <span className="font-medium text-sm uppercase text-gray-600">{`${name[0]}${name[1]}`}</span>
    </div>
  );
};

export default BlogCards;
