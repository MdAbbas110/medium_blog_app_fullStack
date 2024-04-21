import { Link, useNavigate } from 'react-router-dom';
import { ChangeEvent, useState } from 'react';
import { Signup } from 'abbas110-zod-validations';
import axios from 'axios';
import { BACKEND_URL } from '../config';
import toast, { Toaster } from 'react-hot-toast';

const Auth = ({ type }: { type: 'signup' | 'signin' }) => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<Signup>({
    name: '',
    username: '',
    password: '',
  });

  async function sendRequest() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}api/v1/user${type === 'signup' ? '/signup' : '/signin'}`,
        postInputs
      );
      console.log(response);
      toast.success('Successfully toasted!');

      const jwt = response.data;
      localStorage.setItem('token', jwt);
      navigate('/blogs');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="h-screen flex flex-col justify-center  w-full">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold  tracking-wide">
          {type === 'signup'
            ? 'Create a fresh account'
            : 'Login to you account'}
        </h1>
        <p className="text-center text-gray-700 tracking-wide text-lg font-normal pt-2">
          {type === 'signup'
            ? 'Already have an account?'
            : 'Need to create account?'}
          <Link
            to={type === 'signup' ? '/signin' : '/signup'}
            className="font-medium tracking-tight cursor-pointer underline"
          >
            {type === 'signup' ? ' Login now' : ' Signup now'}
          </Link>
        </p>
      </div>
      <div className="w-full">
        <div className="max-w-lg flex flex-col gap-8 px-4 pt-10 mx-auto">
          <div className={`${type === 'signin' ? 'hidden' : 'block'}`}>
            <InputFields
              label="Name"
              placeholder="First name"
              onChange={(e) =>
                setPostInputs({
                  ...postInputs,
                  name: e.target.value,
                })
              }
            />
          </div>
          <InputFields
            label="Username"
            placeholder="unique name"
            onChange={(e) =>
              setPostInputs({
                ...postInputs,
                username: e.target.value,
              })
            }
          />
          <InputFields
            label="Password"
            type={'password '}
            placeholder="*******"
            onChange={(e) =>
              setPostInputs({
                ...postInputs,
                password: e.target.value,
              })
            }
          />
          <button
            onClick={sendRequest}
            type="button"
            className="text-white bg-black hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300 rounded-lg text-md font-medium transition-all px-5 py-2.5 me-2 mb-2  "
          >
            {type === 'signup' ? 'Signup' : 'Signin'}
          </button>
          <Toaster position="top-center" reverseOrder={false} />
        </div>
      </div>
    </div>
  );
};

const InputFields = ({
  label,
  placeholder,
  onChange,
  type,
}: {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}) => {
  return (
    <div>
      <label className="block mb-2 text-md font-medium text-black">
        {label}
      </label>
      <input
        onChange={onChange}
        type={type || 'text'}
        id="first_name"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        placeholder={placeholder}
        required
      />
    </div>
  );
};

export default Auth;
