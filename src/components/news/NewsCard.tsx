// react
// third-party
import classnames from "classnames";
import Link from "next/link";
import { INews } from "../../interface/news";

export interface NewsCardProps {
  news: INews;
  className?: any;
}

function NewsCard(props: NewsCardProps) {
  const { news, className } = props;
  const { fields, webTitle } = news;
  const containerClasses = classnames(
    "news-card",
    {
      "news-card__place-holder": !fields?.thumbnail,
    },
    className
  );

  const imageClass = classnames("news-card__image");

  return (
    <Link href={`/news/${news?.id}`} className={containerClasses}>
      <img
        className={imageClass}
        src={fields?.thumbnail ?? "/images/logo.png"}
      />
      <div className="news-card__info">
        <h6 className="news-card__info-title">{webTitle}</h6>
        <text
          className="news-card__info-trail"
          dangerouslySetInnerHTML={{ __html: fields?.trailText }}
        />
      </div>
    </Link>
  );
}

export default NewsCard;
