import { map, slice } from "lodash";
import { Fragment, useContext, useEffect, useState } from "react";
import API from "../../api/API";
import NewsBlockCulture from "../../components/news/NewsBlockCulture";
import NewsBlockHeader from "../../components/news/NewsBlockHeader";
import NewsBlockLifeStyle from "../../components/news/NewsBlockLifeStyle";
import NewsBlockSport from "../../components/news/NewsBlockSport";
import NewsCard from "../../components/news/NewsCard";
import { NEWS_HOME_SORT } from "../../constant/news";
import AppLayoutContext from "../../context/app";
import { INews } from "../../interface/news";

const HomePage = () => {
  const [topStories, setTopStories] = useState<INews[]>([]);
  const [sortBy, setSortBy] = useState(NEWS_HOME_SORT[0]);
  const { fecthNews } = useContext(AppLayoutContext);

  useEffect(() => {
    loadNews();
  }, [sortBy]);

  const loadNews = () => {
    fecthNews(
      [
        {
          method: API.search,
          params: {
            page: 1,
            "page-size": 8,
            "order-by": sortBy?.id,
            // section: "news",
          },
        },
      ],
      ([res]) => {
        const newsList = res?.data?.response?.results ?? [];
        setTopStories(newsList);
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
          {map(slice(topStories, 0, 5), (news, index) => (
            <NewsCard news={news} className={"top-story-" + index} />
          ))}
        </div>
        <div className="home__top-story-grid home__top-story-footer">
          {map(slice(topStories, 5, 8), (news, index) => (
            <NewsCard news={news} className={"top-story-" + (index + 5)} />
          ))}
        </div>
        <NewsBlockSport className="home__news-block" />
        <NewsBlockCulture className="home__news-block" />
        <NewsBlockLifeStyle className="home__news-block" />
      </div>
    </Fragment>
  );
};

export default HomePage;
