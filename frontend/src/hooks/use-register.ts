import { registerSchema } from "@/schemas/register-schema";
import { useAuthStore } from "@/stores/use-auth-store";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";
import { toast } from "sonner";

export const useRegister = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { login } = useAuthStore();

  const register = async (values: z.infer<typeof registerSchema>) => {
    try {
      const res = await axios.post<{ access_token: string }>(
        "/api/auth/register",
        values
      );
      const token = res.data.access_token;
      login(token);
      toast.success("Registered successfully");
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error("Failed to register");
    }
  };

  return { register, form };
};
