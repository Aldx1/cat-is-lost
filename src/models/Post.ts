export interface IPost {
  id?: number;
  user_id?: number;
  name: string;
  description: string;
  pictures: string;
  lat: number;
  lng: number;
  date_missing: Date;
  found: boolean;
}
