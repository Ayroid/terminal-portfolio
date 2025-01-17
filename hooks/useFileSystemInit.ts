"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useFileSystem } from "@/store/fileSystemStore";
import axios from "axios";

export const useFileSystemInit = () => {
  const { data: session, status } = useSession();
  const { setFiles } = useFileSystem();

  useEffect(() => {
    const initializeFileSystem = async () => {
      if (status === "authenticated" && session) {
        try {
          const response = await axios.get("/api/filesystem/init");
          console.log("File system initialized:", response.data);
          setFiles(response.data);
        } catch (error) {
          console.error("Error initializing file system:", error);
        }
      }
    };

    initializeFileSystem();
  }, [session, status, setFiles]);
};
