import React, { useEffect, useState } from "react";
import { INews } from "../../interface/news";
import NewsBlock from "./NewsBlock";
import classnames from "classnames";
import API from "../../api/API";

interface INewsBlockCulture {
  className?: any;
}

const NewsBlockCulture = ({ className }: INewsBlockCulture) => {
  const [newsCulture, setNewsCulture] = useState<INews[]>([]);

  useEffect(() => {
    loadNewsCulture();
  }, []);

  const loadNewsCulture = () => {
    const params = {
      section: "culture",
      page: 1,
      "page-size": 3,
    };

    API.search(params).then((res) => {
      const newsList = res?.data?.response?.results ?? [];
      setNewsCulture(newsList);
    });
  };

  const classNameContainer = classnames("flex-column", className);
  return (
    <div className={classNameContainer}>
      <h6>Cultures</h6>
      <NewsBlock newsList={newsCulture} />
    </div>
  );
};

export default NewsBlockCulture;
