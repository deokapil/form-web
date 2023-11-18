"use client";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { generatePDF } from "@/app/_actions";
import { useToast } from "@/components/ui/use-toast";
import { useParams } from "next/navigation";
import Link from "next/link";

const DownloadPdf = () => {
  const [pdfUrl, setPdfUrl] = useState<string | undefined>();
  const { toast } = useToast();
  const params = useParams();
  const handleGenerate = async () => {
    const pdfLink = await generatePDF(params.candId as string);
    setPdfUrl(pdfLink);
    toast({
      title: "Successfully generated pdf",
    });
  };
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Download Pdf for Candidate</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={handleGenerate}>Generate PDF</Button>
        {pdfUrl ? <Link href={pdfUrl}>Download</Link> : null}
      </CardContent>
    </Card>
  );
};

export default DownloadPdf;
