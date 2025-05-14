import type { WateringRecord } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface WateringHistoryProps {
  records: WateringRecord[];
}

export function WateringHistory({ records }: WateringHistoryProps) {
  // Format date to Brazilian format
  function formatDate(dateString: string) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("pt-BR", {
      timeZone: "America/Fortaleza",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  }

  // Format time to Brazilian format
  function formatTime(dateString: string) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("pt-BR", {
      timeZone: "America/Fortaleza",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(date);
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Planta</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Hora</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-6">
                Nenhum registro de rega encontrado.
              </TableCell>
            </TableRow>
          ) : (
            records.map((record) => (
              <TableRow key={record.id}>
                <TableCell className="font-medium">{record.name}</TableCell>
                <TableCell>{record.plant_name}</TableCell>
                <TableCell>{formatDate(record.watered_at)}</TableCell>
                <TableCell>{formatTime(record.watered_at)}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
