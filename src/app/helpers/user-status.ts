import { useSession } from "next-auth/react";

const UserStatus = () => {
  const { status } = useSession();
  return status;
};

export default UserStatus;