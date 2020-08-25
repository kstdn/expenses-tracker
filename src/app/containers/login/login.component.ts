import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ServerService } from "src/app/services/server.service";
import { Router } from "@angular/router";
import { tap, catchError } from "rxjs/operators";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Messages } from "src/app/constants/Messages";
import { throwError } from "rxjs";

@Component({
  selector: "et-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private builder: FormBuilder,
    private server: ServerService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.form = this.builder.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  onFormSubmit($event: Event) {
    $event.stopPropagation();
    this.server
      .login(this.form.get("username").value, this.form.get("password").value)
      .pipe(
        tap((_) => this.router.navigate(["/home"])),
        catchError((err) => {
          this.snackBar.open(Messages.GeneralError);
          return throwError(err);
        })
      )
      .subscribe();
  }
}
