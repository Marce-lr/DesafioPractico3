import React from "react";
import { AuthProvider } from "./src/contexts/Authcontext";
import Navigation from "./src/navigation";

export default function App() {
  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  );
}
