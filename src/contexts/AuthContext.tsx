import { createContext, useEffect, useState } from 'react';
import { ReactNode } from 'react';
import { auth, firebase } from '../services/firebase'

type AuthContexProviderProps = {
  children: ReactNode;
};

type User = {
  id: string;
  name: string;
  photo: string;  
};

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>;
};

export const authContext = createContext({} as AuthContextType);

export function ContextProvider(props: AuthContexProviderProps) {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged( user => {
      if (user) {
        const { displayName, photoURL, uid } = user

        if (!displayName || !photoURL ) {
          throw new Error('Missing information from Google Account')
        }

        setUser({
          id: uid,
          name: displayName,
          photo: photoURL
        })
      }
    })

    return () => {
      unsubscribe();
    };
  }, [])

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();

    const result = await auth.signInWithPopup(provider);

    if (result.user) {
      const { displayName, photoURL, uid } = result.user
      
      if (!displayName || !photoURL) {
        throw new Error("Missing information from Google Account")
      }

      setUser({
        id: uid,
        name: displayName,
        photo: photoURL
      })
    }
  }

  return (
    <authContext.Provider value={{user, signInWithGoogle }}>
      {props.children}
    </authContext.Provider>
  );
}