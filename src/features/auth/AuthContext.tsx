import React, { createContext, useContext } from 'react';

export const AuthContext = createContext({ user: { id: 'testuser', name: '테스트유저' } });
 
export const useAuth = () => useContext(AuthContext); 