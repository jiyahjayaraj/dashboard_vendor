// import React, { useEffect } from 'react';
// import { Navigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';

// import { userMe } from 'container/LoginContainer/slice';

// const AuthGuard = ({ children }) => {
//   const dispatch = useDispatch();

// const checkUser = useSelector((state) =>state.login.userData)
  

//   // useEffect(() => {
//   //   dispatch(userMe());
//   // }, [dispatch]);


//   console.log("==checkuser",checkUser)

// if (!checkUser || Object.keys(checkUser).length === 0) {
//   return <Navigate to="/login" replace />;
// }

//   return children;
// };

// export default AuthGuard;


import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { userMe } from 'container/LoginContainer/slice';



const AuthGuard = ({ children }) => {
  const dispatch = useDispatch();

  const { userData, isInitialized } = useSelector((state) => state.login);

  useEffect(() => {
    dispatch(userMe());
  }, [dispatch]);


  if (!isInitialized) {
    return <div>Loading...</div>;
  }


  

  if (!userData || Object.keys(userData).length === 0) {
    return <Navigate to="/login" replace />;
  }

  return children;
};



export default AuthGuard;