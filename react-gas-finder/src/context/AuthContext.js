import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
    user: {
        _id: "65031ecaaf3490fcaf4ed84f",
        username: "hey",
        email: "hey@gmail.com",
        password: "$2b$10$N2LD32rSh.TcGuLHicz/4OsUlZkiGhLmBjtl.ZjmQtAUkoUEe6nPq",
        profilePicture: "",
        coverPicture: "",
        followers: [],
        followings: [],
        isAdmin: false,
        bestStation: "PlutoFill",
        from: "Pluto",
        city: "Pluto Nation"
    },
    isFetching: false,
    error: false
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                isFetching: state.isFetching,
                error: state.error,
                dispatch
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

