import { Fragment, useEffect, useState } from "react";
import NewsBlock from "../../components/news/NewsBlock";
import NewsBlockHeader from "../../components/news/NewsBlockHeader";
import { NEWS_HOME_SORT } from "../../constant/news";
import { INews } from "../../interface/news";
import BookmarkManager from "../../local-storage/BookmarkManager";

const BookmarkPage = () => {
  const [newsList, setNewList] = useState<INews[]>([]);
  const [sortBy, setSortBy] = useState(NEWS_HOME_SORT[0]);

  useEffect(() => {
    loadNews();
  }, [sortBy]);

  const loadNews = () => {
    const allBookmark = BookmarkManager.getAll();
    console.log("allBookmark", allBookmark);
  };

  return (
    <Fragment>
      <div className="container">
        <NewsBlockHeader
          sortBy={sortBy}
          onChangeSort={(item) => setSortBy(item)}
          title="All bookmark"
          hideBookmark
        />
        <div className="mt-5">
          <NewsBlock newsList={newsList} />
        </div>
      </div>
    </Fragment>
  );
};

export default BookmarkPage;
