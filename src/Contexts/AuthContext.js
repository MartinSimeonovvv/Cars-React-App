import React from 'react';

export const AuthContext = React.createContext();

function AuthContextProvider({ children }) {
    const [user, setUser] = React.useState({
        authToken: null,
        userId: null,
        email: null,
    });

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;