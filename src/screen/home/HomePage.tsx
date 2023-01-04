import React, { useEffect } from "react";
import { Fragment, useMemo } from "react";
import BookmarkButton from "../../components/bookmark/BookmarkButton";
import Dropdown from "../../components/dropdown/Dropdown";
import classnames from "classnames";
import API from "../../api/API";

interface IHomePage {}

const HomePage = ({}: IHomePage) => {
  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = () => {
    API.search({ q: "debate" }).then((res: any) => {
      const newsList = res?.data?.response?.results ?? [];
      console.log("newsList", newsList);
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
              label="Catgory"
              items={[{ id: 1, label: "Title1" }]}
              onClick={(item) => {}}
              classButton="text-white"
              className={classnames("ml-3")}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default HomePage;
