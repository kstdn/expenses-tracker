import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as movementActions from '../actions/movement.actions';
import { switchMap, map } from 'rxjs/operators';
import { ServerService } from 'src/app/services/server.service';

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
                    return movementActions.loadMovements(interval);
                })
            )
    );

    $loadMovements = createEffect(() =>
        this.actions$
            .pipe(
                ofType(movementActions.loadMovements),
                switchMap(({ data: interval }) =>
                    this.serverService.getAllMovements(interval)
                        .pipe(
                            map(movements => movementActions.loadMovementsSuccess({
                                data: movements.items
                            }))))));

    $addMovement = createEffect(() =>
        this.actions$
            .pipe(
                ofType(movementActions.addMovement),
                switchMap(({ data: movement }) =>
                    this.serverService.addMovement(movement)
                        .pipe(
                            map(movement => movementActions.addMovementSuccess({
                                data: movement
                            }))))));

}
