import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav>
      <div>
        <h1 className='text-3xl font-bold'>AI Story Hour</h1>
      </div>
      <div id='login'>
        <p>Login</p>
      </div>
    </nav>
  );
};

export default NavBar;
