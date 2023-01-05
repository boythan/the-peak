import { map, slice } from "lodash";
import { Fragment, useEffect, useState } from "react";
import API from "../../api/API";
import NewsBlock from "../../components/news/NewsBlock";
import NewsBlockCulture from "../../components/news/NewsBlockCulture";
import NewsBlockHeader from "../../components/news/NewsBlockHeader";
import NewsBlockLifeStyle from "../../components/news/NewsBlockLifeStyle";
import NewsBlockSport from "../../components/news/NewsBlockSport";
import NewsCard from "../../components/news/NewsCard";
import { NEWS_HOME_SORT } from "../../constant/news";
import { INews } from "../../interface/news";

interface IHomePage {}

const SearchPage = ({}: IHomePage) => {
  const [newsList, setNewList] = useState<INews[]>([]);
  const [sortBy, setSortBy] = useState(NEWS_HOME_SORT[0]);

  useEffect(() => {
    loadNews();
  }, [sortBy]);

  const loadNews = () => {
    API.search({
      "show-fields": "thumbnail,trailText",
      page: 1,
      "page-size": 8,
      "order-by": sortBy?.id,
      section: "news",
    }).then((res: any) => {
      const newsList = res?.data?.response?.results ?? [];
      setNewList(newsList);
    });
  };

  return (
    <Fragment>
      <div className="container">
        <NewsBlockHeader
          sortBy={sortBy}
          onChangeSort={(item) => setSortBy(item)}
          title="Search result"
        />
        <div className="mt-5">
          <NewsBlock newsList={newsList} />
        </div>
      </div>
    </Fragment>
  );
};

export default SearchPage;
