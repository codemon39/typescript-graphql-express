import { authenticatedResolver } from "../../../utils/wrappedResolvers";

module.exports = {
  Mutation: {
    verifyEmail: authenticatedResolver.wrap(
      async (
        parent,
        { key }: { key: string },
        { entities: { User, Confirmation }, req }
      ) => {
        const { user } = req;
        const confirmation = await Confirmation.findOne({
          key,
          user,
          type: "email"
        });
        if (confirmation) {
          user.verifiedEmail = true;
          user.save();
          await confirmation.remove();
          return {
            ok: true
          };
        } else {
          return {
            ok: false,
            error: {
              message: "Verification token is not valid or has expired."
            }
          };
        }
      }
    )
  }
};