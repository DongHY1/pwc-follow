import MainLayout, { Card } from '../layouts/MainLayout';
import { trpc } from '../api/APIProvider';
import type { NextPage } from 'next';
import useRequiresAuth from '../hooks/useRequiresAuth';
import { useAuth } from '../contexts/auth';
const Profile: NextPage = () => {
  const { isAuthenticated } = useAuth();
  const { data: users } = trpc.useQuery(['user/all'], {
    enabled: isAuthenticated,
  });
  useRequiresAuth(isAuthenticated);
  return (
    <MainLayout>
      <Card>
        <>
          <h1 className="font-black text-3xl mb-10">My Profile</h1>
          <div className="max-w-xl"></div>
          <p>{JSON.stringify(users)}</p>
          <div className="max-w-sm"></div>
        </>
      </Card>
    </MainLayout>
  );
};

export default Profile;
