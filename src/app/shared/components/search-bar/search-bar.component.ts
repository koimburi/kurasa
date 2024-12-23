import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  standalone: false,
})
export class SearchBarComponent {
  @Output() search = new EventEmitter<string>();

  onSearch(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.search.emit(target.value);
  }
}
