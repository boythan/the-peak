// react
// third-party
import classnames from "classnames";
import { memo } from "react";
import Image from "next/image";
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
      <Image
        className={imageClass}
        layout="fill"
        src={fields?.thumbnail}
        alt={id}
      />
      <div className="news-card__info">
        <h6 className="news-card__info-title">{webTitle}</h6>
        <text className="news-card__info-trail">{fields?.trailText}</text>
      </div>
    </AppLink>
  );
}

export default NewsCard;
