"use client";
import { registerApi, resetPassword } from "@/apis/authApis";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useAuth } from "@/providers/AuthProvider";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export function ResetPasswordForm({ className, token, ...props }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const { setUser, setIsAuthenticated } = useAuth();

  const { mutate, isPending } = useMutation({
    mutationFn: resetPassword,
    onError: (error) => toast.error(error.message),
    onSuccess: (data) => {
      toast.success(data);
      router.push("/login");
    },
  });

  function hanldeResetPassword(formData) {
    formData.token = token;
    mutate(formData);
  }
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card className="overflow-hidden shadow-md">
          <CardContent className="grid p-0 md:grid-cols-2">
            <form
              className="p-8 md:p-10 md:py-20"
              onSubmit={handleSubmit(hanldeResetPassword)}
            >
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Reset Your Password</h1>
                </div>

                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">New Password</Label>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters long",
                      },
                    })}
                    disabled={isPending}
                  />
                  {errors.password && (
                    <p style={{ color: "red" }}>{errors.password.message}</p>
                  )}
                </div>
                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? "Processing..." : "Reset"}
                </Button>

                <div className="text-center text-sm">
                  Already have an account?{" "}
                  <Link href="/login" className="underline underline-offset-4">
                    Login
                  </Link>
                </div>
              </div>
            </form>
            <div className="relative hidden bg-muted md:block h-100">
              <Image
                src="/login2.jpg"
                alt="Image"
                fill
                className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
              />
            </div>
          </CardContent>
        </Card>
        <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
          By clicking continue, you agree to our{" "}
          <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </div>
      </div>
    </div>
  );
}
