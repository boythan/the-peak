import React from "react";
import SearchPage from "../../screen/search/SearchPage";

function Page() {
  return React.cloneElement(<SearchPage />, {});
}

export const getServerSideProps: any = async (context: any) => {
  return {
    props: {},
  };
};

export default Page;
