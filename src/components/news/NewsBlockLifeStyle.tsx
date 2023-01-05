import React, { useEffect, useState } from "react";
import { INews } from "../../interface/news";
import NewsBlock from "./NewsBlock";
import classnames from "classnames";
import API from "../../api/API";

interface INewsBlockLifeStyle {
  className?: any;
}

const NewsBlockLifeStyle = ({ className }: INewsBlockLifeStyle) => {
  const [newsLifeStyle, setNewsLifeStyle] = useState<INews[]>([]);

  useEffect(() => {
    loadNewsLifeStyle();
  }, []);

  const loadNewsLifeStyle = () => {
    const params = {
      section: "lifeandstyle",
      "show-fields": "thumbnail,trailText",
      page: 1,
      "page-size": 3,
    };

    API.search(params).then((res) => {
      const newsList = res?.data?.response?.results ?? [];
      setNewsLifeStyle(newsList);
    });
  };

  const classNameContainer = classnames("flex-column", className);
  return (
    <div className={classNameContainer}>
      <h6>Life and style</h6>
      <NewsBlock newsList={newsLifeStyle} />
    </div>
  );
};

export default NewsBlockLifeStyle;
