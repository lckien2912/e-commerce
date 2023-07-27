"use client";

import { useState } from "react";
import { AlignJustify } from "lucide-react";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import MainNav from "./main-nav";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="flex items-center lg:hidden mr-4 sm:py-1 sm:px-2 p-0">
        <AlignJustify size={20} />
      </DialogTrigger>
      <DialogContent className="h-full max-w-[250px] justify-start left-0 translate-x-0">
        <MainNav
          onOpenChange={() => setIsOpen(false)}
          className="flex flex-col items-start mt-4 gap-3 space-x-0"
        />
      </DialogContent>
    </Dialog>
  );
};

export default MobileMenu;
