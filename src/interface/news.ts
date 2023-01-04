export interface INewsField {
  thumbnail: string;
  trailText: string;
}

export interface INews {
  id: string;
  type: string;
  sectionId: string;
  sectionName: string;
  webPublicationDate?: string;
  webTitle?: string;
  webUrl?: string;
  apiUrl?: string;
  pillarId?: string;
  pillarName?: string;
  isHosted?: boolean;
  fields: INewsField;
}
