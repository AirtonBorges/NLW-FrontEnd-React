import { useContext } from "react";
import { authContext } from '../contexts/AuthContext';

export function useAuthContext() {
  const value = useContext( authContext )

  return value;
}
