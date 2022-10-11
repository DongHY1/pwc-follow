import MainLayout, { Card } from '../layouts/MainLayout';
import { useQueryClient } from 'react-query';
import { trpc } from '../api/APIProvider';
import type { NextPage } from 'next';
import useRequiresAuth from '../hooks/useRequiresAuth';
import { useAuth } from '../contexts/auth';
const Profile: NextPage = () => {
  const { user, isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  const { data: users } = trpc.useQuery(['user/all'], {
    enabled: isAuthenticated,
  });
  const { data: follow } = trpc.useQuery(['user/follow'], {
    enabled: isAuthenticated,
  });
  const { mutate: followMutate } = trpc.useMutation(['user/subscribe'], {
    onSuccess: () => {
      queryClient.invalidateQueries(['user/follow']);
    },
  });
  const { mutate: unfollowMutate } = trpc.useMutation(['user/unsubscribe'], {
    onSuccess: () => {
      queryClient.invalidateQueries(['user/follow']);
    },
  });
  useRequiresAuth(isAuthenticated);
  const handleFollowClick = (id: string) => {
    // 把用户id 加到follower里
    console.log(`follow ${id}`);
    followMutate({ id });
  };
  const handleUnFollowClick = (id: string) => {
    unfollowMutate({ id });
  };
  return (
    <MainLayout>
      <Card>
        <>
          <h1 className="font-black text-3xl mb-10">{user?.name} Profile</h1>
          <h1 className="font-black text-3xl mb-10">
            Follower : {follow?.followers.length}
          </h1>
          <h2 className="font-black text-3xl mb-10">
            Following : {follow?.followings.length}
          </h2>
          <h3>{JSON.stringify(follow?.followings)}</h3>
          <div className="max-w-xl"></div>
          <div>
            {users?.map((item) => (
              <>
                <ul>
                  <li>{item.name}</li>
                  <button onClick={() => handleFollowClick(item.id)}>
                    Follow
                  </button>
                  <button onClick={() => handleUnFollowClick(item.id)}>
                    UnFollow
                  </button>
                </ul>
              </>
            ))}
          </div>
          <div className="max-w-sm"></div>
        </>
      </Card>
    </MainLayout>
  );
};

export default Profile;
