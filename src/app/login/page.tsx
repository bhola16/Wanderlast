
"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";

export default function LogInPage() {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [socialLoading, setSocialLoading] = useState<
    "google" | "github" | null
  >(null);

  const handleSocialLogin = async (
    provider: "google" | "github",
  ) => {
    if (isSubmitting || socialLoading) return;

    setSocialLoading(provider);

    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: "/",
        errorCallbackURL: "/login",
      });

      if (error) {
        toast.error(error.message || `Unable to log in with ${provider}.`);
        setSocialLoading(null);
      }
    } catch (err) {
      // console.error(`${provider} login failed:`, err);
      toast.error(`Unable to log in with ${provider}. Please try again.`);
      setSocialLoading(null);
    }
  };

  const handleEmailLogin = async (
    e: FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    if (isSubmitting || socialLoading) return;

    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);

    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        toast.error(error.message || "Login failed. Please try again.");
        return;
      }

      if (data) {
        toast.success("Login successful!");
        // console.log(data)
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      // console.error("Login request failed:", err);
      toast.error("Login failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto my-10 flex max-w-xl flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome Back</CardTitle>
          <CardDescription>
            Log in with Google, GitHub, or your email
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Field className="my-2">
            <Button
              className="w-full"
              type="button"
              variant="outline"
              disabled={isSubmitting || socialLoading !== null}
              onClick={() => handleSocialLogin("google")}
            >
              <Image
                src="/assets/google.jpeg"
                alt="Google logo"
                width={20}
                height={20}
              />
              {socialLoading === "google"
                ? "Logging in..."
                : "Login with Google"}
            </Button>

            <Button
              className="w-full"
              type="button"
              variant="outline"
              disabled={isSubmitting || socialLoading !== null}
              onClick={() => handleSocialLogin("github")}
            >
              <Image
                src="/assets/github.jpeg"
                alt="GitHub logo"
                width={20}
                height={20}
              />
              {socialLoading === "github"
                ? "Logging in..."
                : "Login with GitHub"}
            </Button>

            <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
              Or continue with email
            </FieldSeparator>
          </Field>

          <form onSubmit={handleEmailLogin}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your Email Address"
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                />
              </Field>

              <Field>
                <Button
                  className="w-full"
                  type="submit"
                  disabled={isSubmitting || socialLoading !== null}
                >
                  {isSubmitting ? "Logging in..." : "Login"}
                </Button>

                <FieldDescription className="text-center">
                  Don&apos;t have an account?{" "}
                  <Link href="/signup">Sign Up</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>

      <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our{" "}
        <a href="#">Terms of Service</a> and{" "}
        <a href="#">Privacy Policy</a>.
      </FieldDescription>
    </div>
  );
}
