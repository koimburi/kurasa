import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Component for toggling favorite status of a contact
 */
@Component({
  selector: 'app-favorite-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './favorite-button.component.html'
})
export class FavoriteButtonComponent {
  /** Whether the item is currently favorited */
  @Input() isFavorite? = false;
  
  /** Event emitter for favorite toggle */
  @Output() toggleFavorite = new EventEmitter<void>();

  /**
   * Handles the click event for toggling favorite status
   * @param event - The mouse event
   */
  onToggle(event: Event): void {
    event.stopPropagation();
    this.toggleFavorite.emit();
  }
} 