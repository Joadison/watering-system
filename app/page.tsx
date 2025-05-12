import { Suspense } from "react";
import { getWateringRecords, checkTableExists } from "@/lib/supabase";
import { WateringForm } from "@/components/watering-form";
import { WateringHistory } from "@/components/watering-history";
import { SetupGuide } from "@/components/setup-guide";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

async function WateringHistoryWrapper() {
  const records = await getWateringRecords();
  return <WateringHistory records={records} />;
}

async function TableCheck() {
  const tableExists = await checkTableExists();

  if (!tableExists) {
    return <SetupGuide />;
  }

  return (
    <Tabs defaultValue="register" className="max-w-3xl mx-auto">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="register">Registrar Rega</TabsTrigger>
        <TabsTrigger value="history">Histórico</TabsTrigger>
      </TabsList>

      <TabsContent value="register">
        <Card>
          <CardHeader>
            <CardTitle>Registrar Nova Rega</CardTitle>
            <CardDescription>
              Informe quem regou as plantas. A data e hora serão registradas
              automaticamente.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <WateringForm />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="history">
        <Card>
          <CardHeader>
            <CardTitle>Histórico de Regas</CardTitle>
            <CardDescription>
              Veja quem regou as plantas e quando.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Suspense fallback={<div>Carregando histórico...</div>}>
              <WateringHistoryWrapper />
            </Suspense>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

export default function Home() {
  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">Sistema de Rega</h1>

      <Suspense fallback={<div>Verificando configuração...</div>}>
        <TableCheck />
      </Suspense>
    </main>
  );
}
