import { TypedUseSelectorHook, useSelector } from 'react-redux';

import { RootState } from '@models/store';

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useAppSelector;
