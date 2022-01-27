import { createAction } from '@reduxjs/toolkit';

import { HYDRATE } from 'next-redux-wrapper';

import { AppState } from '@models/store';

const hydrate = createAction<AppState>(HYDRATE);

export default hydrate;
