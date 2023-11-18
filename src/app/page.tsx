import CloudinaryUploadForm from "@/components/CloudinaryUploadForm";
import { getCollegeList } from "@/lib/qs";
import Image from "next/image";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

export default async function Home() {
  const collegeList = await getCollegeList();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Table>
        <TableCaption>College List.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Add candidate</TableHead>
            <TableHead>Dashboard</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {collegeList.map((college) => (
            <TableRow key={college.id}>
              <TableCell className="font-medium">{college.name}</TableCell>
              <TableCell>
                <Link href={`/${college.slug}/forms`}>Add Candidate</Link>
              </TableCell>
              <TableCell>
                <Link href={`/${college.slug}/dashboard`}>Dashboard</Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}
