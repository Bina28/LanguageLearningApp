import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

interface UserProgressContextType {
  completedUnits: number;
  refreshProgress: () => void;
}

const UserProgressContext = createContext<UserProgressContextType | undefined>(undefined);

export const UserProgressProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [completedUnits, setCompletedUnits] = useState<number>(0);

  const refreshProgress = async () => {
    try {
      const userString = localStorage.getItem("user");
      if (!userString) return;

      const user = JSON.parse(userString);
      const userId = user.id;

      const response = await axios.get<{ completedUnits: number }>(
        `http://localhost:5117/api/auth/progress/${userId}`
      );

      setCompletedUnits(response.data.completedUnits);
    } catch (error) {
      console.error("Error fetching completed units:", error);
    }
  };

  useEffect(() => {
    refreshProgress();
  }, []);

  return (
    <UserProgressContext.Provider value={{ completedUnits, refreshProgress }}>
      {children}
    </UserProgressContext.Provider>
  );
};

export const useUserProgress = () => {
  const context = useContext(UserProgressContext);
  if (!context) {
    throw new Error("useUserProgress must be used within a UserProgressProvider");
  }
  return context;
};
