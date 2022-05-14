export interface UserDetailsDTO {
  username?: string;
  password?: string;
  sessionId?: string;
  roles?: string[];
  data?: Map<string, string>
}
