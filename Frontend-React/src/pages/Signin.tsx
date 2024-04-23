import Auth from '../components/Auth';
import SignupQuote from '../components/SignupQuote';

const Signin = () => {
  return (
    <div className="relative">
      <div className=" bg-white bg-opacity-85 py-3 px-5 rounded-r-xl top-5 left-1/2 absolute">
        <p className="text-lime-500 font-medium underline">
          Quick login access:
        </p>
        <p className="text-base ">
          email:{' '}
          <span className="font-medium pl-1 underline">testuser@gmail.com</span>
        </p>
        <p className="text-base ">
          password:{' '}
          <span className="font-medium underline pl-2">testuser007</span>
        </p>
      </div>
      <div className="w-full md:grid flex flex-col md:grid-cols-2 ">
        <div className="">
          <Auth type="signin" />
        </div>
        <SignupQuote />
      </div>
    </div>
  );
};

export default Signin;
