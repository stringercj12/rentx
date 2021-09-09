import React, { ReactNode } from 'react';


import { AuthProvider } from './auth';

interface AppproviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppproviderProps) {
  return (
    <AuthProvider>
    { children }
    </AuthProvider>
  )
}