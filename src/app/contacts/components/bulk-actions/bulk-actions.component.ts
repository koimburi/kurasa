import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Component for handling bulk actions on selected contacts.
 * Provides functionality for deleting multiple contacts and assigning groups.
 */
@Component({
  selector: 'app-bulk-actions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bulk-actions.component.html'
})
export class BulkActionsComponent {
  /** Number of currently selected contacts */
  @Input() selectedCount = 0;
  
  /** Available groups for assignment */
  @Input() availableGroups: string[] = ['Family', 'Work', 'Friends'];
  
  /** Event emitter for deleting selected contacts */
  @Output() deleteSelected = new EventEmitter<void>();
  
  /** Event emitter for assigning a group to selected contacts */
  @Output() assignGroup = new EventEmitter<string>();

  /** Controls the visibility of the assign group dropdown */
  isAssignDropdownOpen = false;

  /**
   * Toggles the assign group dropdown visibility
   * @param event - The mouse event
   */
  toggleAssignDropdown(event: Event): void {
    event.stopPropagation();
    this.isAssignDropdownOpen = !this.isAssignDropdownOpen;
  }

  /**
   * Handles the deletion of selected contacts
   */
  onDeleteSelected(): void {
    this.deleteSelected.emit();
  }

  /**
   * Handles the assignment of a group to selected contacts
   * @param group - The group to assign
   */
  onAssignGroup(group: string): void {
    this.assignGroup.emit(group);
    this.isAssignDropdownOpen = false;
  }
}