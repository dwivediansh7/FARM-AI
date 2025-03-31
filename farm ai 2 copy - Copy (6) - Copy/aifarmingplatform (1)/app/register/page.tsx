"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useLanguage } from "@/context/language-context"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    farmerType: "",
    landSize: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [agreeTerms, setAgreeTerms] = useState(false)
  const router = useRouter()
  const { translate } = useLanguage()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    // Validate form
    if (!agreeTerms) {
      setError("You must agree to the terms and conditions")
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setIsLoading(true)

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // In a real app, you would make an API call to register the user
      // For demo purposes, we'll just redirect to the login page
      router.push("/login")
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-green-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <Link href="/" className="inline-flex items-center text-green-700 hover:text-green-800 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {translate("Back to Home")}
        </Link>

        <Card className="w-full">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center text-green-800">
              {translate("Create an Account")}
            </CardTitle>
            <CardDescription className="text-center">
              {translate("Join FarmAI to access AI-powered farming solutions")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded-md mb-4">
                {translate(error)}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{translate("Full Name")}</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={translate("Enter your full name")}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">{translate("Phone Number")}</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={translate("Enter your phone number")}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">{translate("Email Address")}</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={translate("Enter your email address")}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">{translate("Password")}</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">{translate("Confirm Password")}</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="farmerType">{translate("Farmer Type")}</Label>
                  <Select
                    value={formData.farmerType}
                    onValueChange={(value) => handleSelectChange("farmerType", value)}
                  >
                    <SelectTrigger id="farmerType">
                      <SelectValue placeholder={translate("Select farmer type")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="smallholder">{translate("Smallholder Farmer")}</SelectItem>
                      <SelectItem value="commercial">{translate("Commercial Farmer")}</SelectItem>
                      <SelectItem value="organic">{translate("Organic Farmer")}</SelectItem>
                      <SelectItem value="cooperative">{translate("Farming Cooperative")}</SelectItem>
                      <SelectItem value="other">{translate("Other")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="landSize">{translate("Land Size (in acres)")}</Label>
                  <Input
                    id="landSize"
                    name="landSize"
                    type="text"
                    value={formData.landSize}
                    onChange={handleChange}
                    placeholder={translate("Enter land size")}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={agreeTerms}
                  onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                />
                <label
                  htmlFor="terms"
                  className="text-sm text-gray-600 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {translate("I agree to the")}{" "}
                  <Link href="/terms" className="text-green-600 hover:text-green-800 font-medium">
                    {translate("Terms of Service")}
                  </Link>{" "}
                  {translate("and")}{" "}
                  <Link href="/privacy" className="text-green-600 hover:text-green-800 font-medium">
                    {translate("Privacy Policy")}
                  </Link>
                </label>
              </div>

              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {translate("Creating Account...")}
                  </>
                ) : (
                  translate("Create Account")
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <div className="text-center text-sm">
              {translate("Already have an account?")}{" "}
              <Link href="/login" className="text-green-600 hover:text-green-800 font-medium">
                {translate("Login")}
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

