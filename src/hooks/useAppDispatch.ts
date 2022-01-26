import { useDispatch } from 'react-redux';

import { AppDispatch } from '@models/store';

const useAppDispatch = () => useDispatch<AppDispatch>();

export default useAppDispatch;
