"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export function SetupGuide() {
  const [copied, setCopied] = useState(false);

  const sqlQuery = `
CREATE TABLE public.watering_records (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  plant_name TEXT NOT NULL,
  watered_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
  `.trim();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(sqlQuery);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Configuração Necessária</CardTitle>
        <CardDescription>
          A tabela &quot;watering_records&quot; não foi encontrada no seu banco
          de dados Supabase.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erro</AlertTitle>
          <AlertDescription>
            A tabela &quot;watering_records&quot; não existe no seu banco de
            dados Supabase.
          </AlertDescription>
        </Alert>

        <div className="space-y-2">
          <h3 className="text-lg font-medium">
            Siga estas etapas para criar a tabela:
          </h3>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Acesse o painel do Supabase</li>
            <li>Vá para a seção &quot;SQL Editor&quot;</li>
            <li>Crie uma nova consulta</li>
            <li>Cole o SQL abaixo:</li>
          </ol>
        </div>

        <div className="bg-slate-100 p-4 rounded-md relative">
          <pre className="text-sm overflow-x-auto whitespace-pre-wrap">
            {sqlQuery}
          </pre>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={copyToClipboard}>
          {copied ? "Copiado!" : "Copiar SQL"}
        </Button>
      </CardFooter>
    </Card>
  );
}
