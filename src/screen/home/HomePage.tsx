import { map, slice } from "lodash";
import { Fragment, useContext, useEffect, useState } from "react";
import API from "../../api/API";
import NewsBlock from "../../components/news/NewsBlock";
import NewsBlockHeader from "../../components/news/NewsBlockHeader";
import NewsCard from "../../components/news/NewsCard";
import { NEWS_HOME_SORT } from "../../constant/news";
import AppLayoutContext from "../../context/app";
import { INews } from "../../interface/news";

interface IHomeNewsDataState {
  topStories: INews[];
  categoryBase: INews[];
}

const HomePage = () => {
  const [homeNewsData, setHomeNewsData] = useState<IHomeNewsDataState>({
    topStories: [],
    categoryBase: [],
  });
  const [sortBy, setSortBy] = useState(NEWS_HOME_SORT[0]);
  const { fetchNews } = useContext(AppLayoutContext);

  useEffect(() => {
    loadNews();
  }, [sortBy]);

  /**
   * Fetch news list for top stories and category base view
   */
  const loadNews = () => {
    fetchNews(
      [
        {
          method: API.search,
          params: {
            page: 1,
            "page-size": 8,
            "order-by": sortBy?.id,
            section: "news",
          },
        },
        {
          method: API.search,
          params: {
            section: "sport|culture|lifeandstyle",
            page: 1,
            "order-by": sortBy?.id,
            "page-size": 3,
          },
        },
      ],
      ([topStoryRes, categoryBaseRes]) => {
        const topStories = topStoryRes?.data?.response?.results ?? [];
        const categoryBase = categoryBaseRes?.data?.response?.results ?? [];
        setHomeNewsData({ topStories, categoryBase });
      }
    );
  };

  return (
    <Fragment>
      <div className="container">
        <NewsBlockHeader
          sortBy={sortBy}
          onChangeSort={(item) => {
            setSortBy(item);
          }}
          title="Top stories"
        />
        <div className="home__top-story-grid home__top-story-banner">
          {map(slice(homeNewsData?.topStories, 0, 5), (news, index) => (
            <NewsCard news={news} className={"top-story-" + index} />
          ))}
        </div>
        <div className="home__top-story-grid home__top-story-footer">
          {map(slice(homeNewsData?.topStories, 5, 8), (news, index) => (
            <NewsCard news={news} className={"top-story-" + (index + 5)} />
          ))}
        </div>
        <div className="home__news-block">
          <h6>Sports</h6>
          <NewsBlock newsList={homeNewsData?.categoryBase} />
        </div>
      </div>
    </Fragment>
  );
};

export default HomePage;
