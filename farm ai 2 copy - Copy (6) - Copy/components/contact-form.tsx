"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
    }, 1500)
  }

  if (isSubmitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
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
            className="text-green-600"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>
        <h3 className="text-lg font-medium text-green-800 mb-2">Message Sent Successfully!</h3>
        <p className="text-gray-600 mb-4">Thank you for reaching out. Our team will get back to you within 24 hours.</p>
        <Button
          variant="outline"
          className="border-green-600 text-green-600 hover:bg-green-50"
          onClick={() => setIsSubmitted(false)}
        >
          Send Another Message
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" placeholder="Enter your name" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input id="phone" placeholder="Enter your phone number" required />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input id="email" type="email" placeholder="Enter your email address" required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject">Subject</Label>
        <Select defaultValue="general">
          <SelectTrigger id="subject">
            <SelectValue placeholder="Select a subject" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="general">General Inquiry</SelectItem>
            <SelectItem value="technical">Technical Support</SelectItem>
            <SelectItem value="account">Account Issues</SelectItem>
            <SelectItem value="feedback">Feedback</SelectItem>
            <SelectItem value="partnership">Partnership Opportunities</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" placeholder="Please describe your query or issue in detail" rows={5} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="language">Preferred Language for Response</Label>
        <Select defaultValue="english">
          <SelectTrigger id="language">
            <SelectValue placeholder="Select your preferred language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="english">English</SelectItem>
            <SelectItem value="hindi">Hindi</SelectItem>
            <SelectItem value="punjabi">Punjabi</SelectItem>
            <SelectItem value="bengali">Bengali</SelectItem>
            <SelectItem value="telugu">Telugu</SelectItem>
            <SelectItem value="tamil">Tamil</SelectItem>
            <SelectItem value="marathi">Marathi</SelectItem>
            <SelectItem value="gujarati">Gujarati</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-start gap-2 mt-4">
        <input type="checkbox" id="consent" className="mt-1" required />
        <Label htmlFor="consent" className="text-sm text-gray-600">
          I consent to FarmAI processing my personal data in accordance with the Privacy Policy.
        </Label>
      </div>

      <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  )
}

