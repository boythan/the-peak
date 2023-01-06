import { join } from "lodash";
import { GetServerSideProps } from "next";
import API from "../../api/API";
import { INews } from "../../interface/news";
import NewsDetail from "../../screen/news/NewsDetail";

export interface PageProps {
  news: INews | null;
}

export async function getServerSideProps(context) {
  const newsIds = context?.params?.newsId ?? "";
  const newsId = join(newsIds, "/");

  const newsRes = await API.detail(newsId as any, {
    "show-fields": "thumbnail,trailText,headline,body",
  });
  const news = newsRes?.data?.response?.content;

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
