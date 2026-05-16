import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type UserType = {
  id?: string;
  name?: string;
  roles?: string[];
  permissions?: string[];
};

type UserContextType = {
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
  hasRole: (role: string) => boolean;
  hasPermission: (permission: string) => boolean;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  // ✅ Load from sessionStorage
  const [user, setUser] = useState<UserType | null>(() => {
    const storedUser = sessionStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // ✅ Save to sessionStorage whenever user changes
  useEffect(() => {
    if (user) {
      sessionStorage.setItem("user", JSON.stringify(user));
    } else {
      sessionStorage.removeItem("user");
    }
  }, [user]);

  const hasRole = (role: string) => {
    return user?.roles?.includes(role) ?? false;
  };

  const hasPermission = (permission: string) => {
    return user?.permissions?.includes(permission) ?? false;
  };

  return (
    <UserContext.Provider value={{ user, setUser, hasRole, hasPermission }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};