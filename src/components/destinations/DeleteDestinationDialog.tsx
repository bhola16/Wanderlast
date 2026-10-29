
"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { getTokenFromClient } from "@/lib/getTokenFromClient";

const DeleteDestinationDialog = ({ id }:{id:string}) => {
  const router = useRouter();


  const handleDeleteDestination = async () => {
    const token = await getTokenFromClient();

    try {
      const res = await fetch(
        `http://localhost:8000/destinations/${id}`,
        {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${token}`
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to delete destination");
      }

      router.push("/destinations");
      router.refresh();
    } catch (error) {
      console.error("Error deleting destination:", error);
      alert("Failed to delete destination. Please try again.");
    }
  };

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger
          render={
            <Button className="flex items-center gap-2 rounded-lg border border-red-200 bg-white px-4 py-4 text-sm font-medium text-red-600 transition hover:bg-red-50">
              <X size={17} />
              Delete
            </Button>
          }
        />
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently
              delete your information from the server.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteDestination}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DeleteDestinationDialog;
