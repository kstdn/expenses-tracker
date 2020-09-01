import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';

@Injectable()
export class MovementEffects {
    constructor(
        private actions$: Actions,
    ) { }

}
