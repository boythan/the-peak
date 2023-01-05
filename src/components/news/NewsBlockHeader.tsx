import React from "react";
import { NEWS_HOME_SORT } from "../../constant/news";
import BookmarkButton from "../bookmark/BookmarkButton";
import Dropdown from "../dropdown/Dropdown";

interface INewsBlockHeader {
  title: any;
  sortBy: any;
  onChangeSort: any;
}

const NewsBlockHeader = ({ title, sortBy, onChangeSort }: INewsBlockHeader) => {
  return (
    <div className="home__title-container">
      <h3>{title}</h3>
      <div className="d-flex">
        <BookmarkButton />
        <Dropdown
          label={sortBy?.label}
          items={NEWS_HOME_SORT}
          onClick={onChangeSort}
          classButton="text-white"
          className="ml-3"
        />
      </div>
    </div>
  );
};

export default NewsBlockHeader;
