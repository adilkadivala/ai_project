import { db } from "@/utils/db";
import { AIOutput } from "@/utils/schema";
import { currentUser } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
export interface HISTORY {
  id: number;
  formData: string;
  aiResponse: string;
  templateSlug: string;
  createdBy: string;
  createdAt: string;
}
const truncateText = (text: string, wordLimit: number): string => {
  const words = text.split(" ");
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(" ") + "...";
  }
  return text;
};
const formatDate = (dateString: string) => {
  if (!dateString) return "Unknown Date";
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? "Invalid Date" : date.toLocaleDateString();
};
// async function handleDelete(id: any) {
//   await db.delete(AIOutput).where(id);
// }
async function History() {
  const user = await currentUser();
  const HistoryList: HISTORY[] | any = await db
    .select()
    .from(AIOutput)
    .where(
      eq(AIOutput.createdBy, user?.primaryEmailAddress?.emailAddress || "")
    )
    .orderBy(desc(AIOutput.id));
  return (
    <div className="bg-white m-4 rounded-md">
      <h1 className="text-center font-extrabold p-3 underline">History</h1>
      {HistoryList.length > 0 ? (
        <Table>
          <TableCaption>A list of your generated stuff.</TableCaption>
          <TableHeader>
            <TableRow className="text-right">
              <TableHead className="w-[100px] font-extrabold">
                Template
              </TableHead>
              <TableHead className="w-[100px] font-extrabold">
                AI Response
              </TableHead>
              <TableHead className="w-[100px] font-extrabold">
                Created By
              </TableHead>
              <TableHead className="w-[100px] font-extrabold">
                Created At
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {HistoryList.map((item: HISTORY) => {
              return (
                <TableRow key={item.id}>
                  <TableCell className="w-[100px]">
                    {truncateText(item.formData, 5)}
                  </TableCell>
                  <TableCell className="w-[100px]">
                    {truncateText(item.aiResponse, 5)}
                  </TableCell>
                  <TableCell className="w-[100px]">{item.createdBy}</TableCell>
                  <TableCell className="w-[100px]">{item.createdAt}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      ) : (
        <div>No history found</div>
      )}
    </div>
  );
}
export default History;
