import { throttle } from "lodash";
import { Fragment, useEffect, useRef, useState } from "react";
import { StringParam, useQueryParam, withDefault } from "use-query-params";
import API from "../../api/API";
import NewsBlock from "../../components/news/NewsBlock";
import NewsBlockHeader from "../../components/news/NewsBlockHeader";
import { NEWS_HOME_SORT } from "../../constant/news";
import { INews } from "../../interface/news";

const SearchPage = () => {
  const [search] = useQueryParam("", withDefault(StringParam, ""));

  const [newsList, setNewList] = useState<INews[]>([]);
  const [sortBy, setSortBy] = useState(NEWS_HOME_SORT[0]);
  const [loadingMore, setLoadingMore] = useState(false);
  const pageIndex = useRef(1);

  useEffect(() => {
    pageIndex.current = 1;
    loadNews();
  }, [sortBy]);

  useEffect(() => {
    loadingMore && loadNews();
  }, [loadingMore]);

  useEffect(() => {
    window.onscroll = function (ev) {
      if (
        window.scrollY + document.body.clientHeight ===
        document.body.scrollHeight
      ) {
        if (!loadingMore) {
          onLoadMore();
        }
      } else {
        setLoadingMore(false);
      }
    };
  }, []);

  const onLoadMore = throttle(() => {
    setLoadingMore(true);
    pageIndex.current += 1;
  }, 400);

  const loadNews = () => {
    API.search({
      q: search,
      "show-fields": "thumbnail,trailText",
      page: pageIndex.current,
      "page-size": 15,
      "order-by": sortBy?.id,
      section: "news",
    }).then((res: any) => {
      const newsListNew = res?.data?.response?.results ?? [];
      const result = [...newsList, ...newsListNew];
      setNewList([...result]);
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
          <NewsBlock newsList={newsList} />
          {loadingMore && (
            <div className="flex-center mt-3">
              <div className="loader" />
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default SearchPage;
