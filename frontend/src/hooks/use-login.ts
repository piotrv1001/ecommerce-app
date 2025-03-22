import { loginSchema } from "@/schemas/login-schema";
import { useAuthStore } from "@/stores/use-auth-store";
import axios from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const useLogin = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { login: loginToStore } = useAuthStore();

  const login = async (values: z.infer<typeof loginSchema>) => {
    try {
      const res = await axios.post<{ access_token: string }>(
        "/api/auth/login",
        values
      );
      const token = res.data.access_token;
      loginToStore(token);
      toast.success("Logged in successfully");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Invalid credentials");
    }
  };

  return { login, form };
};
