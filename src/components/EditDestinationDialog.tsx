"use client";

import { CardContent, CardFooter } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
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
import { Pencil, Save, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";

interface Destination {
  _id: string;
  name: string;
  country: string;
  category: string;
  price: string;
  duration: string;
  departureDate: string;
  imageUrl: string;
  description: string;
  rating: number;
}

interface EditDestinationDialogProps {
  destination: Destination;
}

type DestinationFormData = Omit<Destination, "_id" | "rating">;

const categories = [
  "Beach",
  "Adventure",
  "Cultural",
  "Nature",
  "City",
  "Luxury",
];

const inputClass = "border-gray-300 focus-visible:ring-[#4dbdd8]";

const initialForm = (
  destination: Destination
): DestinationFormData => ({
  name: destination.name ?? "",
  country: destination.country ?? "",
  category: destination.category ?? "",
  price: String(destination.price ?? ""),
  duration: destination.duration ?? "",
  departureDate: destination.departureDate ?? "",
  imageUrl: destination.imageUrl ?? "",
  description: destination.description ?? "",
});

const EditDestinationDialog = ({
  destination,
}: EditDestinationDialogProps) => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<DestinationFormData>(
    () => initialForm(destination)
  );

  useEffect(() => {
    setFormData(initialForm(destination));
  }, [destination]);

  const updateField = (
    field: keyof DestinationFormData,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCancel = () => {
    setFormData(initialForm(destination));
    setOpen(false);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!destination?._id) {
      alert("Destination information is missing.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        `http://localhost:8000/destinations/${destination._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            price: Number(formData.price),
          }),
        }
      );

      if (!res.ok) {
  const errorText = await res.text();

  console.error("Status:", res.status);
  console.error("Backend error:", errorText);

  throw new Error(`Update failed: ${res.status} - ${errorText}`);
}

      setOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Error updating destination:", error);
      alert("Failed to update destination. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="inline-flex items-center justify-center gap-2 rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium transition hover:bg-gray-100">
        <Pencil size={16} />
        Edit
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Destination</DialogTitle>
          <DialogDescription>
            Update the destination information below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="flex flex-col gap-4 px-0">
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
                  onChange={(e) => updateField("country", e.target.value)}
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
                  onChange={(e) => updateField("price", e.target.value)}
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
                  onChange={(e) => updateField("duration", e.target.value)}
                  placeholder="e.g., 7 Days/6 Nights"
                  className={inputClass}
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="departureDate">Departure Date</Label>
              <Input
                id="departureDate"
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
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input
                id="imageUrl"
                type="url"
                value={formData.imageUrl}
                onChange={(e) => updateField("imageUrl", e.target.value)}
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
                onChange={(e) => updateField("description", e.target.value)}
                placeholder="Describe the travel experience..."
                className={`min-h-32 ${inputClass}`}
                required
              />
            </div>
          </CardContent>

          <CardFooter className="justify-end gap-2 border-t-0 bg-transparent px-0 pb-0">
            <button
              type="button"
              onClick={handleCancel}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-md border border-gray-200 px-4 py-2 text-sm font-medium transition hover:bg-gray-100 disabled:opacity-50"
            >
              <X size={16} />
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-[#4dbdd8] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#3ab0cb] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Save size={16} />
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </CardFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditDestinationDialog;