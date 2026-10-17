import { createContext, useContext, useMemo, useState } from 'react';
import { getStoredUser, getToken, setStoredUser, setToken } from '../api.js';
const Context = createContext(null);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredUser);
  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user && getToken()),
      login(next, token) {
        setToken(token);
        setStoredUser(next);
        setUser(next);
      },
      logout() {
        setToken(null);
        setStoredUser(null);
        setUser(null);
      },
    }),
    [user],
  );
  return <Context.Provider value={value}>{children}</Context.Provider>;
}
export function useAuth() {
  const c = useContext(Context);
  if (!c) throw new Error('AuthProvider missing');
  return c;
}
