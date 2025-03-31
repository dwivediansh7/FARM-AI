"use client"

import { useEffect } from "react"
import Link from "next/link"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/context/language-context"

export default function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { translate } = useLanguage()

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (isOpen && !target.closest("[data-mobile-menu]")) {
        onClose()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen, onClose])

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm" data-mobile-menu>
      <div className="fixed inset-y-0 right-0 w-[80%] max-w-sm bg-white dark:bg-gray-900 shadow-xl flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <span className="text-xl font-bold text-green-800 dark:text-green-400">FarmAI</span>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
            <span className="sr-only">Close menu</span>
          </Button>
        </div>

        <nav className="flex-1 overflow-auto p-4">
          <ul className="space-y-4">
            <li>
              <Link
                href="/"
                className="block py-2 px-4 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-md text-green-800 dark:text-green-400"
                onClick={onClose}
              >
                {translate("Home")}
              </Link>
            </li>
            <li>
              <Link
                href="/crop-recommendation"
                className="block py-2 px-4 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-md text-green-800 dark:text-green-400"
                onClick={onClose}
              >
                {translate("Crop Recommendation")}
              </Link>
            </li>
            <li>
              <Link
                href="/drone-mapping"
                className="block py-2 px-4 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-md text-green-800 dark:text-green-400"
                onClick={onClose}
              >
                {translate("Drone Mapping")}
              </Link>
            </li>
            <li>
              <Link
                href="/weather"
                className="block py-2 px-4 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-md text-green-800 dark:text-green-400"
                onClick={onClose}
              >
                {translate("Weather")}
              </Link>
            </li>
            <li>
              <Link
                href="/resources"
                className="block py-2 px-4 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-md text-green-800 dark:text-green-400"
                onClick={onClose}
              >
                {translate("Resources")}
              </Link>
            </li>
            <li>
              <Link
                href="/market"
                className="block py-2 px-4 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-md text-green-800 dark:text-green-400"
                onClick={onClose}
              >
                {translate("Market")}
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="block py-2 px-4 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-md text-green-800 dark:text-green-400"
                onClick={onClose}
              >
                {translate("Contact")}
              </Link>
            </li>
          </ul>
        </nav>

        <div className="p-4 border-t">
          <Button className="w-full bg-green-600 hover:bg-green-700">{translate("Login")}</Button>
        </div>
      </div>
    </div>
  )
}

