import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Intenta obtener el estado guardado en localStorage cuando el componente se monta
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    // Cada vez que el usuario cambie, actualiza localStorage
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user'); // Asegúrate de remover el usuario de localStorage si es `null`
    }
  }, [user]);

  const logout = () => {
    setUser(null); // Establece el usuario a null para cerrar sesión
  };

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

