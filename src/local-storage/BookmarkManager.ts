import _, { filter, includes, map, sortBy } from "lodash";
import moment from "moment";
import { INews } from "../interface/news";

const BOOKMARK_KEY: string = "the-peak-bookmark";

const BookmarkManager = {
  save: (bookmarks) => {
    return localStorage.setItem(BOOKMARK_KEY, JSON.stringify(bookmarks));
  },

  clear: () => {
    localStorage.set(BOOKMARK_KEY, []);
  },

  getAll: (sort = "newest") => {
    const allBookmark = JSON.parse(localStorage.getItem(BOOKMARK_KEY) ?? "[]");

    const bookmarkSorted = sortBy(allBookmark, (item) => {
      const newsTimestamp = moment(item.webPublicationDate).valueOf();
      if (sort === "newest") {
        return -newsTimestamp;
      }

      return newsTimestamp;
    });

    return bookmarkSorted;
  },

  add: (bookMark: INews) => {
    const allBookmark = BookmarkManager.getAll() ?? [];
    if (bookMark?.id) {
      const newAllBookmarks = [...allBookmark, bookMark];
      BookmarkManager.save(newAllBookmarks);
      return newAllBookmarks;
    }

    return allBookmark;
  },

  remove: (id: string) => {
    const allBookmark = BookmarkManager.getAll() ?? [];
    const removedBookmark = filter(allBookmark, (item) => item.id !== id);
    BookmarkManager.save(removedBookmark);
    return removedBookmark;
  },

  isBookmarked: (id: string) => {
    const allBookmark = BookmarkManager.getAll() ?? [];
    const bookmarkIds = map(allBookmark, (item) => item.id);
    return includes(bookmarkIds, id);
  },
};

export default BookmarkManager;
