"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAddresses } from "@/hooks/address/useGetAddresses";
import { useEditAddress } from "@/hooks/address/useEditAddress";
import { useDeleteAddress } from "@/hooks/address/useDeleteAddress";
import { cn } from "@/lib/utils";
import { useAddAddress } from "@/hooks/address/useAddAddress";

// ---------------- STATES ---------------- //
const states: string[] = [
  "Andaman and Nicobar Islands",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra and Nagar Haveli",
  "Daman and Diu",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu",
  "Jharkhand",
  "Karnataka",
  "Kashmir",
  "Kerala",
  "Ladakh",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttarakhand",
  "Uttar Pradesh",
  "West Bengal",
];

// ---------------- MAIN PAGE ---------------- //
export default function AddressPage() {
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    roadStreet: "",
    landmark: "",
    pinCode: "",
    city: "",
    state: "",
  });

  const { data, isLoading } = useGetAddresses();
  const editMutation = useEditAddress();
  const deleteMutation = useDeleteAddress();

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const addMutation = useAddAddress();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      fullName: form.fullName.trim(),
      phone: String(form.phone),
      street: form.roadStreet.trim(),
      landmark: form.landmark.trim(),
      pinCode: String(form.pinCode),
      city: form.city.trim(),
      state: form.state,
    };

    addMutation.mutate(payload);

    // Clear form
    setForm({
      fullName: "",
      phone: "",
      roadStreet: "",
      landmark: "",
      pinCode: "",
      city: "",
      state: "",
    });
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* FORM */}
      <div className="mt-10 shadow-input w-full max-w-md bg-white dark:bg-black rounded-2xl p-6">
        <h2 className="text-xl font-bold">Add New Address</h2>
        <p className="mt-1 text-sm text-neutral-600">Enter address details.</p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <Field label="Full Name">
            <Input
              value={form.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
            />
          </Field>

          <Field label="Phone Number">
            <Input
              type="number"
              value={form.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
          </Field>

          <Field label="Road / Street">
            <Input
              value={form.roadStreet}
              onChange={(e) => handleChange("roadStreet", e.target.value)}
            />
          </Field>

          <Field label="Landmark">
            <Input
              value={form.landmark}
              onChange={(e) => handleChange("landmark", e.target.value)}
            />
          </Field>

          <Field label="Pincode">
            <Input
              type="number"
              value={form.pinCode}
              onChange={(e) => handleChange("pinCode", e.target.value)}
            />
          </Field>

          <Field label="City">
            <Input
              value={form.city}
              onChange={(e) => handleChange("city", e.target.value)}
            />
          </Field>

          <Field label="State">
            <Select
              autoComplete="off"
              value={form.state}
              onValueChange={(value) => handleChange("state", value)}
            >
              <SelectTrigger data-autocompletetype="off">
                <SelectValue placeholder="Select State" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>States</SelectLabel>
                  {states.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>

          <button
            type="submit"
            className="w-full mt-4 h-10 rounded-md bg-black text-white font-medium"
          >
            Save Address
          </button>
        </form>
      </div>

      {/* ADDRESS LIST */}
      <div className="w-full max-w-md mt-10">
        <h2 className="text-lg font-bold mb-4">Your Addresses</h2>

        {isLoading && <p>Loading...</p>}

        {data?.length === 0 && (
          <p className="text-sm text-neutral-500">No addresses added.</p>
        )}

        {data?.map((addr: any) => (
          <AddressCard
            key={addr.id}
            addr={addr}
            onEdit={editMutation.mutate}
            onDelete={() => deleteMutation.mutate(addr.id)}
          />
        ))}
      </div>
    </div>
  );
}

// ---------------- FIELD WRAPPER ---------------- //
function Field({ label, children }: any) {
  return (
    <div className="flex flex-col space-y-1">
      <Label>{label}</Label>
      {children}
    </div>
  );
}

// ---------------- ADDRESS CARD ---------------- //
function AddressCard({ addr, onEdit, onDelete }: any) {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState(addr);

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const saveChanges = () => {
    let updates: any = { addressId: addr.id };

    Object.keys(form).forEach((key) => {
      if (form[key] !== addr[key] && key !== "id") {
        updates[key] = form[key];
      }
    });

    updates = Object.fromEntries(
      Object.entries(updates).map(([k, v]) => [k, String(v)])
    );

    onEdit(updates);
  };

  return (
    <div className="border p-4 rounded-lg shadow-sm mb-4">
      {isEditing ? (
        <div className="space-y-2">
          <Input
            value={form.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
          />
          <Input
            value={form.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
          <Input
            value={form.roadStreet}
            onChange={(e) => handleChange("roadStreet", e.target.value)}
          />
          <Input
            value={form.landmark}
            onChange={(e) => handleChange("landmark", e.target.value)}
          />
          <Input
            value={form.pinCode}
            onChange={(e) => handleChange("pinCode", e.target.value)}
          />
          <Input
            value={form.city}
            onChange={(e) => handleChange("city", e.target.value)}
          />
          <Input
            value={form.state}
            onChange={(e) => handleChange("state", e.target.value)}
          />

          <div className="flex gap-4 mt-2">
            <button className="text-blue-600 text-sm" onClick={saveChanges}>
              Save
            </button>
            <button
              className="text-red-600 text-sm"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <p>
            <b>Name:</b> {addr.fullName}
          </p>
          <p>
            <b>Phone:</b> {addr.phone}
          </p>
          <p>
            <b>Street:</b> {addr.roadStreet}
          </p>
          <p>
            <b>Landmark:</b> {addr.landmark}
          </p>
          <p>
            <b>Pincode:</b> {addr.pinCode}
          </p>
          <p>
            <b>City:</b> {addr.city}
          </p>
          <p>
            <b>State:</b> {addr.state}
          </p>

          <div className="flex gap-4 mt-3">
            <button
              className="text-blue-600 text-sm"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
            <button className="text-red-600 text-sm" onClick={onDelete}>
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}
