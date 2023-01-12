import React from "react";

const AuthContext = React.createContext({ //not a component itself, it is an object that will contain a component
    isLoggedIn: false
})

export default AuthContext
