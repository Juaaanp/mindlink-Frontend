'use client';
import { createContext, useContext, useEffect, useState } from "react";

export interface StudentDTO {
  id: number;
  name: string;
  email: string;
  interests: string[];
  isAdmin: boolean; // Nuevo campo para verificar si es admin
}

interface AuthContextType {
  user: StudentDTO | null;
  setUser: (user: StudentDTO | null) => void;
  isAdmin: boolean; // Variable de estado para verificar si es admin
  setIsAdmin: (isAdmin: boolean) => void; // Función para actualizar el estado de admin
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<StudentDTO | null>(null);
  const [isAdmin, setIsAdmin] = useState(false); // Estado para almacenar si el usuario es admin

  // Solo al reiniciar la app, intenta recuperar al usuario actual (El que coincida con las cookies)
  useEffect(() => {
    fetch("http://localhost:8090/students/me", {
      credentials: "include", // <- esto es esencial
    })
      .then(res => (res.ok ? res.json() : null))
      .then(data => {
        if (data) {
          setUser(data);
          setIsAdmin(data.email === "admin@mindlink.com"); // Asumimos que el admin tiene este email
        }
      });
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, isAdmin, setIsAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
