'use client'
import { createContext, useContext, useEffect, useState } from "react";

export interface StudentDTO {
  id: number;
  name: string;
  email: string;
  interests: string[];
}

interface AuthContextType {
  user: StudentDTO | null;
  setUser: (user: StudentDTO | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<StudentDTO | null>(null);

  //Solo al reiniciar la app, intenta recuperar al usuario actual (El que coincida con las cookies)
  useEffect(() => { 
    fetch("http://localhost:8090/students/me", {
      credentials: "include", // <- esto es esencial
    })
      .then(res => (res.ok ? res.json() : null)) //Esto debería dar null si no es ok? no funciona eso
      .then(data => {
        if (data) setUser(data);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
