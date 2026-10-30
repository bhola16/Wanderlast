
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { display } from "@/lib/fonts";
import { getTokenFromClient } from "@/lib/getTokenFromClient";
import { Save, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const categories = [
  "Beach",
  "Mountain",
  "City",
  "Adventure",
  "Cultural",
  "Wildlife",
];

const initialForm = {
  name: "",
  country: "",
  category: "",
  price: "",
  duration: "",
  departureDate: "",
  imageUrl: "",
  description: "",
};

type FormState = typeof initialForm;

const inputClass = "border-transparent bg-muted";

const AddDestinationPage = () => {
  const router = useRouter();

  const [formData, setFormData] = useState<FormState>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const updateField = (field: keyof FormState, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setMessage("");
  };

  const handleSubmit = async (
    event: React.SubmitEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setIsSubmitting(true);
    setMessage("");
    setIsSuccess(false);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_SERVER_API_URL;

      if (!apiUrl) {
        throw new Error("Server API URL is not configured.");
      }

      const token = await getTokenFromClient();

      if (!token) {
        throw new Error("No authentication token found. Please sign in again.");
      }

      const res = await fetch(`${apiUrl}/add-destination`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `BearerAdd ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const responseText = await res.text();
      let result: { message?: string; msg?: string; error?: string } | null =
        null;

      try {
        result = responseText ? JSON.parse(responseText) : null;
      } catch {
        // The API response was not JSON.
      }

      if (!res.ok) {
        console.error("Add destination failed:", {
          status: res.status,
          response: responseText,
        });

        throw new Error(
          result?.message ||
            result?.msg ||
            result?.error ||
            `Failed to add travel package (HTTP ${res.status}).`
        );
      }

      setIsSuccess(true);
      setMessage("Travel package added successfully!");
      setFormData(initialForm);

      router.refresh();
    } catch (error) {
      console.error("Error adding destination:", error);

      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setFormData(initialForm);
    setMessage("");
    setIsSuccess(false);
  };

  return (
    <main className="flex-1 bg-white px-4 py-10 md:px-6 md:py-14">
      <div className="mx-auto w-full max-w-2xl">
        <h1
          className={`${display.className} mb-8 text-4xl font-light text-neutral-900 md:text-5xl`}
        >
          Add New Travel Package
        </h1>

        <Card className="shadow-sm">
          <form onSubmit={handleSubmit}>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="name">Destination Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  placeholder="Bali Paradise"
                  className={inputClass}
                  required
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    value={formData.country}
                    onChange={(e) =>
                      updateField("country", e.target.value)
                    }
                    placeholder="Indonesia"
                    className={inputClass}
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) =>
                      updateField("category", value ?? "")
                    }
                  >
                    <SelectTrigger
                      id="category"
                      className={`w-full ${inputClass}`}
                    >
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>

                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="price">Price (USD)</Label>
                  <Input
                    id="price"
                    type="number"
                    min={0}
                    value={formData.price}
                    onChange={(e) =>
                      updateField("price", e.target.value)
                    }
                    placeholder="e.g., 1299"
                    className={inputClass}
                    required
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    value={formData.duration}
                    onChange={(e) =>
                      updateField("duration", e.target.value)
                    }
                    placeholder="e.g., 7 Days/6 Nights"
                    className={inputClass}
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="departure-date">Departure Date</Label>
                <Input
                  id="departure-date"
                  type="date"
                  value={formData.departureDate}
                  onChange={(e) =>
                    updateField("departureDate", e.target.value)
                  }
                  className={inputClass}
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="image-url">Image URL</Label>
                <Input
                  id="image-url"
                  type="url"
                  value={formData.imageUrl}
                  onChange={(e) =>
                    updateField("imageUrl", e.target.value)
                  }
                  placeholder="https://example.com/image.jpg"
                  className={inputClass}
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    updateField("description", e.target.value)
                  }
                  placeholder="Describe the travel experience..."
                  className={`min-h-32 ${inputClass}`}
                  required
                />
              </div>
            </CardContent>

            {message && (
              <p
                role="status"
                aria-live="polite"
                className={`px-6 pb-4 text-sm ${
                  isSuccess ? "text-green-600" : "text-red-600"
                }`}
              >
                {message}
              </p>
            )}

            <CardFooter className="justify-end gap-2 border-t-0 bg-transparent">
              <Button
                type="button"
                variant="destructive"
                onClick={handleCancel}
                disabled={isSubmitting}
                className="border border-destructive bg-transparent hover:bg-destructive/10"
              >
                <Trash2 />
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#4dbdd8] text-white hover:bg-[#3ab0cb]"
              >
                <Save />
                {isSubmitting ? "Adding..." : "Add Travel Package"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </main>
  );
};

export default AddDestinationPage;
