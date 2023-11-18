import Navbar from "@/components/Navbar";
import { getCollegeBySlug } from "@/lib/qs";
import { useParams } from "next/navigation";
import React from "react";

type Props = {};

const CollegeLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { collegeSlug: string };
}) => {
  const college = await getCollegeBySlug(params.collegeSlug);
  return (
    <div className="h-full">
      <div className="h-[80px] fixed inset-y-0 w-full z-50">
        <Navbar college={college} />
      </div>
      <main className="md:pl-56 pt-[80px] h-full">{children}</main>
    </div>
  );
};

export default CollegeLayout;
