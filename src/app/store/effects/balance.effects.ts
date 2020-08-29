import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import { ServerService } from 'src/app/services/server.service';
import * as balanceActions from './../actions/balance.actions';
import * as movementActions from './../actions/movement.actions';

@Injectable()
export class BalanceEffects {
    constructor(
        private actions$: Actions,
    ) { }

    $loadMovementGroupsSuccess = createEffect(() =>
        this.actions$
            .pipe(
                ofType(movementActions.loadMovementsSuccess),
                map(() => balanceActions.loadBalance())));

}
