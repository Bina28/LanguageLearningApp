import React, { createContext, useContext, useEffect, useState } from "react";
import agent from "../lib/api/agent";

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
  
      const response = await agent.get<{ completedUnits: number }>(
        `/courses/progress/${userId}`
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

// eslint-disable-next-line react-refresh/only-export-components
export const useUserProgress = () => {
  const context = useContext(UserProgressContext);
  if (!context) {
    throw new Error("useUserProgress must be used within a UserProgressProvider");
  }
  return context;
};
