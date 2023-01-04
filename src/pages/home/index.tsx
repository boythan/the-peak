import { forEach, map } from "lodash";
import React from "react";
import HomePage from "../../screen/home/HomePage";

function Page() {
  return React.cloneElement(<HomePage />, {});
}

export const getServerSideProps: any = async (context: any) => {
  return {
    props: {},
  };
};

export default Page;
