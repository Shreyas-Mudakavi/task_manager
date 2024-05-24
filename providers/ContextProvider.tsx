"use client";

import React, { useEffect, useState } from "react";
import { GlobalProvider } from "@/app/context/globalProvider";
import { Toaster } from "react-hot-toast";

interface Props {
  children: React.ReactNode;
}

const ContextProvider = ({ children }: Props) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setReady(true);
    }, 200);
  }, []);

  if (!ready) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <span className="loader"></span>
      </div>
    );
  }

  return (
    <GlobalProvider>
      {children}
      <Toaster />
    </GlobalProvider>
  );
};

export default ContextProvider;
