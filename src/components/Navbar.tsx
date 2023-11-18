import React from "react";

type Props = {
  college: CollegeType | undefined;
};

const Navbar = async ({ college }: Props) => {
  return (
    <div className="p-4 border-b h-full flex items-center bg-white shadow-sm">
      <h2 className="text-center text-blue-950 text-2xl w-full">
        {college?.name}
      </h2>
    </div>
  );
};

export default Navbar;
