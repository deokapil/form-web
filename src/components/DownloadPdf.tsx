"use client";
import React, { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { generatePDF } from "@/app/_actions";
import { useToast } from "@/components/ui/use-toast";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Loader2 } from "lucide-react";

const DownloadPdf = () => {
  const [pdfUrl, setPdfUrl] = useState<string | undefined>();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const params = useParams();

  const handleGenerate = async () => {
    setLoading(true);
    const pdfLink = await generatePDF(params.candId as string);
    setPdfUrl(pdfLink);
    toast({
      title: "Successfully generated pdf",
    });
    setLoading(false);
  };
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Download Pdf for Candidate</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between">
          <Button onClick={handleGenerate}>Generate PDF</Button>
          {loading && <Loader2 />}
          {pdfUrl ? <Link href={pdfUrl}>Download</Link> : null}
        </div>
      </CardContent>
    </Card>
  );
};

export default DownloadPdf;
