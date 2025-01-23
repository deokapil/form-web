import React from "react";

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
import { getCandidatesByCollege } from "@/lib/qs";
import { format, parse } from "date-fns";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

type Props = {
  params: {
    collegeSlug: string;
  };
};

const DashboardPage = async ({ params }: Props) => {
  const session = await getServerSession();
  if (!session || !session.user) {
    redirect("/sign-in");
  }
  const candidateList = await getCandidatesByCollege(params.collegeSlug);

  return (
    <Table>
      <TableCaption>College List.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Registration No</TableHead>
          <TableHead>DOB</TableHead>
          <TableHead>PrintDate</TableHead>
          <TableHead>PDF</TableHead>
          <TableHead>Generate</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {candidateList.map((cand) => (
          <TableRow key={cand.id}>
            <TableCell className="font-medium">{cand.name}</TableCell>
            <TableCell>{cand.newReg}</TableCell>
            <TableCell>{cand.dateOfBirth}</TableCell>
            <TableCell>
              {cand.printDate &&
                format(
                  parse(cand.printDate, "yyyy-MM-dd", new Date()),
                  "dd-MM-yyyy"
                )}
            </TableCell>
            <TableCell>
              {cand.fileUrl ? (
                <Link href={cand.fileUrl}>Download PDF</Link>
              ) : (
                "Not Printed"
              )}
            </TableCell>
            <TableCell>
              <Link href={`/${params.collegeSlug}/candidate/${cand.id}`}>
                Generate Pdf
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DashboardPage;
