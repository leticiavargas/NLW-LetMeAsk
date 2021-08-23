import { createContext, useState, useEffect } from 'react';
import { auth, firebase } from './services/firebase';

export const AuthContext = createContext({});

export const AuthContextProvider = ({children}) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if(user) {
        const {displayName, photoURL, uid} = result.user;
  
        if(!displayName || !photoURL) {
          throw new Error("Missing info from Google Account");
        }
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }
    })

    return () => {
      unsubscribe();
    }
  }, []);

  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await auth.signInWithPopup(provider);
    
    if(result.user) {
      const {displayName, photoURL, uid} = result.user;

      if(!displayName || !photoURL) {
        throw new Error("Missing info from Google Account");
      }
      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      })
    }
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle}}>
      {children}
    </AuthContext.Provider>
  );
}