import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, concatMap, filter, finalize, take } from 'rxjs/operators';
import { ServerService } from '../services/server.service';
import { Router } from '@angular/router';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
  isRefreshingToken = false;

  tokenRefreshed$ = new BehaviorSubject<boolean>(false);

  constructor(
    private serverService: ServerService,
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(err => {
        if (err.status === 401) {
          return this.handle401Error(req, next);
        }

        return throwError(err);
      })
    );
  }

  private handle401Error(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    if (this.isRefreshingToken) {
      return this.tokenRefreshed$.pipe(
        filter(Boolean),
        take(1),
        concatMap(() => next.handle(req))
      );
    }

    this.isRefreshingToken = true;

    // Reset here so that the following requests wait until the token
    // comes back from the refreshToken call.
    this.tokenRefreshed$.next(false);

    return this.serverService.refreshToken().pipe(
      concatMap(() => {
          this.tokenRefreshed$.next(true);
          return next.handle(req);
      }),
      catchError((err) => {
        this.router.navigate(['/login']);
        return throwError(err);
      }),
      finalize(() => {
        this.isRefreshingToken = false;
      })
    );
  }
}
