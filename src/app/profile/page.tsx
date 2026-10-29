
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { authClient } from "@/lib/auth-client";
import { Compass } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ProfilePage = () => {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");

  const [editName, setEditName] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [editImage, setEditImage] = useState(false);

  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [isPending, session, router]);

  useEffect(() => {
    if (session) {
      setName(session.user.name || "");
      setEmail(session.user.email || "");
      setImage(session.user.image || "");
    }
  }, [session]);

  const handleUpdateName = async () => {
    if (!name.trim()) {
      setMessage("Name cannot be empty.");
      return;
    }

    setIsSaving(true);
    setMessage("");

    try {
      const { error } = await authClient.updateUser({
        name: name.trim(),
      });

      if (error) {
        setMessage(error.message || "Failed to update name.");
        return;
      }

      setEditName(false);
      setMessage("Name updated successfully.");
    } catch (error) {
      console.error("Failed to update name:", error);
      setMessage("Something went wrong while updating your name.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdateEmail = async () => {
    if (!email.trim()) {
      setMessage("Email cannot be empty.");
      return;
    }

    setIsSaving(true);
    setMessage("");

    try {
      const { error } = await authClient.changeEmail({
        newEmail: email.trim(),
        callbackURL: "/profile",
      });

      if (error) {
        setMessage(error.message || "Failed to update email.");
        return;
      }

      setEditEmail(false);
    } catch (error) {
      console.error("Failed to update email:", error);
      setMessage("Something went wrong while updating your email.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdateImage = async () => {
    const imageUrl = image.trim();

    if (imageUrl && !/^https?:\/\/\S+$/i.test(imageUrl)) {
      setMessage("Please enter a valid image URL.");
      return;
    }

    setIsSaving(true);
    setMessage("");

    try {
      const { error } = await authClient.updateUser({
        image: imageUrl || null,
      });

      if (error) {
        setMessage(error.message || "Failed to update image.");
        return;
      }

      setEditImage(false);
    } catch (error) {
      console.error("Failed to update image:", error);
      setMessage("Something went wrong while updating your image.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  };

  if (isPending || !session) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-gray-50 px-4 py-12">
        <div className="w-full max-w-6xl">
          <div className="mb-10 text-center">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#3ab0cb]/10">
              <Compass
                size={32}
                className="animate-spin text-[#238ba2]"
              />
            </div>

            <h1 className="text-2xl font-bold text-gray-900">
              Preparing Your Journey
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Please wait while we load your travel experience...
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="animate-pulse overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm"
              >
                <div className="h-56 bg-gray-200" />

                <div className="p-5">
                  <div className="mb-4 h-4 w-1/3 rounded bg-gray-200" />
                  <div className="mb-4 h-6 w-3/4 rounded bg-gray-200" />
                  <div className="mb-6 h-4 w-1/2 rounded bg-gray-200" />

                  <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                    <div className="h-7 w-24 rounded bg-gray-200" />
                    <div className="h-10 w-28 rounded-lg bg-gray-200" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-sm font-medium text-[#238ba2]">
            Finding your next adventure...
          </p>
        </div>
      </main>
    );
  }

  const user = session.user;

  return (
    <div className="mx-auto w-full max-w-6xl p-6">
      <h1 className="mb-6 text-3xl font-bold">My Profile</h1>

      <div className="w-full rounded-xl border p-6 shadow-sm">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
          <Avatar className="h-16 w-16 shrink-0">
            <AvatarImage
              src={user.image || undefined}
              alt={user.name || "User"}
              referrerPolicy="no-referrer"
              className="h-full w-full rounded-full object-cover"
            />

            <AvatarFallback className="rounded-full text-xl font-bold">
              {user.name?.charAt(0).toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>

          <div className="w-full space-y-6">
            {/* Name */}
            <div>
              <p className="mb-2 text-sm text-gray-500">Name</p>

              {editName ? (
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your name"
                  />

                  <button
                    type="button"
                    onClick={handleUpdateName}
                    disabled={isSaving}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                  >
                    {isSaving ? "Saving..." : "Save"}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setName(user.name || "");
                      setEditName(false);
                      setMessage("");
                    }}
                    disabled={isSaving}
                    className="rounded-lg border px-4 py-2 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="font-medium">
                    {user.name || "Not provided"}
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setName(user.name || "");
                      setEditName(true);
                      setMessage("");
                    }}
                    className="rounded-lg border px-4 py-2 hover:bg-gray-100"
                  >
                    Edit Name
                  </button>
                </div>
              )}
            </div>

            {/* Email */}
            <div>
              <p className="mb-2 text-sm text-gray-500">Email</p>

              {editEmail ? (
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your new email"
                  />

                  <button
                    type="button"
                    onClick={handleUpdateEmail}
                    disabled={isSaving}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                  >
                    {isSaving ? "Saving..." : "Save"}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setEmail(user.email);
                      setEditEmail(false);
                      setMessage("");
                    }}
                    disabled={isSaving}
                    className="rounded-lg border px-4 py-2 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="break-all font-medium">{user.email}</p>

                  <button
                    type="button"
                    onClick={() => {
                      setEmail(user.email);
                      setEditEmail(true);
                      setMessage("");
                    }}
                    className="rounded-lg border px-4 py-2 hover:bg-gray-100"
                  >
                    Edit Email
                  </button>
                </div>
              )}
            </div>

            {/* Profile Image URL */}
            <div>
              <p className="mb-2 text-sm text-gray-500">
                Profile Image URL
              </p>

              {editImage ? (
                <div className="flex flex-col gap-3 sm:flex-row">
                  <input
                    type="url"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your image URL"
                  />

                  <button
                    type="button"
                    onClick={handleUpdateImage}
                    disabled={isSaving}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
                  >
                    {isSaving ? "Saving..." : "Save"}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setImage(user.image || "");
                      setEditImage(false);
                      setMessage("");
                    }}
                    disabled={isSaving}
                    className="rounded-lg border px-4 py-2 hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p
                    className="max-w-xs truncate font-medium"
                    title={user.image || ""}
                  >
                    {user.image || "No image URL"}
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setImage(user.image || "");
                      setEditImage(true);
                      setMessage("");
                    }}
                    className="rounded-lg border px-4 py-2 hover:bg-gray-100"
                  >
                    Edit Image
                  </button>
                </div>
              )}
            </div>

            {/* Email Verification */}
            <div>
              <p className="text-sm text-gray-500">Email Verified</p>
              <p className="font-medium">
                {user.emailVerified ? "Yes" : "No"}
              </p>
            </div>

            {/* Message */}
            {message && (
              <p className="text-sm text-red-600" aria-live="polite">
                {message}
              </p>
            )}
          </div>
        </div>

        {/* Sign Out */}
        <button
          type="button"
          onClick={handleSignOut}
          className="mt-8 rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
