import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Contact } from '../../models/contact.model';
import { CommonModule } from '@angular/common';
import { FavoriteButtonComponent } from '../favorite-button/favorite-button.component';

@Component({
  selector: 'app-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.scss'],
  imports: [CommonModule, FavoriteButtonComponent],
})
export class ContactCardComponent {
  @Input() contact!: Contact;
  @Input() isGridView = false;
  @Input() showCheckbox = false;
  @Input() isSelected = false;
  @Output() deleteContact = new EventEmitter<string>();
  @Output() viewContact = new EventEmitter<Contact>();
  @Output() toggleSelect = new EventEmitter<string>();
  @Output() toggleFavorite = new EventEmitter<string>();

  getInitials(): string {
    return `${this.contact.firstName.charAt(0)}${this.contact.lastName.charAt(0)}`.toUpperCase();
  }

  getAvatarUrl(): string {
    if (this.contact.imageUrl) {
      return this.contact.imageUrl;
    }
    return `https://ui-avatars.com/api/?name=${this.contact.firstName}+${this.contact.lastName}&background=random&color=fff`;
  }

  onImageError(): void {
    const fallbackImage = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'><text x='50%' y='50%' text-anchor='middle' dy='.3em' fill='gray' font-size='24'>${this.getInitials()}</text></svg>`;
    this.contact.imageUrl = fallbackImage;
  }

  onCardClick(): void {
    this.viewContact.emit(this.contact);
  }

  onToggleSelect(event: Event): void {
    event.stopPropagation();
    this.toggleSelect.emit(this.contact.id);
  }

  onFavoriteClick(event: any): void {
    event.stopPropagation();
    this.toggleFavorite.emit(this.contact.id);
  }

  onDelete(event: Event): void {
    event.stopPropagation();
    this.deleteContact.emit(this.contact.id);
  }
}
