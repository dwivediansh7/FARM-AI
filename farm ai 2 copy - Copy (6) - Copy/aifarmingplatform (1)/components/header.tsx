"use client"

import { useState } from "react"
import Link from "next/link"
import { Tractor } from "lucide-react"
import { Button } from "@/components/ui/button"
import LanguageSelector from "@/components/language-selector"
import MobileMenu from "@/components/mobile-menu"
import { useLanguage } from "@/context/language-context"

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { translate } = useLanguage()

  return (
    <>
      <header className="container mx-auto py-4 px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Tractor className="h-8 w-8 text-green-600" />
          <span className="text-xl font-bold text-green-800">FarmAI</span>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-green-800 hover:text-green-600 font-medium">
            {translate("Home")}
          </Link>
          <Link href="/crop-recommendation" className="text-green-800 hover:text-green-600 font-medium">
            {translate("Crop Recommendation")}
          </Link>
          <Link href="/drone-mapping" className="text-green-800 hover:text-green-600 font-medium">
            {translate("Drone Mapping")}
          </Link>
          <Link href="/weather" className="text-green-800 hover:text-green-600 font-medium">
            {translate("Weather")}
          </Link>
          <Link href="/resources" className="text-green-800 hover:text-green-600 font-medium">
            {translate("Resources")}
          </Link>
          <Link href="/market" className="text-green-800 hover:text-green-600 font-medium">
            {translate("Market")}
          </Link>
          <Link href="/contact" className="text-green-800 hover:text-green-600 font-medium">
            {translate("Contact")}
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <LanguageSelector />
          <Button className="bg-green-600 hover:bg-green-700">{translate("Login")}</Button>
          <Button variant="outline" className="md:hidden" onClick={() => setIsMobileMenuOpen(true)}>
            <span className="sr-only">Menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </Button>
        </div>
      </header>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  )
}

