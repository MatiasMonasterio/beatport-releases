import { Navigate } from "react-router-dom";
import { useAuthorization } from "contexts/authorization";

interface Props {
  children: React.ReactNode;
}

export default function PrivateRoute({ children }: Props) {
  const { user } = useAuthorization();

  return <>{user.isLogged ? children : <Navigate to="/auth/login" replace />}</>;
}
