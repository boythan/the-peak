import _, { filter } from "lodash";
import { INews } from "../interface/news";

const BOOKMARK_KEY: string = "the-peak-bookmark";

const BookmarkManager = {
  save: (bookmarks) => {
    return localStorage.setItem(BOOKMARK_KEY, JSON.stringify(bookmarks));
  },

  clear: () => {
    localStorage.set(BOOKMARK_KEY, []);
  },

  getAll: () => {
    return JSON.parse(localStorage.getItem(BOOKMARK_KEY) ?? "[]");
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
};

export default BookmarkManager;
