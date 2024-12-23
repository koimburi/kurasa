import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Contact } from '../../models/contact.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-details-modal',
  imports: [CommonModule],
  templateUrl: "./contact-details-modal.html"
})
export class ContactDetailsModalComponent {
  @Input() contact!: Contact;
  @Input() isOpen = false;
  @Output() closeModal = new EventEmitter<void>();
  @Output() editContact = new EventEmitter<Contact>();

  getAvatarUrl(): string {
    return `https://ui-avatars.com/api/?name=${this.contact.firstName}+${this.contact.lastName}&background=random&color=fff`;
  }

  close(): void {
    this.closeModal.emit();
  }

  edit(): void {
    this.editContact.emit(this.contact);
  }

  onImageError(): void {
    const initials = `${this.contact.firstName.charAt(0)}${this.contact.lastName.charAt(0)}`.toUpperCase();
    this.contact.imageUrl = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'><text x='50%' y='50%' text-anchor='middle' dy='.3em' fill='gray' font-size='24'>${initials}</text></svg>`;
  }
} 