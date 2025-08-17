import React, { createContext, useContext, useState} from "react";

type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
};


const UserContext = createContext<UserContextType | undefined>(undefined);


export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUserState] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const setUser = (user: User | null) => {
    setUserState(user);
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  };

  const logout = () => {
    setUser(null);
  };

  return React.createElement(
    UserContext.Provider,
    { value: { user, setUser, logout } },
    children
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUserContext must be used within UserProvider");
  return context;
};