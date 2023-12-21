import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const tweets_api_base_url = 'http://localhost:8082';

export default function CreateTweet() {
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleCreate = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const payload = {
      content: content,
    };

    const response = await fetch(tweets_api_base_url + '/api/tweets', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
      body: JSON.stringify(payload),
    });

    const responseJson = await response.json();

    if (response.status !== 201) {
      alert('error: ' + responseJson.message);
    }

    // If create tweet succeed, redirect to home
    navigate('/');
  };

  return (
    <div className='flex flex-col items-center justify-center w-full h-screen'>
      <h1 className='text-3xl font-bold mb-5'>Create New Tweet!</h1>

      <form className='flex flex-col gap-4 w-full max-w-md'>
        <input
          value={content}
          onChange={({ target }) => {
            setContent(target.value);
          }}
          placeholder='Masukkan content'
          className='border rounded-md px-4 py-2'
        />

        <button onClick={handleCreate} className='bg-black text-white rounded-md px-4 py-2 font-bold'>
          Submit
        </button>
      </form>
    </div>
  );
}