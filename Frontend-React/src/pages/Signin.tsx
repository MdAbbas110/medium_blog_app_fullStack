import Auth from '../components/Auth';
import SignupQuote from '../components/SignupQuote';

const Signin = () => {
  return (
    <div>
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
