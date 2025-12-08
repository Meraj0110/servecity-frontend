"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  Mail,
  Phone,
  Smartphone,
  ShoppingBag,
  MapPin,
  User,
  HelpCircle,
  MessageCircle,
  Store,
  ArrowUpRight,
  LogOut,
} from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useProfile } from "@/hooks/useProfile";
import Image from "next/image";
import Link from "next/link";

import { useAuthStore } from "@/store/auth-store";
import { ArrowButton } from "@/widgets/ArrowButton/Button";

export default function ProfilePage() {
  const { data, isLoading, isError } = useProfile();
  const logout = useAuthStore((s) => s.logout);

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <p className="text-lg animate-pulse">Loading profile...</p>
      </div>
    );

  if (isError)
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <p className="text-red-500 text-lg">Failed to load profile.</p>
      </div>
    );

  const { user, profile, deviceId } = data;

  return (
    <AnimatedProfilePage
      name={profile?.fullName || "Unnamed User"}
      email={user.email}
      phone={profile?.phone || "Not added"}
      deviceId={deviceId}
      logout={logout}
      customerType={profile?.role || "User"}
      avatarUrl={profile?.avatar || ""}
    />
  );
}

/* -------------------------------------------------------------------------- */
/*                            Animated Profile Page                           */
/* -------------------------------------------------------------------------- */

interface ProfilePageProps {
  name: string;
  email: string;
  logout: any;
  phone: string;
  deviceId: string;
  customerType: string;
  avatarUrl: string;
  className?: string;
}

const AnimatedProfilePage: React.FC<ProfilePageProps> = ({
  name,
  email,
  logout,
  phone,
  deviceId,
  customerType,
  avatarUrl,
  className,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const shouldAnimate = !shouldReduceMotion;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  const avatarVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 200, damping: 20 },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 12, stiffness: 200 },
    },
  };

  const menuItems = [
    {
      icon: ShoppingBag,
      label: "Your Orders",
      href: "/orders",
      variant: "default" as const,
    },
    {
      icon: MapPin,
      label: "Your Addresses",
      href: "/address",
      variant: "outline" as const,
    },
    {
      icon: User,
      label: "Edit Profile",
      href: "/profile/edit",
      variant: "outline" as const,
    },
    {
      icon: HelpCircle,
      label: "FAQs",
      href: "/faqs",
      variant: "outline" as const,
    },
    {
      icon: MessageCircle,
      label: "Chat with Us",
      href: "/chat",
      variant: "outline" as const,
    },
    {
      icon: LogOut,
      label: "Logout",
      onClick: logout,
      variant: "ghost" as const,
    },
  ];

  const getCustomerTypeBadgeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "vendor":
        return "bg-yellow-100 text-yellow-700";
      case "admin":
        return "bg-red-100 text-red-700";
      case "premium":
        return "bg-violet-100 text-violet-700";
      default:
        return "bg-sky-100 text-sky-700";
    }
  };

  return (
    <div
      className={cn(
        "min-h-screen bg-gradient-to-b from-background via-background to-muted/20 p-4 md:p-8",
        className
      )}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-2xl mx-auto"
      >
        {/* Profile Card */}
        <motion.div variants={itemVariants}>
          <Card className="border-border/40 shadow-xl overflow-hidden backdrop-blur-sm bg-card/95">
            <div className="relative h-40 w-full overflow-hidden">
              <Image
                src="/rose.gif"
                alt="header background"
                fill
                className="object-cover"
                unoptimized
                priority
              />

              {/* same overlay so text + avatar looks clean */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            </div>

            <CardContent className="relative px-6 pb-8">
              {/* Avatar */}
              <motion.div
                variants={avatarVariants}
                className="flex justify-center -mt-16 mb-4"
              >
                <Avatar className="h-32 w-32 ring-4 ring-background shadow-2xl">
                  <AvatarImage src={avatarUrl} alt={name} />
                  <AvatarFallback className="text-3xl font-bold bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
                    {name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </motion.div>

              {/* Name with animation */}
              <motion.div className="text-center mb-2">
                <motion.h1
                  className="text-33xl font-bold text-foreground inline-flex"
                  variants={{
                    visible: { transition: { staggerChildren: 0.03 } },
                  }}
                >
                  {name.split("").map((letter, index) => (
                    <motion.span key={index} variants={letterVariants}>
                      {letter === " " ? "\u00A0" : letter}
                    </motion.span>
                  ))}
                </motion.h1>
              </motion.div>

              {/* Role Badge */}
              <motion.div
                variants={itemVariants}
                className="flex justify-center mb-6"
              >
                <Badge
                  className={cn(
                    "px-4 py-1.5 text-sm font-semibold",
                    getCustomerTypeBadgeColor(customerType)
                  )}
                >
                  {customerType}
                </Badge>
              </motion.div>

              {/* Contact Info */}
              <motion.div variants={itemVariants} className="space-y-3 mb-6">
                <InfoItem icon={Mail} text={email} />
                <InfoItem icon={Phone} text={phone} />
                <InfoItem icon={Smartphone} text={deviceId} mono />
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div variants={itemVariants} className="mt-6 space-y-3">
          {menuItems.map((item) => (
            <motion.div
              key={item.label}
              variants={itemVariants}
              whileHover={{
                scale: shouldAnimate ? 1.02 : 1,
                x: shouldAnimate ? 4 : 0,
              }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant={item.variant}
                className="w-full h-14 justify-start text-base font-medium shadow-sm hover:shadow-md"
                onClick={() => {
                  if (item.onClick) return item.onClick();
                  if (item.href) window.location.href = item.href;
                }}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.label}
              </Button>
            </motion.div>
          ))}

          {/* Become Vendor Button */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ArrowButton href="/vendor/add-vendor" buttonText="Become Vendor" />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

const InfoItem = ({
  icon: Icon,
  text,
  mono = false,
}: {
  icon: any;
  text: string;
  mono?: boolean;
}) => (
  <div className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors p-2 rounded-lg hover:bg-muted/50">
    <Icon className="w-5 h-5 flex-shrink-0" />
    <span className={cn("text-sm", mono && "font-mono")}>{text}</span>
  </div>
);
