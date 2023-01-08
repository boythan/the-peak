import React, { useEffect, useState } from "react";
import { INews } from "../../interface/news";
import NewsBlock from "./NewsBlock";
import classnames from "classnames";
import API from "../../api/API";

interface INewsBlockSport {
  className?: any;
}

const NewsBlockSport = ({ className }: INewsBlockSport) => {
  const [newsSport, setNewsSport] = useState<INews[]>([]);

  useEffect(() => {
    loadNewsSport();
  }, []);

  const loadNewsSport = () => {
    const params = {
      section: "sport",
      page: 1,
      "page-size": 3,
    };

    API.search(params).then((res) => {
      const newsList = res?.data?.response?.results ?? [];
      setNewsSport(newsList);
    });
  };

  const classNameContainer = classnames("flex-column", className);
  return (
    <div className={classNameContainer}>
      <h6>Sports</h6>
      <NewsBlock newsList={newsSport} />
    </div>
  );
};

export default NewsBlockSport;
