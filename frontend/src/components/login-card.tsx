import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginForm from "./login-form";
import { Link } from "react-router";

export default function LoginCard() {
  return (
    <div className="h-full flex items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Enter your credentials</CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter>
          <div className="mt-4 text-center text-sm mx-auto">
            Don&apos;t have an account?{" "}
            <Link className="underline" to="/register">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
