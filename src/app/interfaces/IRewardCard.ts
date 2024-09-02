export interface IRewardCardInsert {
  created_fk_by: string;
  description: string;
  reward_amount: number;
  reward_type: string;
  start_date: string;
  end_date: string;
  user_fk_id: string;
}
export interface IRewardCardUpdata {
  created_fk_by: string;
  description: string;
  reward_amount: number;
  reward_type: string;
  start_date: string;
  end_date: string;
  reward_card_pk_id: string;
}
export interface IRewardCardSingle {
  create_date: string;
  user_fk_id: string;
  update_date?: any;
  created_fk_by: string;
  visible: boolean;
  delete_date?: any;
  reward_amount: number;
  priority: number;
  expire_date?: any;
  reward_type: string;
  deleted: boolean;
  description: string;
  start_date: string;
  can_update: boolean;
  note: Note;
  end_date: string;
  can_deleted: boolean;
  status: string;
  reward_card_pk_id: string;
}
export interface IRewardCardAll {

  created_fk_by: string;
  description: string;
  visible: boolean;
  priority: number;
  can_update: boolean;
  can_deleted: boolean;
  reward_amount: number;
  reward_type: string;
  start_date: string;
  end_date: string;
  reward_card_pk_id: string;
  created: Created;
  status: string;
  note: Note;
  employee: Created;
}
interface Note {
}
interface Created {
  user_pk_id: string;
  name: string;
  last_name: string;
}


