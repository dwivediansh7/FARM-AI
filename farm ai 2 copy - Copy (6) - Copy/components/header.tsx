"use client"

import Link from "next/link"
import { Tractor } from "lucide-react"
import { useTranslation } from "@/contexts/translation-context"
import LanguageSelector from "@/components/language-selector"
import LoginModal from "@/components/login-modal"
import MobileMenu from "@/components/mobile-menu"

export default function Header() {
  const { t } = useTranslation()

  return (
    <header className="container mx-auto py-4 px-4 md:px-6 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Tractor className="h-8 w-8 text-green-600" />
        <span className="text-xl font-bold text-green-800">FarmAI</span>
      </div>
      <nav className="hidden md:flex items-center gap-6">
        <Link href="/" className="text-green-800 hover:text-green-600 font-medium">
          {t("home")}
        </Link>
        <Link href="/crop-recommendation" className="text-green-800 hover:text-green-600 font-medium">
          {t("crop-recommendation")}
        </Link>
        <Link href="/drone-mapping" className="text-green-800 hover:text-green-600 font-medium">
          {t("drone-mapping")}
        </Link>
        <Link href="/weather" className="text-green-800 hover:text-green-600 font-medium">
          {t("weather")}
        </Link>
        <Link href="/resources" className="text-green-800 hover:text-green-600 font-medium">
          {t("resources")}
        </Link>
        <Link href="/market" className="text-green-800 hover:text-green-600 font-medium">
          {t("market")}
        </Link>
        <Link href="/contact" className="text-green-800 hover:text-green-600 font-medium">
          {t("contact")}
        </Link>
      </nav>
      <div className="flex items-center gap-4">
        <LanguageSelector />
        <LoginModal />
        <MobileMenu />
      </div>
    </header>
  )
}

