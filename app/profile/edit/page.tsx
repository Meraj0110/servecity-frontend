"use client";

import { useState } from "react";
import { useProfile } from "@/hooks/useProfile";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/lib/api";

export default function EditProfilePage() {
  const { data, isLoading } = useProfile();
  const router = useRouter();

  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <p className="animate-pulse text-lg">Loading...</p>
      </div>
    );

  // Prefill default values
  const profile = data.profile;

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAvatar(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("userName", userName || profile.fullName || "");
    formData.append("phone", phone || profile.phone || "");
    if (avatar) formData.append("avatar", avatar);

    try {
      const res = api.put("auth/profile/edit", formData);

      if (!(await res).data) {
        throw new Error("Profile update failed");
      }

      router.push("/profile");
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 px-4">
      <Card className="rounded-2xl shadow-md">
        <CardHeader className="text-center">
          <CardTitle className="text-xl font-bold">Edit Profile</CardTitle>
        </CardHeader>

        <CardContent>
          <form className="space-y-6 mt-4" onSubmit={handleSubmit}>
            {/* Avatar Upload */}
            <div className="flex flex-col items-center gap-3">
              <Avatar className="w-24 h-24">
                <AvatarImage src={preview || profile.avatar || ""} />
                <AvatarFallback className="bg-gray-200 text-xl">
                  {profile.fullName
                    ? profile.fullName.charAt(0).toUpperCase()
                    : data.user.email.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div>
                <Label className="cursor-pointer bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800">
                  Change Avatar
                  <Input
                    type="file"
                    className="hidden"
                    onChange={handleAvatarChange}
                    accept="image/*"
                  />
                </Label>
              </div>
            </div>

            {/* Full Name */}
            <div className="space-y-1">
              <Label>Full Name</Label>
              <Input
                placeholder="Enter full name"
                defaultValue={profile.fullName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

            {/* Phone */}
            <div className="space-y-1">
              <Label>Phone Number</Label>
              <Input
                placeholder="Enter phone number"
                defaultValue={profile.phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="w-full bg-black text-white hover:bg-gray-800"
            >
              Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
