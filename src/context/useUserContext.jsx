/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase-config/firebaseConfig";


const SignIn = (email, passowrd) => {
    return createUserWithEmailAndPassword(auth, email, passowrd)

}

const Login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)


}
const LogOut = () => {
    signOut(auth);
}

const GoogleLogin = () => {
    const GoogleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, GoogleProvider)

}


const userAuthContext = createContext(
    {
        user: null,
        Login,
        SignIn,
        LogOut,
        GoogleLogin
    }
);


export const UserAuthProvider = ({ children }) => {


    const [user, setUser] = useState(null);

    useEffect(() => {
        const isUser = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user)
            }

            return () => {
                isUser();
            }
        })

    }, [])

    const value = {
        user,
        LogOut,
        Login,
        GoogleLogin,
        SignIn
    }

    return (
        < userAuthContext.Provider value={value} >
            {children}
        </userAuthContext.Provider >
    )

}

export const useUserAuth = () => {
    return useContext(userAuthContext)
}