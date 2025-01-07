"use client";
import React, { useState, useEffect } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/nav-menu";
import { cn } from "@/lib/utils";

type Comp = {
  id: string;
  name: string;
};

export function NavBar() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2" />
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const [savedComps, setSavedComps] = useState<Comp[]>([]);

  useEffect(() => {
    const comps = JSON.parse(localStorage.getItem("tftComps") || "[]");
    setSavedComps(comps);
  }, []);

  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="Home">
          <HoveredLink href="/comps">Go to Homepage</HoveredLink>
        </MenuItem>
      </Menu>
    </div>
  );
}
