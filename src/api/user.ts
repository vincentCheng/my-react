import { httpGet } from "@/utils/request";

interface UserInfoResponse {
  uid: string;
  nickname: string;
  age: number;
}

export const getUserInfo = (uid: string) => {
  return httpGet<UserInfoResponse>(`user_info/?uid=${uid}`);
};
