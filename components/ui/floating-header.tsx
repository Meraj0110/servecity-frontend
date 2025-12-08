"use client";
import React from "react";
import { Grid2x2PlusIcon, MenuIcon, ShoppingCart } from "lucide-react";
import { Sheet, SheetContent, SheetFooter } from "@/components/ui/sheet";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import ProfileButton from "@/widgets/ProfileButton";
import { useAuthStore } from "@/store/auth-store"; // ✅ Add this

export function FloatingHeader({
  isAuthenticated,
  profile,
}: {
  isAuthenticated: boolean;
  profile: any;
}) {
  const [open, setOpen] = React.useState(false);

  const logout = useAuthStore((s) => s.logout); // ✅ Use same logout function

  const links = [
    {
      label: "All Categories",
      href: "/all-categories",
    },
    {
      label: "Your Orders",
      isAuth: true,
      href: "/orders",
    },
    {
      label: "Cart",
      isAuth: true,
      href: "/cart",
    },
    {
      label: "About Us",
      href: "/about-us",
    },
  ];

  return (
    <div className="">
      <header
        className={cn(
          "sticky top-5 z-50",
          "mx-auto w-full max-w-3xl rounded-lg border shadow",
          "bg-background/95 supports-[backdrop-filter]:bg-background/80 backdrop-blur-lg"
        )}
      >
        <nav className="mx-auto flex items-center justify-between p-1.5">
          {/* LEFT LOGO */}
          <Link href="/">
            <div className="hover:bg-accent flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 duration-100">
              <Grid2x2PlusIcon className="size-5" />
              <p className="font-mono text-base font-bold">ServeCity</p>
            </div>
          </Link>

          {/* DESKTOP LINKS */}
          <div className="hidden items-center gap-1 lg:flex">
            {links.map((link) =>
              link.isAuth ? (
                isAuthenticated && (
                  <Link href={link.href} key={link.href}>
                    <span
                      className={buttonVariants({
                        variant: "ghost",
                        size: "sm",
                      })}
                    >
                      {link.label}
                    </span>
                  </Link>
                )
              ) : (
                <Link href={link.href} key={link.href}>
                  <span
                    className={buttonVariants({ variant: "ghost", size: "sm" })}
                  >
                    {link.label}
                  </span>
                </Link>
              )
            )}

            {isAuthenticated && (
              <button
                onClick={logout} // ✅ FIXED
                className={buttonVariants({ variant: "ghost", size: "sm" })}
              >
                Logout
              </button>
            )}
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-2">
            {!isAuthenticated ? (
              <Link href="/login">
                <Button size="sm">Login</Button>
              </Link>
            ) : (
              <ProfileButton profileImage={profile?.avatar} />
            )}

            {/* MOBILE MENU */}
            <Sheet open={open} onOpenChange={setOpen}>
              <Button
                size="icon"
                variant="outline"
                onClick={() => setOpen(!open)}
                className="lg:hidden"
              >
                <MenuIcon className="size-4" />
              </Button>

              <SheetContent
                className="bg-background/95 supports-[backdrop-filter]:bg-background/80 gap-0 backdrop-blur-lg"
                showClose={false}
                side="left"
              >
                <div className="grid gap-y-2 overflow-y-auto px-4 pt-12 pb-5">
                  {links.map((link) => (
                    <Link href={link.href} key={link.href}>
                      <span
                        className={buttonVariants({
                          variant: "ghost",
                          className: "justify-start",
                        })}
                      >
                        {link.label}
                      </span>
                    </Link>
                  ))}

                  {!isAuthenticated && (
                    <Link href="/login">
                      <span
                        className={buttonVariants({
                          variant: "ghost",
                          className: "justify-start",
                        })}
                      >
                        Login
                      </span>
                    </Link>
                  )}

                  {isAuthenticated && (
                    <>
                      <Link href="/profile">
                        <span
                          className={buttonVariants({
                            variant: "ghost",
                            className: "justify-start",
                          })}
                        >
                          Profile
                        </span>
                      </Link>

                      <button
                        onClick={logout} // ✅ FIXED
                        className={buttonVariants({
                          variant: "ghost",
                          className: "justify-start",
                        })}
                      >
                        Logout
                      </button>
                    </>
                  )}
                </div>

                <SheetFooter>Serve City</SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </header>
    </div>
  );
}
