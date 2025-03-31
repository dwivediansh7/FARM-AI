"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { useTranslation } from "@/contexts/translation-context"

export default function MobileMenu() {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { name: t("home"), href: "/" },
    { name: t("crop-recommendation"), href: "/crop-recommendation" },
    { name: t("drone-mapping"), href: "/drone-mapping" },
    { name: t("weather"), href: "/weather" },
    { name: t("resources"), href: "/resources" },
    { name: t("market"), href: "/market" },
    { name: t("contact"), href: "/contact" },
  ]

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="md:hidden">
          <span className="sr-only">Menu</span>
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle className="text-left flex items-center gap-2">
            <span className="text-xl font-bold text-green-800">FarmAI</span>
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-4 mt-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-green-800 hover:text-green-600 font-medium py-2 border-b border-gray-100"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}

