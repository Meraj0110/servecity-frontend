// app/logout/page.tsx (or any route you want)

"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { Button } from "@/components/ui/button";
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

export default function LogoutPage() {
  const router = useRouter();
  const logout = useAuthStore((s) => s.logout);

  const handleLogout = () => {
    logout(); // clear Zustand auth state
    router.replace("/login"); // redirect to login
  };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
      <div className="bg-white dark:bg-neutral-800 shadow-xl rounded-xl p-8 w-full max-w-sm text-center">
        <h1 className="text-2xl font-semibold mb-3">Logout</h1>
        <p className="text-neutral-500 mb-6">
          Are you sure you want to logout from your account?
        </p>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="destructive"
              className="w-full py-3 text-base rounded-lg"
            >
              Logout
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
              <AlertDialogDescription>
                You will be logged out of your account and redirected to login.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel className="rounded-lg">
                Cancel
              </AlertDialogCancel>

              <AlertDialogAction
                onClick={handleLogout}
                className="rounded-lg bg-red-600 hover:bg-red-700"
              >
                Logout
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
