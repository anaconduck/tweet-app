import { PlusCircleIcon } from '@heroicons/react/20/solid';
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

interface UserEntity{
    id: number;
    name: string;
    email: string;
    profile_picture_url: string;
}

const users_api_base_url = 'http://localhost:8082'

export default function Users() {
    const[users, setUsers] = useState([]); 
    
    useEffect( () => {
        const fetchUsers =async () => {
            const response = await fetch(users_api_base_url + '/api/users');
            const responseJSON = await response.json();

            setUsers(responseJSON.data.users);
        };

        fetchUsers();
    },[] );
  
    return (
        <div className='flex w-full bg-gray-300 place-content-center min-h-screen'>
        
        <div className='w-[700px] bg-gray-100 p-5'>

            {/* start */}
            <div className='flex justify-between mt-[10px]'>
                <h1 className='font-bold text-3xl text-black'>List User</h1>

            <Link to='/create-user'>
                <button className='text-white rounded-lg'>
                    <PlusCircleIcon className='w-8 h-8 text-black' />
                </button>
            </Link>
            </div>
            {/* end */}

            <div className='mt-[50px] grid grid-cols-3 gap-4'>
                
                {!users.length && <div>Data Kosong</div>}

                {users && 
                users.map ((user: UserEntity) => (
                // start
                <div key={user.id} className='mt-[40px] flex flex-col items-center justify-center'>
                    <img src={user.profile_picture_url} className="w-20 h-20 rounded-full mb-4" />
                    <h3 className='text-base font-medium text-black'><strong>{user.name}</strong></h3>
                    <h3 className='text-base font-medium text-black'><strong>{user.email}</strong></h3>
                    
                </div>
                // end
                ))}
                </div>
            </div>
        </div>
  )
}
