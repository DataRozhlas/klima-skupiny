import { useState, useEffect } from "react"

import data from "./assets/data.json"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"


import { Info } from 'lucide-react'

import { usePostMessageWithHeight } from './hooks/usePostHeightMessage'

function App({ group }: { group: string | null }) {

  const [tooltipVisible, setTooltipVisible] = useState(false)
  const [activeTab, setActiveTab] = useState(group || "0")

  const { containerRef, postHeightMessage } = usePostMessageWithHeight(`klima-skupiny-24`)

  useEffect(() => {
    postHeightMessage()
  }, [activeTab, postHeightMessage])

  return (
    <div className="w-full max-w-[620px] mx-auto" ref={containerRef}>
      <Tabs defaultValue={activeTab} onValueChange={value => setActiveTab(value)} className="max-w-620" >
        <TabsList>
          {
            data.map((item) => (
              <TabsTrigger key={item.code} value={item.code.toString()}>{item.title}</TabsTrigger>
            ))}
        </TabsList>
        {
          data.map((item) => (
            <TabsContent key={item.code} value={item.code.toString()}>

              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>{item.title}</CardTitle>
                    <CardTitle className="text-zinc-800 text-sm px-2 py-1 rounded-md font-normal">{item.share} % z české populace</CardTitle>
                  </div>
                  <CardDescription>{item.tagline}</CardDescription>
                </CardHeader>
                <CardContent>
                  <figure className="mb-6">
                    <img src={`./${item.code.toString()}.svg`} alt={item.title} className="w-full" />
                  </figure>
                  {item.paragraphs.map((paragraph, index) => (
                    <p key={index} className="p-1 text-sm ">{paragraph}</p>
                  ))}

                </CardContent>
                <CardFooter className="justify-between">
                  <div>
                    <TooltipProvider>
                      <Tooltip open={tooltipVisible} onOpenChange={setTooltipVisible}>

                        <TooltipTrigger onClick={() => setTooltipVisible(!tooltipVisible)}
                          onMouseEnter={() => setTooltipVisible(true)}
                          onMouseLeave={() => setTooltipVisible(false)}
                        >
                          <Info className="h-6 w-6" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">Profily jednotlivých postav ukazují vždy určitého typického představitele či představitelku dané skupiny. Vycházejí z analýzy rozsáhlých reprezentativních dat a zároveň hledají způsoby, jak v grafické zkratce představit komplexní data pro širší publikum. Je však přirozené, že typický představitel či představitelka se nikdy neshoduje se všemi, kteří jsou statisticky do dané skuipiny zařazeni. Jako vždy, společenská realita je pestřejší než dokáže vystihnout sedm kategorií.</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  <div>
                    <p className="w-full text-xs text-right">Ilustrace: Marcel Otruba</p>
                    <p className="w-full text-xs text-right">Zdroj: <a href="https://institut2050.cz/ceskeklima2024" target="_blank" className="underline">Výzkum České klima 2024 – Institut 2050</a></p>
                  </div>
                </CardFooter>
              </Card>

            </TabsContent>
          ))
        }

      </Tabs>
    </div>
  )
}

export default App
