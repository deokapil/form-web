import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeftCircle } from "lucide-react";

type Props = {
  college: CollegeType | undefined;
};

const Navbar = async ({ college }: Props) => {
  return (
    <div className="p-4 border-b h-full flex justify-between  bg-white shadow-sm">
      <div className="p-2">
        {college?.collegeUrl ? (
          <Button variant="default" asChild>
            <Link href={college.collegeUrl}>
              <ChevronLeftCircle className="h-4 w-4 mr-2" />
              Home
            </Link>
          </Button>
        ) : null}
      </div>
      <h2 className="text-center text-blue-950 md:text-2xl sm:text-lg w-full">
        {college?.name}
      </h2>
    </div>
  );
};

export default Navbar;
