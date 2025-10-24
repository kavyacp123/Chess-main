import { useRef } from 'react';
import { useAuth } from '../hooks/useAuth';

export const LoginForm = () => {
  const guestName = useRef<HTMLInputElement>(null);
  const { loginWithGoogle, loginWithGithub, loginAsGuest, isLoading, error } = useAuth();

  const handleGuestLogin = () => {
    const name = guestName.current?.value || '';
    loginAsGuest({ name });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-textMain">
      <h1 className="text-4xl font-bold mb-8 text-center text-green-500 drop-shadow-lg">
        Enter the Game World
      </h1>
      
      {error && (
        <div className="mb-4 p-4 bg-red-500 text-white rounded-md">
          {error}
        </div>
      )}

      <div className="bg-bgAuxiliary2 rounded-lg shadow-lg p-8 flex flex-col md:flex-row">
        <div className="mb-8 md:mb-0 md:mr-8 justify-center flex flex-col">
          <button
            className="flex items-center justify-center px-4 py-2 rounded-md mb-4 cursor-pointer transition-colors hover:bg-gray-600 duration-300"
            onClick={loginWithGoogle}
            disabled={isLoading}
          >
            <img src="google.svg" alt="" className="w-6 h-6 mr-2" />
            Sign in with Google
          </button>
          <button
            className="flex items-center justify-center px-4 py-2 rounded-md cursor-pointer hover:bg-gray-600 transition-colors duration-300"
            onClick={loginWithGithub}
            disabled={isLoading}
          >
            <img src="github.svg" alt="" className="w-6 h-6 mr-2" />
            Sign in with Github
          </button>
        </div>
        
        <div className="flex flex-col items-center md:ml-8">
          <div className="flex items-center mb-4">
            <div className="bg-gray-600 h-1 w-12 mr-2"></div>
            <span className="text-gray-400">OR</span>
            <div className="bg-gray-600 h-1 w-12 ml-2"></div>
          </div>
          <input
            type="text"
            ref={guestName}
            placeholder="Username"
            className="border px-4 py-2 rounded-md mb-4 w-full md:w-64"
            disabled={isLoading}
          />
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors duration-300 disabled:opacity-50"
            onClick={handleGuestLogin}
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Enter as guest'}
          </button>
        </div>
      </div>
    </div>
  );
};
