import React, { useEffect, useState } from "react";
import { Fragment, useMemo } from "react";
import BookmarkButton from "../../components/bookmark/BookmarkButton";
import Dropdown from "../../components/dropdown/Dropdown";
import classnames from "classnames";
import API from "../../api/API";
import { map, slice } from "lodash";
import { INews } from "../../interface/news";
import NewsCard from "../../components/news/NewsCard";

interface IHomePage {}

const HomePage = ({}: IHomePage) => {
  const [newsList, setNewsList] = useState<INews[]>([]);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = () => {
    API.search({ q: "debate", "show-fields": "thumbnail,trailText" }).then(
      (res: any) => {
        const newsList = res?.data?.response?.results ?? [];
        setNewsList(newsList);
      }
    );
  };

  return (
    <Fragment>
      <div className="container">
        <div className="home__title-container">
          <h3>Top stories</h3>
          <div className="d-flex">
            <BookmarkButton className={"ml-3"} />
            <Dropdown
              label="Catgory"
              items={[{ id: 1, label: "Title1" }]}
              onClick={(item) => {}}
              classButton="text-white"
              className={classnames("ml-3")}
            />
          </div>
        </div>
        <div className="d-flex" style={{ height: "347px" }}>
          {map(slice(newsList, 0, 3), (news) => (
            <NewsCard news={news} />
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default HomePage;
