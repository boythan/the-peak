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
      {!newsList?.length && (
        <div className="w-100 flex-center p-5 h6">No result</div>
      )}
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
