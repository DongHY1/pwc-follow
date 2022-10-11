import React from 'react';
interface FollowProps {
  id: string;
  hasFollow: boolean;
  followMutate: any;
  unFollowMutate: any;
}
export default function Follow(props: FollowProps) {
  const { id, hasFollow, followMutate, unFollowMutate } = props;
  const handleFollowClick = (id: string) => {
    hasFollow ? unFollowMutate({ id }) : followMutate({ id });
  };
  return (
    <button
      className={`inline-flex items-center text-base font-semibold  ${
        hasFollow ? 'text-red-900' : 'text-black-900'
      } dark:text-white`}
      onClick={() => handleFollowClick(id)}
    >
      {hasFollow ? 'Unfollow' : 'Follow'}
    </button>
  );
}
