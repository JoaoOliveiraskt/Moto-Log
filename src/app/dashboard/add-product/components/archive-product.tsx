import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ArchiveProduct() {
  return (
    <Card x-chunk="dashboard-07-chunk-5">
      <CardHeader className="px-6 mt-6 space-y-2 mb-5">
        <CardTitle>Arquivar Produto</CardTitle>
        <CardDescription>
          Se você não deseja mais vender este produto, você pode arquivá-lo.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div></div>
        <Button size="sm">Arquivar produto</Button>
      </CardContent>
    </Card>
  );
}
