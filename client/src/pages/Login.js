import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import background from '../assets/backgrounds/homepage.png';


const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    // Getting the value and name of the input which triggered the change
    const { target } = e;
    const inputType = target.name;
    const inputValue = target.value;

    const isEmail = (email) => /^([a-z0-9_.-]+)@([\da-z.-]+)\.([a-z.]{2,6})$/.test(email);

    // Based on the input type, we set the state of either email, username, and password
    if (inputType === 'username') {
      setUsername(inputValue);
      if (!inputValue) {
        setErrorMessage('Please enter your username')
      } else {
        setErrorMessage('');
      }
    }

    if (inputType === 'password') {
      setPassword(inputValue);
      if (!inputValue) {
        setErrorMessage('Please enter your password')
      } else {
        setErrorMessage('');
      }
    }

  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // If everything goes according to plan, we want to clear out the input after a successful registration.
    setUsername('');
    setPassword('');
  };

  const style = {
    backgroundImage: `url(${background})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    'max-width': '100vw',
    height: '100vh',
  }

  return (
    <div className="container" style={style}>
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <div className="card my-5">
          <form className="card-body cardbody-color p-lg-5" id="signup-form">
            <div className="text-center">
              <h2 className="title pb-4">Welcome to Merchant Alchemist!</h2>
            </div>
            <div className="mb-3">
            <input
              className="form-control"
              value={username}
              name="username"
              onChange={handleInputChange}
              type="username"
              placeholder="username"
            />
            </div>
            <div className="mb-3">
              <input
                className="form-control"
                value={password}
                name="password"
                onChange={handleInputChange}
                type="password"
                placeholder="password"
              />
            </div>
            {errorMessage && (
              <div>
                <p className="error-text">{errorMessage}</p>
              </div>
            )}
            <div className="text-center">
              <button type="submit" className="btn btn-color px-5 mb-1 w-100 card-text" onClick={handleFormSubmit}>Login</button>
            </div>
            <div className="text-center">
              <Link to="/signup"  className="text-center">Need to create an account?</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
 )
}

export default Login;