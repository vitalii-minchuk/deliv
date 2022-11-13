import { Query, Resolver } from "type-graphql";
import { User } from "./user.dto";

@Resolver(() => User)
class UserResolver {
  @Query(() => User)
  user() {
    return {
      id: "232323",
      email: "34332",
      username: "mcm",
    };
  }
}

export default UserResolver;
