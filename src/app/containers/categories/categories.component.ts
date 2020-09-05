import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { finalize, map } from "rxjs/operators";
import { Category } from 'src/app/models/Category';
import { DialogsService } from "src/app/services/dialogs.service";
import { ServerService } from "src/app/services/server.service";

@Component({
  templateUrl: "./categories.component.html",
  styleUrls: ["./categories.component.scss"],
})
export class CategoriesComponent implements OnInit {

  categories: Category[] = [];
  loading = false;

  get accountId() {
    return this.activatedRoute.snapshot.paramMap.get("id");
  }

  constructor(
    private server: ServerService,
    private dialogsService: DialogsService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.reload();
  }

  reload() {
    this.loading = true;
    this.server.getAllCategories(this.accountId).pipe(
      map((result) => this.categories = result),
      finalize(() => this.loading = false)
    ).subscribe();
  }

  addCategory(): void {
    const dialogRef = this.dialogsService.openCategoryCrud(undefined, this.accountId);
    dialogRef.afterClosed().subscribe((success) => {
      if (success) {
        this.reload();
      }
    });
  }

  editCategory(category: Category, $event: MouseEvent): void {
    $event.stopPropagation();
    const dialogRef = this.dialogsService.openCategoryCrud(category, this.accountId);
    dialogRef.afterClosed().subscribe((success) => {
      if (success) {
        this.reload();
      }
    });
  }
}
