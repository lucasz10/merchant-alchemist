import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import background from '../assets/backgrounds/landing.png';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Login = () => {

  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  const style = {
    backgroundImage: `url(${background})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    maxWidth: '100vw',
    height: '100vh',
  };

  return (
    <div className="container pt-5" style={style}>
    <div className="row pt-5 pr-5" id="login">
      <div className="col-md-6 offset-md-4">
        <div className="card my-5 w-75">
          <form className="card-body cardbody-color p-lg-5">
            <div className="text-center">
              <h2 className="pb-4">Welcome to Merchant Alchemist!</h2>
            </div>
            <div className="mb-3">
            <input
              className="form-control"
              value={formState.email}
              name="email"
              onChange={handleChange}
              type="email"
              placeholder="email"
            />
            </div>
            <div className="mb-3">
              <input
                className="form-control"
                value={formState.password}
                name="password"
                onChange={handleChange}
                type="password"
                placeholder="password"
              />
            </div>
            {error && (
            <div>
              <p className="error-text">{error.message}</p>
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
 );
};

export default Login;