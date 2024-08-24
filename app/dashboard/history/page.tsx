import Templates from "@/app/(data)/Templates";
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
import { TEMPLATE } from "../_components/TemplateSec";

export interface HISTORY {
  id: number;
  formData: string;
  aiResponse: string;
  templateSlug: string;
  createdBy: string;
  createdAt: string;
}

// Utility function to truncate text
const truncateText = (text: string, wordLimit: number): string => {
  const words = text.split(" ");
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(" ") + "...";
  }
  return text;
};

// Utility function to parse the date in dd-mm-yyyy format
const parseDate = (dateString: string): Date => {
  const [day, month, year] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day); // month is 0-indexed in JavaScript
};

async function History() {
  const user = await currentUser();

  const HistoryList: HISTORY[] | any = await db
    .select()
    .from(AIOutput)
    .where(
      eq(AIOutput.createdBy, user?.primaryEmailAddress?.emailAddress || "")
    )
    .orderBy(desc(AIOutput.id));

  const getTemplateName = (slug: string) => {
    const template: TEMPLATE | undefined = Templates?.find(
      (item) => item.slug === slug
    );
    return template?.name || "Unknown Template";
  };

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
                Form Data
              </TableHead>
              <TableHead className="w-[100px] font-extrabold">
                AI Response
              </TableHead>
              <TableHead className="w-[100px] font-extrabold">
                Template Slug
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
            {HistoryList.map((item: HISTORY) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium w-[100px]">
                  {item.id}
                </TableCell>
                <TableCell className="w-[100px]">
                  {truncateText(item.formData, 5)}
                </TableCell>
                <TableCell className="w-[100px]">
                  {truncateText(item.aiResponse, 5)}
                </TableCell>
                <TableCell className=" w-[100px]">
                  {getTemplateName(item.templateSlug)}
                </TableCell>
                <TableCell className="w-[100px]">{item.createdBy}</TableCell>
                <TableCell className="w-[100px]">
                  {parseDate(item.createdAt).toDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div>No history found</div>
      )}
    </div>
  );
}

export default History;
