"use client"

import { useState } from "react"
import { AlertTriangle, Info, Bell, BellOff } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useLanguage } from "@/context/language-context"

type Alert = {
  id: number
  type: "warning" | "info"
  title: string
  description: string
  date: string
  active: boolean
}

export default function WeatherAlerts() {
  const { translate } = useLanguage()
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: 1,
      type: "warning",
      title: "Heavy Rainfall Expected",
      description:
        "Heavy rainfall expected in your region over the next 48 hours. Potential for localized flooding in low-lying areas.",
      date: "May 25, 2023",
      active: true,
    },
    {
      id: 2,
      type: "info",
      title: "Optimal Planting Conditions",
      description:
        "Weather conditions will be ideal for planting wheat and barley over the next week with moderate temperatures and adequate soil moisture.",
      date: "May 24, 2023",
      active: true,
    },
    {
      id: 3,
      type: "warning",
      title: "Heat Wave Alert",
      description:
        "Temperatures expected to rise above 38°C starting next Monday. Take precautions to protect heat-sensitive crops.",
      date: "May 22, 2023",
      active: true,
    },
  ])

  const toggleAlert = (id: number) => {
    setAlerts(alerts.map((alert) => (alert.id === id ? { ...alert, active: !alert.active } : alert)))
  }

  return (
    <div className="space-y-4">
      <Card className="border-amber-200 bg-amber-50">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
              <CardTitle className="text-amber-700 text-lg">{translate("Weather Alerts")}</CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-amber-600" />
              <span className="text-sm text-amber-700">{translate("Notifications Active")}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alerts
              .filter((alert) => alert.active)
              .map((alert) => (
                <div
                  key={alert.id}
                  className={`p-4 rounded-lg flex gap-3 ${
                    alert.type === "warning"
                      ? "bg-amber-100 border-l-4 border-amber-500"
                      : "bg-blue-100 border-l-4 border-blue-500"
                  }`}
                >
                  <div className="mt-1">
                    {alert.type === "warning" ? (
                      <AlertTriangle
                        className={`h-5 w-5 ${alert.type === "warning" ? "text-amber-600" : "text-blue-600"}`}
                      />
                    ) : (
                      <Info className={`h-5 w-5 ${alert.type === "warning" ? "text-amber-600" : "text-blue-600"}`} />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className={`font-medium ${alert.type === "warning" ? "text-amber-800" : "text-blue-800"}`}>
                        {translate(alert.title)}
                      </h4>
                      <div className="flex items-center">
                        <Switch
                          checked={alert.active}
                          onCheckedChange={() => toggleAlert(alert.id)}
                          className="data-[state=checked]:bg-green-600"
                        />
                      </div>
                    </div>
                    <p className={`text-sm mt-1 ${alert.type === "warning" ? "text-amber-700" : "text-blue-700"}`}>
                      {translate(alert.description)}
                    </p>
                    <div className="text-xs mt-2 flex justify-between items-center">
                      <span className={alert.type === "warning" ? "text-amber-600" : "text-blue-600"}>
                        {alert.date}
                      </span>
                      <button
                        className={`text-xs ${
                          alert.type === "warning"
                            ? "text-amber-800 hover:text-amber-900"
                            : "text-blue-800 hover:text-blue-900"
                        }`}
                      >
                        {translate("View Details")}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-green-700 text-lg">{translate("Alert Preferences")}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
                <Label htmlFor="severe-weather">{translate("Severe Weather Alerts")}</Label>
              </div>
              <Switch id="severe-weather" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Info className="h-5 w-5 text-blue-600" />
                <Label htmlFor="farming-conditions">{translate("Optimal Farming Conditions")}</Label>
              </div>
              <Switch id="farming-conditions" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-green-600" />
                <Label htmlFor="daily-forecast">{translate("Daily Forecast Notifications")}</Label>
              </div>
              <Switch id="daily-forecast" />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BellOff className="h-5 w-5 text-gray-600" />
                <Label htmlFor="quiet-hours">{translate("Enable Quiet Hours (10 PM - 6 AM)")}</Label>
              </div>
              <Switch id="quiet-hours" defaultChecked />
            </div>
          </div>

          <div className="mt-6">
            <h4 className="font-medium text-green-700 mb-2">{translate("Alert Delivery Methods")}</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="sms" className="rounded text-green-600" defaultChecked />
                <Label htmlFor="sms">{translate("SMS")}</Label>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="email" className="rounded text-green-600" defaultChecked />
                <Label htmlFor="email">{translate("Email")}</Label>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="app" className="rounded text-green-600" defaultChecked />
                <Label htmlFor="app">{translate("App Notifications")}</Label>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="whatsapp" className="rounded text-green-600" />
                <Label htmlFor="whatsapp">{translate("WhatsApp")}</Label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

