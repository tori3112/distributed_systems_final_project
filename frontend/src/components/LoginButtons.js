import React from "react";
import Profile from "./Profile";

const AuthButtons = () => {

  return (
    <div>
      {!isAuthenticated ? (
        <button
          onClick={() => loginWithRedirect()}
          className="text-white bg-fuchsia-600 hover:bg-fuchsia-700 focus:ring-4 focus:outline-none focus:ring-fuchsia-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
        >
          Log In
        </button>
      ) : (
        <div className="flex flex-col items-end">
        <Profile />
        <button
          onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
          className="text-fuchsia-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
        >
          Log Out
        </button>
        </div>
      )}
    </div>
  );
};

export default AuthButtons;