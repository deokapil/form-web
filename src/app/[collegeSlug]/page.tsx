import React from "react";

type Props = {
  params: {
    collegeSlug: string;
  };
};

const page = ({ params }: Props) => {
  return <div>{JSON.stringify(params)}</div>;
};

export default page;
