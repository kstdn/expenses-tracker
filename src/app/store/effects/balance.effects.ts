import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as balanceActions from './../actions/balance.actions';
import * as movementActions from './../actions/movement.actions';
import { switchMap, map } from 'rxjs/operators';
import { ServerService } from 'src/app/services/server.service';

@Injectable()
export class BalanceEffects {
    constructor(
        private actions$: Actions,
        private serverService: ServerService
    ) { }

    $loadMovementGroupsSuccess = createEffect(() =>
        this.actions$
            .pipe(
                ofType(movementActions.loadMovementGroupsSuccess),
                map(() => balanceActions.loadBalance())));

    $loadBalance = createEffect(() =>
        this.actions$
            .pipe(
                ofType(balanceActions.loadBalance),
                switchMap(() =>
                    this.serverService.getCurrentBalance()
                        .pipe(
                            map((balance) => balanceActions.loadBalanceSuccess({
                                data: balance
                            }))))));
}
