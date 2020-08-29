import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs/operators';
import { Messages } from 'src/app/constants/Messages';
import { Account } from 'src/app/models/Account';
import { ServerService } from 'src/app/services/server.service';
import { AutoUnsubscribe } from 'take-while-alive';

@Component({
  templateUrl: './account-crud.component.html',
  styleUrls: ['./account-crud.component.scss']
})
@AutoUnsubscribe()
export class AccountCrudComponent implements OnInit {

  deleteButtonVisible = false;
  deleteConfirmationPromptVisible = false;

  form: FormGroup;

  constructor(
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AccountCrudComponent>,
    public builder: FormBuilder,
    private server: ServerService,
    @Optional() @Inject(MAT_DIALOG_DATA) public account: Account
  ) { }

  ngOnInit() {
    this.form = this.builder.group({
      name: ['', Validators.required],
    })

    if (this.account) {
      this.form.controls.name.setValue(this.account.name);

      this.deleteButtonVisible = true;
    }
  }

  getMode() {
    if (this.account) {
      return 'Edit';
    } else {
      return 'Add';
    }
  }

  submit() {
    if (!this.account) {
      const account: Account = collectInputs(this.form);
      this.server.addAccount(account)
      .pipe(finalize(() => this.remove(true)))
      .subscribe();
    } else {
      const updatedAccount: Account = {
        ...this.account,
        ...collectInputs(this.form)
      }
      this.server.updateAccount(updatedAccount)
        .pipe(finalize(() => this.remove(true)))
        .subscribe();
    }
  }

  submitDelete() {
    this.server.deleteAccount(this.account.id)
      .subscribe({
        next: () => {
          this.snackBar.open(Messages.Deleted)
          this.remove(true)
        }
      });
  }

  showDeleteConfirmationPrompt() {
    this.deleteConfirmationPromptVisible = true;
  }

  hideDeleteConfirmationPrompt() {
    this.deleteConfirmationPromptVisible = false;
  }

  remove(isSuccess: boolean) {
    this.dialogRef.close(isSuccess);
  }

}

const collectInputs = (form: FormGroup): Account => {
  return {
    name: form.controls.name.value
  }
}
