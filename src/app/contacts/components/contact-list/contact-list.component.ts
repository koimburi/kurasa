import { Component, OnInit, OnDestroy, HostListener, ElementRef, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Contact } from '../../models/contact.model';
import { ContactService } from '../../services/contact.service';
import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';
import { ContactCardComponent } from '../contact-card/contact-card.component';
import { SharedModule } from '../../../shared/shared.module';
import { ContactDetailsModalComponent } from "../contact-details-modal/contact-details-modal.component";
import { BulkActionsComponent } from '../bulk-actions/bulk-actions.component';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
  standalone: true,
  imports: [SharedModule, CommonModule, ContactCardComponent, ContactDetailsModalComponent, BulkActionsComponent]
})
export class ContactListComponent implements OnInit, OnDestroy {
  @ViewChild('groupButton') groupButton!: ElementRef;
  @ViewChild('assignButton') assignButton!: ElementRef;

  contacts$: Observable<Contact[]>;
  recentlyViewed$: Observable<Contact[]>;
  filteredContacts$: Observable<Contact[]>;
  groupedContacts$: Observable<{ name: string, contacts: Contact[] }[]>;

  private searchTerm$ = new BehaviorSubject<string>('');
  private selectedGroup$ = new BehaviorSubject<string>('');

  isGridView = true;
  isDarkMode = false;
  selectedContacts = new Set<string>();

  private subscription = new Subscription();
  private filteredContactsValue: Contact[] = [];

  isGroupDropdownOpen = false;
  isAssignDropdownOpen = false;
  selectedGroup = '';

  constructor(
    private contactService: ContactService,
    private router: Router
  ) {
    this.contacts$ = this.contactService.getContacts();
    this.recentlyViewed$ = this.contactService.getRecentlyViewed();

    this.filteredContacts$ = combineLatest([
      this.contacts$,
      this.searchTerm$,
      this.selectedGroup$
    ]).pipe(
      map(([contacts, term, group]) =>
        contacts.filter(contact =>
          (!group || contact.group === group) &&
          `${contact.firstName} ${contact.lastName} ${contact.email} ${contact.group || ''}`
            .toLowerCase()
            .includes(term.toLowerCase())
        )
      )
    );

    this.groupedContacts$ = this.filteredContacts$.pipe(
      map(contacts => {
        const groups = new Map<string, Contact[]>();
        contacts.forEach(contact => {
          const group = contact.group || 'Ungrouped';
          if (!groups.has(group)) {
            groups.set(group, []);
          }
          groups.get(group)!.push(contact);
        });
        return Array.from(groups.entries()).map(([name, contacts]) => ({
          name,
          contacts: contacts.sort((a, b) =>
            `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`))
        }));
      })
    );

    this.subscription.add(
      this.filteredContacts$.subscribe(contacts => {
        this.filteredContactsValue = contacts;
      })
    );
  }

  ngOnInit(): void {
    this.loadViewPreferences();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private loadViewPreferences(): void {
    this.isGridView = localStorage.getItem('viewMode') === 'grid';
    this.isDarkMode = localStorage.getItem('theme') === 'dark';
    this.applyTheme();
  }

  toggleView(): void {
    this.isGridView = !this.isGridView;
    localStorage.setItem('viewMode', this.isGridView ? 'grid' : 'list');
  }

  onSearch(term: string): void {
    this.searchTerm$.next(term);
  }

  onGroupSelect(group: string): void {
    this.selectedGroup = group;
    this.selectedGroup$.next(group);
    this.isGroupDropdownOpen = false;
  }

  viewContact(contact: Contact): void {
    this.selectedContact = contact;
    this.contactService.viewContact(contact.id);
  }

  toggleSelection(contactId: string): void {
    if (this.selectedContacts.has(contactId)) {
      this.selectedContacts.delete(contactId);
    } else {
      this.selectedContacts.add(contactId);
    }
  }

  toggleFavorite(contactId: string): void {
    this.contactService.toggleFavorite(contactId);
  }

  async deleteSelected(): Promise<void> {
    if (!this.selectedContacts.size) return;

    if (await this.confirmDeletion(this.selectedContacts.size)) {
      this.contactService.deleteContacts(Array.from(this.selectedContacts));
      this.selectedContacts.clear();
      if (this.selectedContact && this.selectedContacts.has(this.selectedContact.id)) {
        this.closeContactDetails();
      }
    }
  }

  private async confirmDeletion(count: number): Promise<boolean> {
    const message = count === 1
      ? 'Are you sure you want to delete this contact?'
      : `Are you sure you want to delete ${count} contacts?`;
    return confirm(message);
  }

  exportContacts(): void {
    const csv = this.contactService.exportContacts();
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'contacts.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  }

  importContacts(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const csv = reader.result as string;
      this.contactService.importContacts(csv);
    };
    reader.readAsText(file);
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    this.applyTheme();
  }

  private applyTheme(): void {
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
  selectedContact: Contact | null = null;

  openContactDetails(contact: Contact): void {
    this.selectedContact = contact;
    this.contactService.viewContact(contact.id);
  }

  closeContactDetails(): void {
    this.selectedContact = null;
  }

  editContact(contact: Contact): void {
    this.router.navigate(['/contacts', contact.id, 'edit']);
  }

  async deleteContact(contactId: string): Promise<void> {
    if (await this.confirmDeletion(1)) {
      this.contactService.deleteContacts([contactId]);
      if (this.selectedContact?.id === contactId) {
        this.closeContactDetails();
      }
    }
  }

  isGroupSelected(groupName: string): boolean {
    const contacts = this.filteredContactsValue
      .filter(c => (c.group || 'Ungrouped') === groupName);
    return contacts.every(c => this.selectedContacts.has(c.id));
  }

  toggleGroupSelection(groupName: string, contacts: Contact[]): void {
    const allSelected = this.isGroupSelected(groupName);
    contacts.forEach(contact => {
      if (allSelected) {
        this.selectedContacts.delete(contact.id);
      } else {
        this.selectedContacts.add(contact.id);
      }
    });
  }

  getAvatarUrl(contact: Contact): string {
    if (contact.imageUrl) {
      return contact.imageUrl;
    }
    return `https://ui-avatars.com/api/?name=${contact.firstName}+${contact.lastName}&background=random&color=fff`;
  }

  onImageError(contact: Contact): void {
    const initials = `${contact.firstName.charAt(0)}${contact.lastName.charAt(0)}`.toUpperCase();
    contact.imageUrl = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'><text x='50%' y='50%' text-anchor='middle' dy='.3em' fill='gray' font-size='24'>${initials}</text></svg>`;
  }

  assignGroup(group: string): void {
    if (!group || !this.selectedContacts.size) return;

    const selectedIds = Array.from(this.selectedContacts);
    this.contactService.assignGroup(selectedIds, group);
    this.selectedContacts.clear();
    this.isAssignDropdownOpen = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.groupButton?.nativeElement?.contains(event.target as Node)) {
      this.isGroupDropdownOpen = false;
    }

    if (!this.assignButton?.nativeElement?.contains(event.target as Node)) {
      this.isAssignDropdownOpen = false;
    }
  }

  toggleGroupDropdown(event: Event): void {
    event.stopPropagation();
    this.isGroupDropdownOpen = !this.isGroupDropdownOpen;
    this.isAssignDropdownOpen = false;
  }

  toggleAssignDropdown(event: Event): void {
    event.stopPropagation();
    this.isAssignDropdownOpen = !this.isAssignDropdownOpen;
    this.isGroupDropdownOpen = false;
  }
}
