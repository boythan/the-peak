// react
// third-party
import classnames from "classnames";
import { INews } from "../../interface/news";
import AppLink from "../AppLink";

export interface NewsCardProps {
  news: INews;
  className?: any;
}

function NewsCard(props: NewsCardProps) {
  const { news, className } = props;
  const { fields, id, webTitle } = news;
  const containerClasses = classnames("news-card", className);
  const imageClass = classnames("news-card__image");

  return (
    <AppLink href={"/home"} className={containerClasses}>
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
    </AppLink>
  );
}

export default NewsCard;
