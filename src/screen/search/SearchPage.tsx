import { isEmpty, throttle } from "lodash";
import { Fragment, memo, useContext, useEffect, useRef, useState } from "react";
import API from "../../api/API";
import NewsBlock from "../../components/news/NewsBlock";
import NewsBlockHeader from "../../components/news/NewsBlockHeader";
import { NEWS_HOME_SORT } from "../../constant/news";
import AppLayoutContext from "../../context/app";
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
  const { fetchNews } = useContext(AppLayoutContext);
  const [searchState, setSearchState] = useState<ISearchState>(InitSearchState);

  /**
   * Emitted when the first time render and whenever user select sort or search text
   */
  useEffect(() => {
    pageIndex.current = 1;
    setSearchState(InitSearchState);
    fetchNews([{ method: loadNews }]);
  }, [sortBy?.id, search]);

  /**
   * Emitted when user scroll down and load more
   */
  useEffect(() => {
    loadingMore && loadNews();
  }, [loadingMore]);

  /**
   * listen window scroll and load more news items
   */
  useEffect(() => {
    window.onscroll = function (ev) {
      if (
        window.scrollY + document.body.clientHeight ===
        document.body.scrollHeight
      ) {
        !loadingMore && onLoadMore();
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
    if (isEmpty(search) || !searchState?.hasMoreData)
      return Promise.resolve(true);

    return API.search({
      q: search,
      page: pageIndex.current,
      "page-size": 15,
      "order-by": sortBy?.id,
    }).then((res: any) => {
      const newsListNew = res?.data?.response?.results ?? [];
      const total = res?.data?.response?.total ?? 0;
      const result = [...searchState.data, ...newsListNew];
      setLoadingMore(false);
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
