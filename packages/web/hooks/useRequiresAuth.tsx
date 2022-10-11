import { useRouter } from 'next/dist/client/router';
import { useEffect } from 'react';
import { useAuth } from '../contexts/auth';

const useRequiresAuth = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [router, isAuthenticated]);
};

export default useRequiresAuth;
