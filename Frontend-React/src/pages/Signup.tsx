import Auth from '../components/Auth';
import SignupQuote from '../components/SignupQuote';

const Signup = () => {
  return (
    <div className="w-full grid grid-cols-2 ">
      <div className="">
        <Auth />
      </div>
      <SignupQuote />
    </div>
  );
};

export default Signup;
