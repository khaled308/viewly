"use client";

import { SessionProvider as AuthProvider } from "next-auth/react";

const SessionProvider = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default SessionProvider;
