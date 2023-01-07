import { Fragment, useEffect, useState } from "react";
import NewsBlock from "../../components/news/NewsBlock";
import NewsBlockHeader from "../../components/news/NewsBlockHeader";
import { NEWS_HOME_SORT } from "../../constant/news";
import { INews } from "../../interface/news";
import BookmarkManager from "../../local-storage/BookmarkManager";

const BookmarkPage = () => {
  const [newsList, setNewList] = useState<INews[]>([]);
  const [newsSortBy, setSortBy] = useState(NEWS_HOME_SORT[0]);

  useEffect(() => {
    loadNews();
  }, [newsSortBy]);

  const loadNews = () => {
    const allBookmark = BookmarkManager.getAll(newsSortBy?.id);
    setNewList(allBookmark);
  };

  return (
    <Fragment>
      <div className="container">
        <NewsBlockHeader
          sortBy={newsSortBy}
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
