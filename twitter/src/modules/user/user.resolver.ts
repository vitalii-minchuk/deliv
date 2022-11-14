import { Ctx, Mutation, Query, Resolver } from "type-graphql";
import { Context } from "../../utils/create-server";
import { User } from "./user.dto";

@Resolver(() => User)
class UserResolver {
  @Mutation(() => User)
  async register() {
    try {
    } catch (error) {}
  }
  @Query(() => User)
  me(@Ctx() context: Context) {
    return context.user;
  }
}

export default UserResolver;
