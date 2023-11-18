"use client";
import React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { generatePDF } from "@/app/_actions";
import { useToast } from "@/components/ui/use-toast";

type Props = {
  params: {
    collegeSlug: string;
    candId: string;
  };
};

const page = ({ params }: Props) => {
  const { toast } = useToast();
  const handleGenerate = async () => {
    await generatePDF(params.candId);
    toast({
      title: "Signature and Photograph required please upload",
    });
  };
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Download Pdf for Candidate</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={handleGenerate}>Generate PDF</Button>
      </CardContent>
    </Card>
  );
};

export default page;
