import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as movementActions from '../actions/movement.actions';
import { switchMap, map } from 'rxjs/operators';
import { ServerService } from 'src/app/services/server.service';
import { groupMovementsBy } from 'src/app/helpers/util';

@Injectable()
export class MovementEffects {
    constructor(
        private actions$: Actions,
        private serverService: ServerService
    ) { }

    $setInterval = createEffect(() =>
        this.actions$
            .pipe(
                ofType(movementActions.setMovementsInterval),
                map(interval => {
                    return movementActions.loadMovementGroups(interval);
                })
            )
    );

    $loadMovements = createEffect(() =>
        this.actions$
            .pipe(
                ofType(movementActions.loadMovementGroups),
                switchMap(({ data: interval }) =>
                    this.serverService.getAllMovements(interval)
                        .pipe(
                            map(data => groupMovementsBy(data, 'timestamp')),
                            map(movements => movementActions.loadMovementGroupsSuccess({
                                data: movements
                            }))))));

}
