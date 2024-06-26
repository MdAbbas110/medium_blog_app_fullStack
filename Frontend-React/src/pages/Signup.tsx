import Auth from '../components/Auth';
import SignupQuote from '../components/SignupQuote';

const Signup = () => {
  return (
    <div className="w-full md:grid flex flex-col md:grid-cols-2 ">
      <div className="">
        <Auth type="signup" />
      </div>
      <SignupQuote />
    </div>
  );
};

export default Signup;
