import { User } from "../accounting/user/user.entity";
import { UserDetail } from "../accounting/user-detail/user-detail.entity";

export const USER_ENTITY = "user";

export const USER_DETAIL_ENTITY = "userDetail";

export const ENTITIES = {
  [USER_ENTITY]: User,
  [USER_DETAIL_ENTITY]: UserDetail,
};
