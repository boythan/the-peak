import HomePage from "../screen/home/HomePage";
import { useQueryParam, StringParam, withDefault } from "use-query-params";
import { isEmpty } from "lodash";
import SearchPage from "../screen/search/SearchPage";

export default function App() {
  const [search] = useQueryParam("", withDefault(StringParam, ""));

  console.log("search", search);

  if (!isEmpty(search)) {
    return <SearchPage />;
  }

  return <HomePage />;
}
