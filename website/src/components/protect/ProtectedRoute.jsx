import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {



    // const user  = useSelector(state => state.auth.user)
     const user = useSelector(state => state.auth.user) 
    || JSON.parse(localStorage.getItem("user"));

    console.log(user, "lll")

    const navigate = useNavigate()


  // useEffect(() => {
  // if (user === null) {
  //       return navigate("/login")
  //   }
  // }, [navigate])
  useEffect(() => {
  if (user === null) {
    navigate("/login");
  }
}, [user, navigate]);

  if (!user) return null;


  if(!user) return null;
  

    return (
        <div>{children}</div>
    )
}

export default ProtectedRoute


// import React from "react";
// import { useSelector } from "react-redux";
// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children }) => {
//   const { user, isAuthenticated } = useSelector((state) => state.auth);

//   if (!isAuthenticated || !user) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;



// import React, { useEffect } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// const ProtectedRoute = ({ children }) => {
//   const reduxUser = useSelector((state) => state.auth.user);
//   const localUser = JSON.parse(localStorage.getItem("user"));
//   const user = reduxUser || localUser;

//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!user) {
//       navigate("/login");
//     }
//   }, [user, navigate]);

//   if (!user) return null;

//   return <>{children}</>;
// };

// export default ProtectedRoute;


// const  ProtectedRoute = ({ children }) => {
//   const reduxUser = useSelector((state) => state.auth.user);
//   const localUser = JSON.parse(localStorage.getItem("user"));
//   const token = localStorage.getItem("token");

//   const user = reduxUser || localUser;
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!user || !token) {
//       navigate("/login");
//     }
//   }, [user, token, navigate]);

//   if (!user || !token) return null;

//   return <>{children}</>;
// };

// export default ProtectedRoute;
