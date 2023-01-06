import { isEmpty, throttle } from "lodash";
import { Fragment, memo, useEffect, useRef, useState } from "react";
import API from "../../api/API";
import NewsBlock from "../../components/news/NewsBlock";
import NewsBlockHeader from "../../components/news/NewsBlockHeader";
import { NEWS_HOME_SORT } from "../../constant/news";
import { INews } from "../../interface/news";

interface ISearchPageProps {
  search: string | null;
}

interface ISearchState {
  data: INews[];
  hasMoreData: boolean;
}

const InitSearchState = {
  data: [],
  hasMoreData: true,
};

const SearchPage = ({ search }: ISearchPageProps) => {
  const [sortBy, setSortBy] = useState(NEWS_HOME_SORT[0]);
  const [loadingMore, setLoadingMore] = useState(false);
  const pageIndex = useRef(1);

  const [searchState, setSearchState] = useState<ISearchState>(InitSearchState);

  useEffect(() => {
    pageIndex.current = 1;
    setSearchState(InitSearchState);
    loadNews();
  }, [sortBy?.id, search]);

  useEffect(() => {
    loadingMore && loadNews();
  }, [loadingMore]);

  useEffect(() => {
    window.onscroll = function (ev) {
      if (
        window.scrollY + document.body.clientHeight ===
        document.body.scrollHeight
      ) {
        onLoadMore();
      } else {
        loadingMore && setLoadingMore(false);
      }
    };
  }, []);

  const onLoadMore = throttle(() => {
    setLoadingMore(true);
    pageIndex.current += 1;
  }, 400);

  const loadNews = () => {
    console.log("searchState?.hasMoreData", searchState?.hasMoreData);
    if (isEmpty(search) || loadingMore || !searchState?.hasMoreData) return;

    API.search({
      q: search,
      "show-fields": "thumbnail,trailText",
      page: pageIndex.current,
      "page-size": 15,
      "order-by": sortBy?.id,
      section: "news",
    }).then((res: any) => {
      const newsListNew = res?.data?.response?.results ?? [];
      const total = res?.data?.response?.total ?? 0;
      const result = [...searchState.data, ...newsListNew];

      setSearchState({
        data: result,
        hasMoreData: result?.length < total,
      });
    });
  };

  return (
    <Fragment>
      <div className="container" id="search-container">
        <NewsBlockHeader
          sortBy={sortBy}
          onChangeSort={setSortBy}
          title="Search result"
        />
        <div className="mt-5">
          <NewsBlock newsList={searchState?.data} />
          {loadingMore && searchState.hasMoreData && (
            <div className="flex-center mt-3">
              <div className="loader" />
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default memo(SearchPage);
