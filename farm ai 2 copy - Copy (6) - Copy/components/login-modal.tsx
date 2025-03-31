"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useTranslation } from "@/contexts/translation-context"

export default function LoginModal() {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isRegistering, setIsRegistering] = useState(false)

  // Login form state
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  // Registration form state
  const [fullName, setFullName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsOpen(false)
      // In a real app, you would handle authentication here
      alert("Login successful!")
    }, 1500)
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsOpen(false)
      // In a real app, you would handle registration here
      alert("Registration successful! You can now login with your credentials.")
    }, 1500)
  }

  const resetForm = () => {
    setEmail("")
    setPassword("")
    setFullName("")
    setPhoneNumber("")
    setConfirmPassword("")
  }

  const toggleMode = () => {
    resetForm()
    setIsRegistering(!isRegistering)
  }

  return (
    <>
      <Button className="bg-green-600 hover:bg-green-700" onClick={() => setIsOpen(true)}>
        {t("login")}
      </Button>

      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          setIsOpen(open)
          if (!open) {
            resetForm()
            setIsRegistering(false)
          }
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          {!isRegistering ? (
            <>
              <DialogHeader>
                <DialogTitle>{t("login-title")}</DialogTitle>
                <DialogDescription>{t("login-subtitle")}</DialogDescription>
              </DialogHeader>

              <form onSubmit={handleLogin} className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="email">{t("email")}</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">{t("password")}</Label>
                    <Button variant="link" className="p-0 h-auto text-sm text-green-600">
                      {t("forgot-password")}
                    </Button>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <DialogFooter className="pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                    {t("cancel")}
                  </Button>
                  <Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={isLoading}>
                    {isLoading ? "Loading..." : t("login")}
                  </Button>
                </DialogFooter>
              </form>

              <div className="border-t pt-4 text-center">
                <p className="text-sm text-gray-500">{t("dont-have-account")}</p>
                <Button variant="link" className="text-green-600" onClick={toggleMode}>
                  {t("register-now")}
                </Button>
              </div>
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>{t("register-title")}</DialogTitle>
                <DialogDescription>{t("register-subtitle")}</DialogDescription>
              </DialogHeader>

              <form onSubmit={handleRegister} className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">{t("full-name")}</Label>
                  <Input
                    id="fullName"
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="regEmail">{t("email")}</Label>
                  <Input
                    id="regEmail"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">{t("phone-number")}</Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="regPassword">{t("password")}</Label>
                  <Input
                    id="regPassword"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">{t("confirm-password")}</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>

                <DialogFooter className="pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                    {t("cancel")}
                  </Button>
                  <Button type="submit" className="bg-green-600 hover:bg-green-700" disabled={isLoading}>
                    {isLoading ? "Loading..." : t("register")}
                  </Button>
                </DialogFooter>
              </form>

              <div className="border-t pt-4 text-center">
                <p className="text-sm text-gray-500">{t("already-have-account")}</p>
                <Button variant="link" className="text-green-600" onClick={toggleMode}>
                  {t("login-instead")}
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

