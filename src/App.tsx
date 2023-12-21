import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import CreateTweet from './pages/CreateTweet';
//TODO
import Users from './pages/Users'
import CreateUser from './pages/CreateUser'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/create-tweet' element={<CreateTweet />} />

        <Route path='/list-user' element={<Users />} />
        <Route path='/create-user' element={<CreateUser />} />
      </Routes>
    </>
  )
}

export default App
