import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Navigation bar component containing view controls and actions
 */
@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  /** Current view mode */
  @Input() isGridView = true;
  
  /** Current theme mode */
  @Input() isDarkMode = false;

  /** View toggle event */
  @Output() toggleView = new EventEmitter<void>();
  
  /** Theme toggle event */
  @Output() toggleTheme = new EventEmitter<void>();
  
  /** Export contacts event */
  @Output() exportContacts = new EventEmitter<void>();
  
  /** Import contacts event */
  @Output() importContacts = new EventEmitter<Event>();

  /**
   * Handles view toggle
   */
  onToggleView(): void {
    this.toggleView.emit();
  }

  /**
   * Handles theme toggle
   */
  onToggleTheme(): void {
    this.toggleTheme.emit();
  }

  /**
   * Handles contact export
   */
  onExport(): void {
    this.exportContacts.emit();
  }

  /**
   * Handles contact import
   * @param event - File input change event
   */
  onImport(event: Event): void {
    this.importContacts.emit(event);
  }
} 