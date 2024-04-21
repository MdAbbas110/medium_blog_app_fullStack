import { Link } from 'react-router-dom';
import { ChangeEvent, useState } from 'react';
import { Signup } from 'abbas110-zod-validations';

const Auth = ({ type }: { type: 'signup' | 'signin' }) => {
  const [postInputs, setPostInputs] = useState<Signup>({
    name: '',
    username: '',
    password: '',
  });

  return (
    <div className="h-screen flex justify-center items-center w-full">
      {JSON.stringify(postInputs)}
      <div>
        <h1 className="text-3xl font-bold  tracking-wide">
          Create a fresh account{' '}
        </h1>
        <p className="text-center text-gray-700 tracking-wide text-lg font-normal pt-2">
          Already have an account?{' '}
          <Link to={'/signin'} className="font-medium cursor-pointer underline">
            Login
          </Link>
        </p>
      </div>
      <InputFields
        label="Name"
        placeholder="First name"
        onChange={(e) =>
          setPostInputs({
            ...postInputs,
            name: e.target.name,
          })
        }
      />
    </div>
  );
};

const InputFields = ({
  label,
  placeholder,
  onChange,
}: {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {label}
      </label>
      <input
        onChange={onChange}
        type="text"
        id="first_name"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        required
      />
    </div>
  );
};

export default Auth;
