import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        try {
            if (typeof window === "undefined") return null;
            const raw = localStorage.getItem("vd_user");
            return raw ? JSON.parse(raw) : null;
        } catch {
            return null;
        }
    });

    useEffect(() => {
        if (typeof window === "undefined") return;
        if (user === null) {
            localStorage.removeItem("vd_user");
        } else {
            localStorage.setItem("vd_user", JSON.stringify(user));
        }
    }, [user]);

    const login = (email) => setUser({ email });
    const logout = () => setUser(null);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}