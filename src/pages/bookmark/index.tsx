import React from "react";
import BookmarkPage from "../../screen/bookmark/BookmarkPage";

function Page() {
  return React.cloneElement(<BookmarkPage />, {});
}

export const getServerSideProps: any = async (context: any) => {
  return {
    props: {},
  };
};

export default Page;
