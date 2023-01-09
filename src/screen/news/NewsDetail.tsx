import { join } from "lodash";
import moment from "moment";
import { useRouter } from "next/router";
import { useContext, useEffect, useMemo, useState } from "react";
import API from "../../api/API";
import BookmarkButton from "../../components/bookmark/BookmarkButton";
import AppLayoutContext from "../../context/app";
import { AppNotificationType } from "../../interface/app";
import { INews } from "../../interface/news";
import BookmarkManager from "../../local-storage/BookmarkManager";

const NewsDetail = () => {
  const router = useRouter();

  const { setAppNotification, fetchNews } = useContext(AppLayoutContext);
  const [news, setNews] = useState<INews | null>();
  const [isBookmark, setIsBookmark] = useState(false);

  useEffect(() => {
    let ignore = false;

    const newsIds = router.query?.newsId ?? "";
    const newsId = join(newsIds, "/");

    if (news?.id === newsId) return;

    if (newsId?.length) {
      fetchNews(
        [
          {
            method: API.detail,
            params: [
              newsId,
              {
                "show-fields": "thumbnail,trailText,headline,body",
                "show-elements": "audio,image",
              },
            ],
          },
        ],
        ([newsRes]) => {
          const news = newsRes?.data?.response?.content;
          if (!ignore) {
            setIsBookmark(BookmarkManager.isBookmarked(news?.id));
            setNews(news);
          }
        }
      );
    }

    return () => {
      ignore = true;
    };
  }, [router.query]);

  if (!news) return <div />;

  const addBookmark = () => {
    BookmarkManager.add(news);
    setIsBookmark(true);
    setAppNotification({
      type: AppNotificationType.SUCCESS,
      content: renderSavedBookmarkAlert(),
    });
  };

  const removeBookmark = () => {
    BookmarkManager.remove(news?.id);
    setIsBookmark(false);
    setAppNotification({
      type: AppNotificationType.ERROR,
      content: renderRemovedBookmarkAlert(),
    });
  };

  const renderSavedBookmarkAlert = () => (
    <div className="d-flex">
      <img src="/images/bookmark-on.svg" className="mr-2" />
      <text className="text-white">SAVED TO BOOKMARKS</text>
    </div>
  );

  const renderRemovedBookmarkAlert = () => (
    <div className="d-flex">
      <img src="/images/bookmark-off.svg" className="mr-2" />
      <text className="text-white">REMOVED FROM BOOKMARKS</text>
    </div>
  );

  return (
    <div className="container">
      <div className="news-detail__container">
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
            {moment(news?.webPublicationDate).format("ddd DD MMM YYYY HH:mm Z")}
          </div>
          <h4 className="mt-5">{news?.webTitle}</h4>
          <h6 className="mt-4">{news?.fields?.headline}</h6>
          <div
            dangerouslySetInnerHTML={{ __html: news?.fields?.body ?? "" }}
            className="news-detail__content-body mt-4"
          />
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
