import { Component, OnInit } from "@angular/core";
import { finalize, map } from "rxjs/operators";
import { Account } from 'src/app/models/Account';
import { DialogsService } from "src/app/services/dialogs.service";
import { ServerService } from "src/app/services/server.service";

@Component({
  selector: "et-accounts",
  templateUrl: "./accounts.component.html",
  styleUrls: ["./accounts.component.scss"],
})
export class AccountsComponent implements OnInit {

  accounts: Account[];
  loading = false;

  constructor(
    private server: ServerService,
    private dialogsService: DialogsService
  ) {}

  ngOnInit() {
    this.reload();
  }

  reload() {
    this.loading = true;
    this.server.getAllAccounts().pipe(
      map((result) => this.accounts = result.items),
      finalize(() => this.loading = false)
    ).subscribe();
  }

  addAccount(): void {
    const dialogRef = this.dialogsService.openAccountCrud();
    dialogRef.afterClosed().subscribe((success) => {
      if (success) {
        this.reload();
      }
    });
  }

  editAccount(account: Account, $event: MouseEvent): void {
    $event.stopPropagation();
    const dialogRef = this.dialogsService.openAccountCrud(account);
    dialogRef.afterClosed().subscribe((success) => {
      if (success) {
        this.reload();
      }
    });
  }
}
