import React, { useEffect, useState } from "react";
import { Fragment, useMemo } from "react";
import BookmarkButton from "../../components/bookmark/BookmarkButton";
import Dropdown from "../../components/dropdown/Dropdown";
import classnames from "classnames";
import API from "../../api/API";
import { map, slice } from "lodash";
import { INews } from "../../interface/news";
import NewsCard from "../../components/news/NewsCard";
import NewsBlockSport from "../../components/news/NewsBlockSport";
import { NEWS_HOME_SORT } from "../../constant/news";

interface IHomePage {}

const HomePage = ({}: IHomePage) => {
  const [topStories, setTopStories] = useState<INews[]>([]);
  const [sortBy, setSortBy] = useState(NEWS_HOME_SORT[0]);

  useEffect(() => {
    loadNews();
  }, [sortBy]);

  const loadNews = () => {
    API.search({
      q: "",
      "show-fields": "thumbnail,trailText",
      page: 1,
      "page-size": 8,
      "order-by": sortBy?.id,
    }).then((res: any) => {
      const newsList = res?.data?.response?.results ?? [];
      setTopStories(newsList);
    });
  };

  return (
    <Fragment>
      <div className="container">
        <div className="home__title-container">
          <h3>Top stories</h3>
          <div className="d-flex">
            <BookmarkButton className={"ml-3"} />
            <Dropdown
              label={sortBy?.label}
              items={NEWS_HOME_SORT}
              onClick={(item) => setSortBy(item)}
              classButton="text-white"
              className={classnames("ml-3")}
            />
          </div>
        </div>
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
        <NewsBlockSport className="home__news-sport-block" />
      </div>
    </Fragment>
  );
};

export default HomePage;
