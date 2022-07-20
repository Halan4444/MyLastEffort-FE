import { Role } from './role';

export interface Usertoken {
  id?: string;
  username?: string;
  password?: string;
  emai?: string;
  avtar?: string;
  accessToken?: string;
  enabled?: boolean;
  roles?: Role[];
}
