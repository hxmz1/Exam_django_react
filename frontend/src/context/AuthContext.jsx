import React, { createContext, useState } from 'react';
import { login, refreshToken } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ access: null, refresh: null });

  // ✅ on attend un objet { username, password }
  const handleLogin = async (credentials) => {
    const res = await login(credentials); // credentials est { username, password }
    setAuth({ access: res.data.access, refresh: res.data.refresh });
  };

  return (
    <AuthContext.Provider value={{ auth, handleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};
