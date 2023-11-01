import {createContext, useContext, useEffect, useState} from 'react';
import { IContextType, IUser } from "@/types";
import { getCurrentUser } from '@/lib/appwrite/api';
import { useNavigate } from 'react-router-dom';

export const INITIAL_USER = {
    id: "",
    username: "",  
    email: "",
    name: "",
    imageUrl: "",
    bio: "",
};

const INITIAL_STATE = {
    user: INITIAL_USER,
    isLoading: false,
    isAuthenticated: false,
    setUser: () => {},
    setIsAuthenticated: () => {},
    checkAuthUser: async () => false as boolean,
}

// This hook will be used in the components to get the auth context
const AuthContext = createContext<IContextType>(INITIAL_STATE);

const AuthProvider = ({ children }: { children: React.ReactNode}) => {

  const [user, setUser] = useState<IUser>(INITIAL_USER);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // useNavigate hook to redirect the user to the home page if the user is authenticated
  const navigate = useNavigate();


  // Check If the user is authenticated, if true, set the user and set the isAuthenticated state to true
  const checkAuthUser = async () => {
    try {
        const currentAccount = await getCurrentUser();

        if (currentAccount) {
            setUser({
                id: currentAccount.$id,
                name: currentAccount.name,
                username: currentAccount.username,
                email: currentAccount.email,
                imageUrl: currentAccount.imageUrl,
                bio: currentAccount.bio,
            })

            setIsAuthenticated(true);

            return true;
        }
        return false;

    } catch (error) {
        console.log(error);
        return false; 
    } finally {
        setIsLoading(false);
    }
  };
  
  //checkAuthUser to be called whenever we reload page so we use this useEffect
  useEffect(() => {
    if (
        localStorage.getItem('cookieFallback') === '[]' ||
        localStorage.getItem('cookieFallback') === null
    ) navigate('/sign-in');

    checkAuthUser();
  }, []);


  const value = {
    user,
    setUser,
    isLoading,
    setIsLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser,
  }



  return (
    <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;

export const useUserContext = () => useContext(AuthContext);