import { User } from "../../models/user";

class UserService {
  static create = async (data: any) => {
    await User.create(data);
  };
}
