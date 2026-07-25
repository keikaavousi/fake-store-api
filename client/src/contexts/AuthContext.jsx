import React, { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext(null);
const STORAGE_KEY = 'brads-store-user';

function loadUser() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY));
  } catch {
    return null;
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(loadUser);

  const saveUser = (nextUser) => {
    setUser(nextUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
    return nextUser;
  };

  const login = async (email, password) => {
    if (!email.trim() || !password.trim()) {
      throw new Error('Enter both your email and password.');
    }

    return saveUser({
      email: email.trim(),
      name: email.split('@')[0],
    });
  };

  const signup = async ({ email, firstName, lastName, password }) => {
    if (!email.trim() || !firstName.trim() || !password.trim()) {
      throw new Error('Complete all required fields.');
    }

    return saveUser({
      email: email.trim(),
      name: `${firstName.trim()} ${lastName.trim()}`.trim(),
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const value = useMemo(() => ({
    user,
    isLoggedIn: Boolean(user),
    login,
    signup,
    logout,
  }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
}

export { AuthContext };
