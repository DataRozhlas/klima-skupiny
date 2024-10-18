import data from "./assets/data.json"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


function App() {

  return (
    <div className="w-full max-w-[620px] mx-auto">
      <Tabs defaultValue="account" className="max-w-620" >
        <TabsList>
          {
            data.map((item) => (
              <TabsTrigger key={item.code} value={item.code.toString()}>{item.title}</TabsTrigger>
            ))}
        </TabsList>
        <TabsContent value="account">Hovno</TabsContent>
        <TabsContent value="password">Prdel</TabsContent>
        <TabsContent value="password">Kamení</TabsContent>

      </Tabs>
    </div>
  )
}

export default App
