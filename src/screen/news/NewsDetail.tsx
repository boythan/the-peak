import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import BookmarkButton from "../../components/bookmark/BookmarkButton";
import { INews } from "../../interface/news";
import BookmarkManager from "../../local-storage/BookmarkManager";

interface INewsDetail {
  news: INews;
}

const NewsDetail = ({ news }: INewsDetail) => {
  const { fields, id, webTitle, webPublicationDate } = news;
  console.log("webPublicationDate", webPublicationDate);

  const [isBookmark, setIsBookmark] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsBookmark(BookmarkManager.isBookmarked(news?.id));
    }
  }, []);

  const addBookmark = () => {
    BookmarkManager.add(news);
    setIsBookmark(true);
  };

  const removeBookmark = () => {
    BookmarkManager.remove(news?.id);
    setIsBookmark(false);
  };

  return (
    <div className="container">
      <div className="news-detail__container">
        <div
          className="news-detail__image-container"
          hidden={!fields?.thumbnail}
        >
          <img src={fields?.thumbnail} className="news-detail__image" />
        </div>
        <div className="news-detail__content-container">
          {!isBookmark && (
            <BookmarkButton onClick={addBookmark} content="add bookmark" />
          )}
          {isBookmark && (
            <BookmarkButton
              onClick={removeBookmark}
              content="remove bookmark"
            />
          )}
          <div className="mt-5 small">
            {moment(webPublicationDate).format("ddd DD MMM YYYY HH:mm Z")}
          </div>
          <h4>{webTitle}</h4>
          <h6>{fields?.headline}</h6>
          <div
            dangerouslySetInnerHTML={{ __html: fields?.body ?? "" }}
            className="news-detail__content-body mt-4"
          />
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
