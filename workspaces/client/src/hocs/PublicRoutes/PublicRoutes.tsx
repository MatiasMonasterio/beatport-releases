import { Navigate } from "react-router-dom";
import { useAuthorization } from "contexts/authorization";

interface Props {
  children: React.ReactNode;
}

export default function PublicRoutes({ children }: Props) {
  const { user } = useAuthorization();
  return <>{!user.isLogged ? children : <Navigate to="/" replace />}</>;
}
