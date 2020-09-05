import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IconOptions } from './icon-options';

@Component({
  selector: 'et-icon-picker',
  templateUrl: './icon-picker.component.html',
  styleUrls: ['./icon-picker.component.scss']
})
export class IconPickerComponent implements OnInit {

  iconOptions = IconOptions;
  filteredIconOptions = this.iconOptions;

  form: FormGroup;

  @Input() icon: string;
  @Output() iconSelected: EventEmitter<string> = new EventEmitter();

  constructor(
    public builder: FormBuilder,
  ) { }

  ngOnInit() {
    this.form = this.builder.group({
      iconSearch: [''],
    })

    this.form.get('iconSearch').valueChanges.subscribe(value => {
      this.filteredIconOptions = this.iconOptions.filter(io => io.includes(value));
    });
  }

  isSelected(icon: string) {
    return icon === this.icon;
  }

  toggle(iconOption: string) {
    this.iconSelected.emit(iconOption === this.icon ? undefined : iconOption)
  }

  submit() {
    this.iconSelected.emit()
  }

}
