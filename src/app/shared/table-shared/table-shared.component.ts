import {Component, EventEmitter, Input, Output} from '@angular/core';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-table-shared',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './table-shared.component.html',
  styleUrl: './table-shared.component.scss'
})
export class TableSharedComponent {
  @Input() data: any[] = [];
  @Input() columns: { field: string, header: string, isList?: boolean }[] = [];
  @Input() showHeader: boolean = true;

  @Output() rowClick = new EventEmitter<any>();

  onRowClick(item: any) {
    this.rowClick.emit(item);
  }
}
