import React from 'react';
import toast from 'react-hot-toast';

export const useErrorNotificationToast = (errorMessage?: string) => {
  React.useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
    }
  }, [errorMessage]);
};
