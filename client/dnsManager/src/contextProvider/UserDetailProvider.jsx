import React, { useState } from "react";
import UserDetailContext from "../context/UserDetailContext.jsx";

function UserDetailContextProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState(null);

  return (
    <UserDetailContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, userName, setUserName }}
    >
      {children}
    </UserDetailContext.Provider>
  );
}

export default UserDetailContextProvider;