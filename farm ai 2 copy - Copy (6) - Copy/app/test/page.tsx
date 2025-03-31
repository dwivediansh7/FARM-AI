"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { toast } from "react-hot-toast"

export default function TestPage() {
  return (
    <div className="p-4">
      <Button
        onClick={() => {
          toast.success("Everything is working!")
        }}
      >
        Test Components
      </Button>

      <Dialog>
        <DialogTrigger asChild>
          <Button className="ml-4">Open Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Test Dialog</DialogTitle>
            <DialogDescription>
              Testing if dialog component works correctly.
            </DialogDescription>
          </DialogHeader>
          <Input placeholder="Test input component" />
        </DialogContent>
      </Dialog>
    </div>
  )
} 