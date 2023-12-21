import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

const tweets_api_base_url = 'http://localhost:8082';

interface GoogleOauthResponse {
  credential?: string;
}

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginGoogleSuccess = (response: GoogleOauthResponse) => {
    console.log('response google success:', response);

    // TODO: integrate with backend to save user google credential
    
    // If user is valid, save the token and redirect to home page
  };


  return (
    <div className="flex h-screen">
        {/* Gambar di sisi kiri */}
        <div className="hidden lg:block lg:w-[600px]">
          <img
            className="object-cover w-full h-full"
            src="https://i.ibb.co/DwrGFTb/login.png"
            alt="Background"
          />
        </div>
  
        {/* Form login di sisi kanan */}
        <div className="w-full lg:w-[400px] my-auto">
          <form className="ps-10 pb-3 mt-3">
          <img 
            src="https://i.ibb.co/17Y3jJC/kotak.png" 
            alt="kotak"/>
            <h1 className="text-2xl font-bold mt-5 mb-5">Welcome, Admin BCR</h1>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="shadow appearance-none border rounded h-[50px] w-[500px] py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={email}
                onChange={({ target }) => {
                  setEmail(target.value);
                }}
                placeholder="Contoh: johndee@gmail.com"
              />
            </div>
            <div className="mb-5">
              <label className="block text-gray-700 mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="shadow appearance-none border rounded h-[50px] w-[500px] py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={password}
                onChange={({ target }) => {
                  setPassword(target.value);
                }}
                type='password'
                placeholder="6+ karakter"
              />
            </div>
        
              <button
                onClick={async (e) => {
                  e.preventDefault();
    
                  const payload = {
                    email: email,
                    password: password,
                  };
    
                  const response = await fetch(
                    tweets_api_base_url + '/api/auth/login',
                    {
                      method: 'post',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(payload),
                    }
                  );
    
                  const responseJson = await response.json();
    
                  if (response.status !== 200) {
                    alert('error: ' + responseJson.message);
                  }
    
                  localStorage.setItem(
                    'access_token',
                    responseJson.data.access_token
                  );
    
                  // If login succeed, redirect ke home
                  navigate('/');
                }}
                className="bg-blue-800 text-white font-bold w-[500px] py-3 px-5"
                type="button">
                Sign In
              </button>
          </form>
          <div className="ps-10">
          <GoogleOAuthProvider clientId='833200557474-70ist45s3ru9bq8diaplvkte7p8kbj7q.apps.googleusercontent.com'>
            <GoogleLogin onSuccess={handleLoginGoogleSuccess} />
          </GoogleOAuthProvider>
          </div>
        </div>
      </div>
  );
}