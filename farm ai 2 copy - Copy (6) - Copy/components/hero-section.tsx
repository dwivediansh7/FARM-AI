"use client"

import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/contexts/translation-context"

export default function HeroSection() {
  const { t } = useTranslation()

  return (
    <section className="relative bg-green-900 text-white py-20">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">{t("hero-title")}</h1>
          <p className="text-xl md:text-2xl mb-8 text-green-50">{t("hero-subtitle")}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white">
              {t("join-now")} <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="black">
              {t("learn-more")}
            </Button>
          </div>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <h3 className="font-bold text-xl">5000+</h3>
              <p className="text-green-50">{t("farmers-joined")}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <h3 className="font-bold text-xl">30%</h3>
              <p className="text-green-50">{t("yield-increase")}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <h3 className="font-bold text-xl">25%</h3>
              <p className="text-green-50">{t("cost-reduction")}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg">
              <h3 className="font-bold text-xl">100+</h3>
              <p className="text-green-50">{t("ai-models")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

