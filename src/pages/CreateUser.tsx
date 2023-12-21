import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const tweets_api_base_url = 'http://localhost:8082';

export default function CreateTweet() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [img, setImg] = useState(null);

  const handleFileChange = (e) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      setImg(files[0]);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center w-full h-screen bg-gray-100'>
      <h1 className='text-3xl font-bold mb-5'>Create New User!</h1>

      <form className='flex flex-col gap-4 w-full max-w-md'>
        <input
          className='border rounded-md px-4 py-2'
          value={email}
          onChange={({ target }) => {
            setEmail(target.value);
          }}
          placeholder="Enter email"
        />
        
        <input
          className='border rounded-md px-4 py-2'
          value={name}
          onChange={({ target }) => {
            setName(target.value);
          }}
          placeholder="Enter name"
        />
        
        <input 
          className='border rounded-md px-4 py-2'
          type="file"
          onChange={handleFileChange}
        />

        <button
          onClick={async (e) => {
            e.preventDefault();

            const formData = new FormData();
            formData.append("email", email);
            formData.append("name", name);
            if (img) {
              formData.append("profile_picture_url", img);
            }

            const response = await fetch(
              tweets_api_base_url + "/api/users",
              {
                method: "post",
                body: formData,
              }
            );

            const responseJson = await response.json();

            if (response.status !== 201) {
              alert("error: " + responseJson.message);
            }

            navigate("/list-user");
          }}
          className='bg-blue-500 text-white rounded-md px-4 py-2 font-bold'>
          Submit
        </button>
      </form>
    </div>
  );
}