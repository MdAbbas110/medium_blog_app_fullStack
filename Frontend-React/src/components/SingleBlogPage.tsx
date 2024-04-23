import { Avatar } from './BlogCards';
import Navbar from './Navbar';
import DOMPurify from 'dompurify';

interface BlogDetails {
  title: string;
  content: string;
  name: string;
}

const SingleBlogPage = ({ title, content, name }: BlogDetails) => {
  //function to display parse the raw html into an actual html page with stylings
  const renderHTML = (htmlString: any) => {
    const sanitizedHTML = DOMPurify.sanitize(htmlString);
    return { __html: sanitizedHTML };
  };
  return (
    <>
      <Navbar />
      <div className=" flex justify-center pt-20 mt-16 px-16">
        <div className="flex flex-col md:grid md:grid-cols-12 w-full max-w-screen-2xl ">
          <div className=" col-span-8 ">
            <h1 className="md:text-4xl 2xl font-extrabold">{title}</h1>
            <p className="text-slate-500 pt-2">{`posted on 2nd Dec 2023`}</p>
            <div
              className="py-10"
              dangerouslySetInnerHTML={renderHTML(content)}
            />
          </div>
          <div className="col-span-4 border border-slate-400 rounded-lg p-4">
            <h3 className="text-slate-600 text-lg">Author</h3>
            <div className="flex gap-4 items-center">
              <Avatar name={name} />
              <div>
                <h1 className="text-2xl font-medium">{name}</h1>
                <p className=" pt-3 text-slate-500">
                  Random catch phrase about the author. <br /> And ability to
                  write content and share knowledge
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleBlogPage;
