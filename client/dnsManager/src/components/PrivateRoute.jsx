import { Navigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import UserDetailContext from "../context/UserDetailContext";
import { auth } from "../../api";
function PrivateRoute({ children }) {
  const { isLoggedIn, setIsLoggedIn, userName, setUserName } =
    useContext(UserDetailContext);
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    auth()
      .then((res) => {
        setIsLoggedIn(true);
        setIsloading(false);
        setUserName(`${res.data.firstName} ${res.data.lastName}`);
      })
      .catch((err) => {
        console.log(err);
        setIsLoggedIn(false);
        setIsloading(false);
      });
  }, [isLoggedIn]);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return isLoggedIn ? <>{children}</> : <Navigate to="/login" />;
}

export default PrivateRoute;