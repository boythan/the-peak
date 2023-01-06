import HomePage from "../screen/home/HomePage";
import { useQueryParam, StringParam, withDefault } from "use-query-params";
import { isEmpty } from "lodash";
import SearchPage from "../screen/search/SearchPage";
import { memo } from "react";

function App() {
  // const [search] = useQueryParam("", withDefault(StringParam, ""));

  console.log("render app homepage");

  // if (!isEmpty(search)) {
  //   return <SearchPage />;
  // }

  return <HomePage />;
}

export default memo(App);
