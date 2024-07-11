export interface IOTP{
  user_pk_id: string,
  username: string,
  mobile_number: string,
  has_account: boolean,
  has_password: boolean,
  login_method: string,
  otp_send_successful: boolean,
  email_send_successful: boolean
}
