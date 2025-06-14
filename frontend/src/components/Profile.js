import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const [ userMetaData, setUserMetaData ] = useState(null);

  console.log('user is ', user);

  useEffect(() => {
    const getUserMetaData = async () => {

      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: `${process.env.AUTH0_IDENTIFIER}`,
            scope: 'read:users_app_metadata'
          },
        });

        const userDetailsByURL = `${process.env.AUTH0_IDENTIFIER}/users/${user.sub}`;
        console.log('user details url: ',userDetailsByURL);
        const metaDataResponse = await fetch(userDetailsByURL, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          }
        });

        const { user_metadata } = await metaDataResponse.json();
        setUserMetaData(user_metadata);
      } catch (error) {
        console.error('Error when getting user metadata: ', error);
      }
    };
    getUserMetaData();
  }, [getAccessTokenSilently, user?.sub]);

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
        { userMetaData ? (
          <pre>{JSON.stringify(userMetaData, null, 2)}</pre>
        ) : (
          "NO USER METADATA FOUND"
        )}
      </div>
    )
  );
};

export default Profile;