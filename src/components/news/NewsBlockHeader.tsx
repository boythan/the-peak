import { useRouter } from "next/router";
import React from "react";
import { NEWS_HOME_SORT } from "../../constant/news";
import BookmarkButton from "../bookmark/BookmarkButton";
import Dropdown from "../dropdown/Dropdown";

interface INewsBlockHeader {
  title: any;
  sortBy: any;
  onChangeSort: any;
  hideBookmark?: boolean;
}

const NewsBlockHeader = ({
  title,
  sortBy,
  onChangeSort,
  hideBookmark,
}: INewsBlockHeader) => {
  const router = useRouter();

  return (
    <div className="home__title-container">
      <h3>{title}</h3>
      <div className="d-flex">
        {!hideBookmark && (
          <BookmarkButton onClick={() => router.replace("/bookmark")} />
        )}
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
