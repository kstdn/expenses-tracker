import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs/operators';
import { Messages } from 'src/app/constants/Messages';
import { Category } from 'src/app/models/Category';
import { CreateAccountDto } from 'src/app/models/dto/create-account.dto';
import { ServerService } from 'src/app/services/server.service';
import { AutoUnsubscribe } from 'take-while-alive';
import { CreateCategoryDto, UpdateCategoryDto } from 'src/app/models/dto/create-category.dto';

interface CategoryCrudComponentInput {
  category: Category,
  accountId: string,
}

@Component({
  templateUrl: './category-crud.component.html',
  styleUrls: ['./category-crud.component.scss']
})
@AutoUnsubscribe()
export class CategoryCrudComponent implements OnInit {

  deleteButtonVisible = false;
  deleteConfirmationPromptVisible = false;

  form: FormGroup;

  constructor(
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<CategoryCrudComponent>,
    public builder: FormBuilder,
    private server: ServerService,
    @Optional() @Inject(MAT_DIALOG_DATA) public input: CategoryCrudComponentInput,
  ) { }

  ngOnInit() {
    this.form = this.builder.group({
      name: ['', Validators.required],
      sign: [''],
    })

    if (this.input.category) {
      this.form.controls.name.setValue(this.input.category.name);
      this.form.controls.sign.setValue(this.input.category.sign);

      this.deleteButtonVisible = true;
    }
  }

  getMode() {
    if (this.input.category) {
      return 'Edit';
    } else {
      return 'Add';
    }
  }

  isInEditMode() {
    return this.input.category;
  }

  submit() {
    if (!this.input.category) {
      const category: CreateCategoryDto = collectInputs(this.form);
      this.server.addCategory(category, this.input.accountId)
      .pipe(finalize(() => this.remove(true)))
      .subscribe();
    } else {
      const updatedCategory: Category = {
        ...this.input.category,
        ...collectInputs(this.form)
      }
      this.server.updateCategory(this.input.category.id, updatedCategory, this.input.accountId)
        .pipe(finalize(() => this.remove(true)))
        .subscribe();
    }
  }

  submitDelete() {
    this.server.deleteAccount(this.input.category.id)
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

const collectInputs = (form: FormGroup): CreateCategoryDto => {
  return {
    name: form.controls.name.value,
    sign: form.controls.sign.value,
  }
}
