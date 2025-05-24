import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginUser, registerUser, setToken } from "../api/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (email, password) => {
    try {
      const res = await loginUser({ email, password });
      const token = res.data.token;
      setUserToken(token);
      setToken(token);
      await AsyncStorage.setItem("userToken", token);
      return true;
    } catch (e) {
      return false;
    }
  };

  const logout = async () => {
    setUserToken(null);
    setToken(null);
    await AsyncStorage.removeItem("userToken");
  };

  const register = async (email, password) => {
    try {
      await registerUser({ email, password });
      return true;
    } catch (e) {
      return false;
    }
  };

  const loadToken = async () => {
    const token = await AsyncStorage.getItem("userToken");
    if (token) {
      setUserToken(token);
      setToken(token);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{ userToken, login, logout, register, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
