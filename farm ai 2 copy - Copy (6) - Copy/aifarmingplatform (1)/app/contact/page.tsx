import { ArrowLeft, Mail, MessageSquare, Phone } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import ContactForm from "@/components/contact-form"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-green-50">
      <div className="container mx-auto py-8 px-4 md:px-6">
        <Link href="/" className="inline-flex items-center text-green-700 hover:text-green-800 mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>

        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-green-800 mb-4">Contact & Support</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Have questions or need assistance? Our team is here to help you get the most out of our AI-powered farming
              platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <Card className="bg-white border-green-100">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <Phone className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="font-medium text-green-700 mb-2">Call Us</h3>
                <p className="text-gray-600 mb-4">Our helpline is available from 8 AM to 8 PM, seven days a week.</p>
                <a href="tel:+911234567890" className="text-green-600 font-medium">
                  +91 123 456 7890
                </a>
              </CardContent>
            </Card>

            <Card className="bg-white border-green-100">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <Mail className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="font-medium text-green-700 mb-2">Email Us</h3>
                <p className="text-gray-600 mb-4">Send us an email and we'll get back to you within 24 hours.</p>
                <a href="mailto:support@farmai.com" className="text-green-600 font-medium">
                  support@farmai.com
                </a>
              </CardContent>
            </Card>

            <Card className="bg-white border-green-100">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                  <MessageSquare className="h-5 w-5 text-green-600" />
                </div>
                <h3 className="font-medium text-green-700 mb-2">Chat Support</h3>
                <p className="text-gray-600 mb-4">Chat with our AI assistant or request to speak with a human agent.</p>
                <Button className="bg-green-600 hover:bg-green-700">Start Chat</Button>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-bold text-green-800 mb-6">Send Us a Message</h2>
              <ContactForm />
            </div>

            <div>
              <h2 className="text-xl font-bold text-green-800 mb-6">Visit Our Office</h2>
              <div className="bg-white rounded-lg overflow-hidden border border-green-100 h-[300px] mb-6">
                {/* This would be a map in a real implementation */}
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <p className="text-gray-500">Interactive Map Would Be Here</p>
                </div>
              </div>

              <Card className="bg-white border-green-100">
                <CardContent className="p-6">
                  <h3 className="font-medium text-green-700 mb-2">Headquarters</h3>
                  <p className="text-gray-600 mb-4">
                    123 Agri Tech Park, Sector 15
                    <br />
                    Gurugram, Haryana 122001
                    <br />
                    India
                  </p>

                  <h3 className="font-medium text-green-700 mb-2">Regional Offices</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-600">
                        <span className="font-medium">Punjab:</span>
                        <br />
                        45 Green Avenue, Ludhiana
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">
                        <span className="font-medium">Maharashtra:</span>
                        <br />
                        78 Tech Hub, Pune
                      </p>
                    </div>
                  </div>

                  <h3 className="font-medium text-green-700 mt-4 mb-2">Office Hours</h3>
                  <p className="text-gray-600">
                    Monday to Friday: 9 AM - 6 PM
                    <br />
                    Saturday: 10 AM - 4 PM
                    <br />
                    Sunday: Closed
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="mt-12 bg-white rounded-lg p-6 border border-green-100">
            <h2 className="text-xl font-bold text-green-800 mb-4">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="border-b border-green-100 pb-4">
                <h3 className="font-medium text-green-700 mb-2">How accurate are the AI crop recommendations?</h3>
                <p className="text-gray-600">
                  Our AI recommendations are based on multiple data points including soil analysis, climate patterns,
                  and historical yield data. They have an accuracy rate of over 85% and are continuously improving as
                  our AI learns from more farming data.
                </p>
              </div>

              <div className="border-b border-green-100 pb-4">
                <h3 className="font-medium text-green-700 mb-2">Is my farming data secure on your platform?</h3>
                <p className="text-gray-600">
                  Yes, we take data security very seriously. All your farming data is encrypted and stored securely. We
                  never share your personal information with third parties without your explicit consent.
                </p>
              </div>

              <div className="border-b border-green-100 pb-4">
                <h3 className="font-medium text-green-700 mb-2">Do I need technical knowledge to use the platform?</h3>
                <p className="text-gray-600">
                  No, our platform is designed to be user-friendly for farmers of all technical levels. We provide
                  simple interfaces, local language support, and step-by-step guidance throughout the platform.
                </p>
              </div>

              <div>
                <h3 className="font-medium text-green-700 mb-2">How can I get training on using the platform?</h3>
                <p className="text-gray-600">
                  We offer free training sessions both online and in-person at our regional offices. You can also access
                  our library of tutorial videos in multiple languages through the Education section.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

