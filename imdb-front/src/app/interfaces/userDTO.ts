import {MovieDTO} from "./movieDTO";

export interface UserDTO {
  id?: string;
  firstname?: string;
  lastname?: string;
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  movies?: Set<MovieDTO>;
}
