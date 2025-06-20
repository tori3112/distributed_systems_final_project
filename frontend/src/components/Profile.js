import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated, isLoading, error } = useAuth0();

  console.log('user is ', user);

  if (error) {
    return <div>Authentication Error: {error.message}</div>;
  }
  

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <div className="flex items-center space-x-4">
        <img src={user.picture} alt={user.name} className="w-10 h-10 rounded-full" />
        <div>
          <h2 className="text-lg font-semibold">{user.name}</h2>
          <p className="text-sm text-fuchsia-600">{user.email}</p>
        </div>
      </div>
    )
  );
};

export default Profile;