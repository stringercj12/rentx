import React, { ReactNode, useContext, createContext, useEffect, useState } from 'react';
import { api } from '../services/api';
import { User as ModelUser } from '../database/model/User';
import { database } from '../database';
interface User {
  id: string;
  user_id: string;
  email: string;
  name: string;
  driver_license: string;
  avatar: string;
  token: string;
}
interface SignInCredentials {
  email: string;
  password: string;
}
interface AuthContextData {
  user: User;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (user: User) => Promise<void>;
  loading: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [data, setData] = useState<User>({} as User);
  const [loading, setLoading] = useState(true);

  async function signIn({ email, password }: SignInCredentials) {

    try {
      const response = await api.post('/sessions', { email, password });

      const { token, user } = response.data;

      api.defaults.headers.authorization = `Bearer ${token}`;
      const userCollection = await database.get<ModelUser>('users');
      // const userCollection = await database.get<ModelUser>('users').create((newUser) => {
      //   newUser.user_id = user.id;
      //   newUser.name = user.name;
      //   // newUser.name = user.name;
      //   // newUser.email = user.email;
      //   // newUser.driver_license = user.driver_license;
      //   // newUser.token = token;
      //   console.log('Aqui', newUser)
      // });
      console.log(response.data);
      await database.write(async (e) => {
        console.log('Aqui', e)
        await userCollection.create((newUser) => {
          newUser.user_id = user.id;
          newUser.name = user.name;
          // newUser.name = user.name;
          // newUser.email = user.email;
          // newUser.driver_license = user.driver_license;
          // newUser.token = token;
        });
      });


      setData({
        ...user,
        token,
      });

    } catch (error: any) {
      throw new Error(error);
    }


  }

  async function signOut() {
    try {
      const userCollection = database.get<ModelUser>('users');
      await database.write(async () => {
        const userSelected = await userCollection.find(data.id);
        await userSelected.destroyPermanently();
        setData({} as User);
      });

    } catch (error: any) {
      throw new Error(error);
    }
  }

  async function updateUser(user: User) {
    try {
      const userCollection = database.get<ModelUser>('users');
      await database.write(async () => {
        const userSelected = await userCollection.find(user.id);
        await userSelected.update((userData) => {
          userData.name = user.name
        })
      })

      setData(user);

    } catch (error: any) {
      throw new Error(error);
    }
  }

  useEffect(() => {
    async function loadUserData() {
      const userCollection = database.get<ModelUser>('users');
      const response = await userCollection.query().fetch();
      console.log(response);

      if (response.length > 0) {
        const userData = response[0]._raw as unknown as User;
        api.defaults.headers.authorization = `Bearer ${userData.token}`;
        setData(userData);
      }
      setLoading(false);

    }

    loadUserData();
  }, [])

  return (
    <AuthContext.Provider value={{
      user: data,
      signIn,
      signOut,
      updateUser,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  )
}



function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}


export {
  AuthProvider,
  useAuth,
}