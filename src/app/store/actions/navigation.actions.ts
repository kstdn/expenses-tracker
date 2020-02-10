import { createAction } from '@ngrx/store';

export const expandToolbar = createAction(
    '[Navigation] Expand Toolbar'
);

export const closeToolbar = createAction(
    '[Navigation] Close Toolbar'
);

export const toggleToolbar = createAction(
    '[Navigation] Toggle Toolbar'
);