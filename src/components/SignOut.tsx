"use client";

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

type Props = {};

const SignOut = (props: Props) => {
  return (
    <div className="p-2">
      <Button variant="destructive" onClick={() => signOut()}>
        Sign Out
      </Button>
    </div>
  );
};

export default SignOut;
