import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className='h-20 flex justify-between items-center tracking-tighter'>
      <div>
        <h1 className='text-3xl font-bold'>AI Magic Story Hour</h1>
      </div>
      <div id='login'>{/* <p>Login</p> */}</div>
    </nav>
  );
};

export default NavBar;
