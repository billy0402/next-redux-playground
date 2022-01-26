import { TypedUseSelectorHook, useSelector } from 'react-redux';

import { AppState } from '@models/store';

const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

export default useAppSelector;
