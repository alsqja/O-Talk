export interface Iuser{
  id: Number,
  name: String,
  profile: string,
}
export interface Ireviews{
  id: Number,
  content: String,
  stars: Number,
  user: Iuser,
}
export interface IChatRoomInfo{
  id: Number,
  title: String,
  contents: String,
  createdAt: String,
  updatedAt: String,
  user: Iuser,
  reviews: Ireviews[],
}