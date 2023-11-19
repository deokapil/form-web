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

type Props = {
  params: {
    collegeSlug: string;
  };
};

const DashboardPage = async ({ params }: Props) => {
  const candidateList = await getCandidatesByCollege(params.collegeSlug);
  return (
    <Table>
      <TableCaption>College List.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Registration No</TableHead>
          <TableHead>PDF</TableHead>
          <TableHead>Generate</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {candidateList.map((cand) => (
          <TableRow key={cand.id}>
            <TableCell className="font-medium">{cand.name}</TableCell>
            <TableCell>{cand.registrationNo}</TableCell>
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
