import { join } from "lodash";
import API from "../../api/API";
import { INews } from "../../interface/news";
import NewsDetail from "../../screen/news/NewsDetail";

export interface PageProps {
  news: INews | null;
}

/**
 * Load article's detail from server side
 */
export async function getServerSideProps(context) {
  const newsIds = context?.params?.newsId ?? "";
  const newsId = join(newsIds, "/");
  let news: INews | null = null;

  if (newsId?.length) {
    const newsRes = await API.detail(newsId as string, {
      "show-fields": "thumbnail,trailText,headline,body",
    });
    news = newsRes?.data?.response?.content;
  }

  return {
    props: {
      news,
    },
  };
}

function Page({ news }: PageProps) {
  if (!news) return "Not found";
  return <NewsDetail news={news} />;
}

export default Page;
