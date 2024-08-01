import { IRolesForm } from "./IRolesForm"

export interface IUserSigleForm{
    name: string,
    last_name: string,
    day_of_birth: string
    email: string,
    mobile_number: string,
    address: string,
    user_pk_id: string
    fingerprint_scanner_user_id: string,
    roles:IRolesForm[]
}

export interface IUserSigle
{

  name: string;
  last_name: string;
  email: string;
  level?: any;
  address?: any;
  id_card_number?: any;
  mobile_number: string;
  day_of_birth?: any;
  user_pk_id: string;
  roles: Role[];
  fingerprint_scanner_user_id: number;
}
interface Role {
  role_pk_id: string;
  name: string;
  cluster: string;
}
