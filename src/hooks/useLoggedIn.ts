import { useRouter } from 'next/router';

import useAppSelector from './useAppSelector';

const useLoggedIn = () => {
  const router = useRouter();
  const auth = useAppSelector((state) => state.auth);

  const loginGuard = () => {
    if (!auth.data.isLoggedIn && router.pathname !== '/auth') {
      router.push('/auth');
    }
  };

  return { loginGuard };
};

export default useLoggedIn;
