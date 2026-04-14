import React, { createContext, useContext, ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  MOCK_USERS,
} from "../store/authSlice";
import { User } from "../types";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  handleLogout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, isLoading, error } = useSelector(
    (s: RootState) => s.auth,
  );

  const login = async (email: string, password: string) => {
    dispatch(loginStart());
    await new Promise((r) => setTimeout(r, 600));
    const found = MOCK_USERS.find(
      (u) => u.email === email && u.password === password,
    );
    if (found) {
      dispatch(
        loginSuccess({
          id: found.id,
          name: found.name,
          email: found.email,
          avatar: found.avatar,
        }),
      );
    } else {
      dispatch(
        loginFailure(
          "Invalid credentials. Try praveen.kumar@kellton.com / kellton123",
        ),
      );
    }
  };

  const handleLogout = () => dispatch(logout());

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, isLoading, error, login, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};
