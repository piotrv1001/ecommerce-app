import { axiosWithAuth } from "@/lib/utils";
import { JwtPayload } from "@/types/jwt-payload";
import { useEffect, useState } from "react";

export const useProtectedRoute = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<JwtPayload | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosWithAuth.get("/api/auth/verify");
        setUser(res.data);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return { user, loading };
};
