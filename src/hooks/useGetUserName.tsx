import { useGetUserId } from '@hooks/useGetUserId';
import type { UserModel } from '@type/user.model';
import { useCallback, useEffect, useState } from 'react';
import { supabase } from 'src/lib/supabase/supabase';

export const useGetUserName = (): {
  getUserName: () => void;
  userName: string;
} => {
  const [userName, setUserName] = useState<string>('');
  const userID = useGetUserId();
  const getUserName = useCallback(async (): Promise<void> => {
    try {
      const { data, error } = await supabase
        .from<{ userName: UserModel['userName'] }>('users')
        .select('userName')
        .match({ userId: userID });
      if (data) {
        const userName = data[0].userName;
        setUserName(userName);
      }
      if (error || !data) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  }, [userID]);

  useEffect(() => {
    getUserName();
  }, [getUserName]);

  return { getUserName, userName };
};
