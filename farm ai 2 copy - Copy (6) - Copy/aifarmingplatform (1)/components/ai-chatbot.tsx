"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Bot, Send, X, Minimize2, Tractor } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { useLanguage } from "@/context/language-context"
import { useChat } from "ai/react"

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { translate, currentLanguage } = useLanguage()

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
    initialMessages: [
      {
        id: "welcome",
        role: "assistant",
        content: "Hello! I'm your AI farming assistant. How can I help you today with your farming needs?",
      },
    ],
  })

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  const toggleChat = () => {
    if (isMinimized) {
      setIsMinimized(false)
    } else {
      setIsOpen(!isOpen)
    }
  }

  const minimizeChat = () => {
    setIsMinimized(true)
  }

  const closeChat = () => {
    setIsOpen(false)
    setIsMinimized(false)
  }

  const handleChatSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleSubmit(e)
  }

  if (!isOpen) {
    return (
      <Button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg bg-green-600 hover:bg-green-700 z-40"
      >
        <Bot className="h-6 w-6" />
        <span className="sr-only">Open AI Chatbot</span>
      </Button>
    )
  }

  return (
    <div
      className={`fixed bottom-6 right-6 z-40 transition-all duration-300 ease-in-out ${
        isMinimized ? "w-auto h-auto" : "w-[350px] sm:w-[400px]"
      }`}
    >
      {isMinimized ? (
        <Button
          onClick={toggleChat}
          className="rounded-full shadow-lg bg-green-600 hover:bg-green-700 flex items-center gap-2 px-4"
        >
          <Bot className="h-5 w-5" />
          <span>{translate("AI Assistant")}</span>
        </Button>
      ) : (
        <Card className="border-green-200 shadow-xl h-[500px] flex flex-col">
          <CardHeader className="p-3 border-b flex flex-row items-center justify-between space-y-0">
            <div className="flex items-center gap-2">
              <Tractor className="h-5 w-5 text-green-600" />
              <span className="font-medium">{translate("AI Farming Assistant")}</span>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={minimizeChat}>
                <Minimize2 className="h-4 w-4" />
                <span className="sr-only">Minimize</span>
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={closeChat}>
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === "user"
                      ? "bg-green-600 text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </CardContent>
          <CardFooter className="p-3 border-t">
            <form onSubmit={handleChatSubmit} className="flex w-full gap-2">
              <Input
                placeholder={translate("Type your farming question...")}
                value={input}
                onChange={handleInputChange}
                className="flex-1"
              />
              <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                <Send className="h-4 w-4" />
                <span className="sr-only">Send</span>
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}

