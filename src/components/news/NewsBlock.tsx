import { map } from "lodash";
import React from "react";
import { INews } from "../../interface/news";
import NewsCard from "./NewsCard";

interface INewsBlock {
  newsList: INews[];
}

const NewsBlock = ({ newsList }: INewsBlock) => {
  return (
    <div className="news-block__container">
      {map(newsList, (news) => (
        <NewsCard
          news={news}
          className="news-block__news-item"
          key={news?.id}
        />
      ))}
    </div>
  );
};

export default NewsBlock;
