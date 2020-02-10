import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

import * as TimepointsActions from './timepoints.actions';

@Injectable()
export class TimepointsEffects {

  loadTimepointss$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(TimepointsActions.loadTimepoints),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map(data => TimepointsActions.loadTimepointsSuccess({ data })),
          catchError(error => of(TimepointsActions.loadTimepointsFailure({ error }))))
      )
    );
  });

  constructor(private actions$: Actions) {}

}
