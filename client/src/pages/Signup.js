import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import background from '../assets/backgrounds/landing.png';

import { useLazyQuery, useMutation } from '@apollo/client';
import { QUERY_USER_STORES } from '../utils/queries';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Signup = () => {
    // Query user's store data
    const [getStores] = useLazyQuery(QUERY_USER_STORES);

    const [formState, setFormState] = useState({
      username: '',
      email: '',
      password: '',
    });

    const [addUser, { error, data }] = useMutation(ADD_USER);
  
    const handleChange = (event) => {
      const { name, value } = event.target;
  
      setFormState({
        ...formState,
        [name]: value,
      });
    };
  
    const handleFormSubmit = async (event) => {
      event.preventDefault();
      console.log(formState);
  
      try {
        const { data } = await addUser({
          variables: { ...formState },
        });

        // Get user's store data with their username
        const username = data.addUser.user.username;
        const { data: storesData } = await getStores({ variables: { username } });
        // Save store id to local storage
        const store_id = storesData.user.stores[0]._id;
        localStorage.setItem('storeId', store_id);
  
        Auth.login(data.addUser.token);
      } catch (e) {
        console.error(e);
      }
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
    <div className="row pt-5 pr-5" id="signup">
      <div className="col-md-6 offset-md-4">
        <div className="card my-5 w-75">
          <form className="card-body cardbody-color p-lg-5" onSubmit={handleFormSubmit}>
            <div className="text-center">
              <h2 className="title pb-4">Welcome to Merchant Alchemist!</h2>
            </div>
            <div className="mb-3">
            <input
              className="form-control"
              value={formState.username}
              name="username"
              onChange={handleChange}
              type="username"
              placeholder="username"
            />
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
              <button type="submit" className="btn btn-color px-5 mb-1 w-100 card-text" onClick={handleFormSubmit}>Sign Up</button>
            </div>
            <div className="text-center">
              <Link to="/login" className="text-center" id="signup">Already have an account?</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
 );
};

export default Signup;