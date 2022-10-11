import { useRouter } from 'next/dist/client/router';
import { useEffect } from 'react';
import { useAuth } from '../contexts/auth';

const useRequiresAuth = (isAuthenticated: boolean) => {
  const router = useRouter();
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated]);
};

export default useRequiresAuth;
