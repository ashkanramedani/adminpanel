export interface IPost {
  post_title: string;
  post_summary: string;
  post_discribtion?: string;
  post_content: string;
  post_image: string;
  priority: number;
  post_status: number;
  post_direction: string;
  visible?: boolean;
  post_type: string;
  expier_date: string;
  category?: [];
  tag: string[] ;
  post_audio_file_link: string;
  post_audio_file_path: string;
  post_aparat_video_id: string;
  post_aparat_video_code: string;
  post_video_file_link: string;
  post_video_file_path: string;
  post_data_file_link: string;
  post_data_file_path: string;
  users_post_speaker:  string[];
  users_post_writer:  string[];
  users_post_actor:  string[];
  user_creator_fk_id?: number;
  create_date:string
  post_pk_id:string
}
