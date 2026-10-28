
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

export default function SignUpPage() {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [socialLoading, setSocialLoading] = useState<
    "google" | "github" | null
  >(null);

  const handleSocialSignUp = async (
    provider: "google" | "github",
  ) => {
    if (isSubmitting || socialLoading) return;

    setSocialLoading(provider);

    try {
      await authClient.signIn.social({
        provider,
        callbackURL: "/",
        errorCallbackURL: "/signup",
      });
    } catch (err) {
      console.error(`${provider} sign-up failed:`, err);
      toast.error(`Unable to sign up with ${provider}. Please try again.`);
      setSocialLoading(null);
    }
  };

  const handleEmailSignUp = async (
    e: FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    if (isSubmitting || socialLoading) return;

    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") ?? "");
    const image = String(formData.get("image") ?? "");
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    try {
      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
        image: image || undefined,
      });

      if (error) {
        toast.error(error.message || "Sign up failed. Try again.");
        return;
      }

      if (data) {
        toast.success("Sign up successful!");
        router.push("/");
      }
    } catch (err) {
      console.error("Signup request failed:", err);
      toast.error("Sign up failed. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto my-10 flex max-w-xl flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome</CardTitle>
          <CardDescription>
            Sign up with Google, GitHub, or your email
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Field className="my-2">
            <Button
              className="w-full"
              type="button"
              variant="outline"
              disabled={isSubmitting || socialLoading !== null}
              onClick={() => handleSocialSignUp("google")}
            >
              <Image
                src="/assets/google.jpeg"
                alt="Google logo"
                width={20}
                height={20}
              />
              {socialLoading === "google"
                ? "Signing up..."
                : "Sign Up with Google"}
            </Button>

            <Button
              className="w-full"
              type="button"
              variant="outline"
              disabled={isSubmitting || socialLoading !== null}
              onClick={() => handleSocialSignUp("github")}
            >
              <Image
                src="/assets/github.jpeg"
                alt="GitHub logo"
                width={20}
                height={20}
              />
              {socialLoading === "github"
                ? "Signing up..."
                : "Sign Up with GitHub"}
            </Button>

            <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
              Or continue with
            </FieldSeparator>
          </Field>

          <form onSubmit={handleEmailSignUp}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Enter Your Name"
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="image">Image URL</FieldLabel>
                <Input
                  id="image"
                  type="url"
                  name="image"
                  placeholder="Enter Your Image URL"
                />
              </Field>

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
                  type="submit"
                  disabled={isSubmitting || socialLoading !== null}
                >
                  {isSubmitting ? "Signing up..." : "Sign Up"}
                </Button>

                <FieldDescription className="text-center">
                  Have an account? <Link href="/login">Login</Link>
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
