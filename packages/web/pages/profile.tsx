import MainLayout, { Card } from '../layouts/MainLayout';
import { useQueryClient } from 'react-query';
import { trpc } from '../api/APIProvider';
import Follow from '../components/Follow';
import type { NextPage } from 'next';
import useRequiresAuth from '../hooks/useRequiresAuth';
import { useAuth } from '../contexts/auth';
const Profile: NextPage = () => {
  const { user, isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  const { data: users } = trpc.useQuery(['user/all'], {
    enabled: isAuthenticated,
  });
  const { data: list } = trpc.useQuery(['user/list'], {
    enabled: isAuthenticated,
  });
  const { mutate: followMutate } = trpc.useMutation(['user/subscribe'], {
    onSuccess: () => {
      console.log('我关注了!');
      queryClient.invalidateQueries(['user/all']);
      queryClient.invalidateQueries(['user/list']);
    },
  });
  const { mutate: unfollowMutate } = trpc.useMutation(['user/unsubscribe'], {
    onSuccess: () => {
      queryClient.invalidateQueries(['user/all']);
      queryClient.invalidateQueries(['user/list']);
    },
  });
  const hasFollow = (id: string): boolean => {
    let flag = false;
    list?.followinglist?.map((item: any) => {
      if (item.followingId === id) {
        flag = true;
      }
    });
    return flag;
  };
  useRequiresAuth(isAuthenticated);
  return (
    <MainLayout>
      <Card>
        <>
          <h1 className="font-black text-3xl mb-10">{user?.name} Profile</h1>
          <h1 className="font-black text-3xl mb-10">
            Follower : {list?.followerslist?.length}
          </h1>

          <h2 className="font-black text-3xl mb-10">
            Following : {list?.followinglist?.length}
          </h2>
          <div className="flex justify-between">
            {/* Following List */}
            <div className="p-4 w-full max-w-md bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                  Your Following Lists
                </h5>
              </div>
              <div>
                <ul
                  role="list"
                  className="divide-y divide-gray-200 dark:divide-gray-700"
                >
                  {list?.followinglist?.map((user) => (
                    <>
                      <li className="py-3 sm:py-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 rounded-full" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-m font-medium text-gray-900 truncate dark:text-white">
                              {user.following.name}
                            </p>
                            <p className="text-m text-gray-500 truncate dark:text-gray-400">
                              Email: {user.following.email}
                            </p>
                          </div>
                          <Follow
                            id={user.following.id}
                            hasFollow={hasFollow(user.following.id)}
                            unFollowMutate={unfollowMutate}
                            followMutate={followMutate}
                          />
                        </div>
                      </li>
                    </>
                  ))}
                </ul>
              </div>
            </div>
            {/* All User List */}
            <div className="p-4 w-full max-w-md bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                  All User Lists
                </h5>
              </div>
              <div>
                <ul
                  role="list"
                  className="divide-y divide-gray-200 dark:divide-gray-700"
                >
                  {users?.map((user) => (
                    <>
                      <li className="py-3 sm:py-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 rounded-full" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-m font-medium text-gray-900 truncate dark:text-white">
                              {user.name}
                            </p>
                            <p className="text-m text-gray-500 truncate dark:text-gray-400">
                              Email: {user.email}
                            </p>
                          </div>
                          <Follow
                            id={user.id}
                            hasFollow={hasFollow(user.id)}
                            unFollowMutate={unfollowMutate}
                            followMutate={followMutate}
                          />
                        </div>
                      </li>
                    </>
                  ))}
                </ul>
              </div>
            </div>
            {/* Follower List */}
            <div className="p-4 w-full max-w-md bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                  Your Follower Lists
                </h5>
              </div>
              <div>
                <ul
                  role="list"
                  className="divide-y divide-gray-200 dark:divide-gray-700"
                >
                  {list?.followerslist?.map((user) => (
                    <>
                      <li className="py-3 sm:py-4">
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 rounded-full" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-m font-medium text-gray-900 truncate dark:text-white">
                              {user.follower.name}
                            </p>
                            <p className="text-m text-gray-500 truncate dark:text-gray-400">
                              Email: {user.follower.email}
                            </p>
                          </div>
                        </div>
                      </li>
                    </>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </>
      </Card>
    </MainLayout>
  );
};

export default Profile;
