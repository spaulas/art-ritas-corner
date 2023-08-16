export type Text = {
  fr: string;
  en: string;
};

export type ImageType = {
  id: string;
  title?: Text;
  description?: Text;
  price?: number;
  duration?: number;
  src: string;
  link?: string;
};

export type BlobType = {
  color: string;
  id: number;
  angle?: number;
  size?: string;
};

export type CategoryType = {
  id: string;
  title: Text;
  description: Text;
  subCategory?: Text;
  titlePosition: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  flower: { id: number; position: string };
  images?: ImageType[];
  blobs?: BlobType[];
  paragraphs?: Text[];
};

export type ScheduleType = {
  start: number;
  end: number;
};

export type DayScheduleType = {
  morning?: ScheduleType;
  afternoon?: ScheduleType;
};

export type CalendarType = {
  schedules: {
    monday: DayScheduleType;
    tuesday: DayScheduleType;
    wednesday: DayScheduleType;
    thursday: DayScheduleType;
    friday: DayScheduleType;
    saturday: DayScheduleType;
    sunday: DayScheduleType;
  };
  busy: ScheduleType[];
};

export type NailsPrices = {
  id: string;
  serviceName: Text;
  price: number | Text;
};

export type TCCategory = {
  title: Text;
  description?: Text;
  ranges?: Text[];
};

export type NailsTC = {
  categories: TCCategory[];
};

export type Welcome = {
  paragraphs: Text[];
};

export type UploadedFiles = File & { src: string | ArrayBuffer | null };

export type DataType = {
  categories: { paintings: CategoryType[]; nails: CategoryType[] };
  profile: {
    text?: Text;
  };
  welcome: Welcome;
  calendar: CalendarType;
  nailsPrices: NailsPrices[];
  nailsTC: NailsTC;
};
