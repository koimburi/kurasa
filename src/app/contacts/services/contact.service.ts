import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Contact } from '../models/contact.model';
import { mockContacts } from '../utils/mock-contacts';

/**
 * Service for managing contacts, including CRUD operations,
 * recently viewed contacts, and contact organization.
 */
@Injectable({
  providedIn: 'root',
})
export class ContactService {
  /** BehaviorSubject containing the current list of contacts */
  private contacts$ = new BehaviorSubject<Contact[]>(this.sortContacts(mockContacts));
  
  /** BehaviorSubject containing recently viewed contact IDs */
  private recentlyViewed$ = new BehaviorSubject<string[]>([]);
  
  constructor() {
    this.loadRecentlyViewed();
  }

  /**
   * Loads recently viewed contacts from localStorage
   * @private
   */
  private loadRecentlyViewed(): void {
    const saved = localStorage.getItem('recentlyViewed');
    if (saved) {
      this.recentlyViewed$.next(JSON.parse(saved));
    }
  }

  /**
   * Sorts contacts by full name
   * @param contacts - Array of contacts to sort
   * @returns Sorted array of contacts
   * @private
   */
  private sortContacts(contacts: Contact[]): Contact[] {
    return contacts.sort((a, b) => 
      `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`)
    );
  }

  /**
   * Gets an observable of all contacts
   * @returns Observable of contacts array
   */
  getContacts(): Observable<Contact[]> {
    return this.contacts$.asObservable();
  }

  /**
   * Gets contacts filtered by group
   * @param group - Group name to filter by
   * @returns Observable of filtered contacts array
   */
  getContactsByGroup(group: string): Observable<Contact[]> {
    return this.contacts$.pipe(
      map(contacts => contacts.filter(c => c.group === group))
    );
  }

  /**
   * Gets recently viewed contacts
   * @returns Observable of recently viewed contacts
   */
  getRecentlyViewed(): Observable<Contact[]> {
    return this.recentlyViewed$.pipe(
      map(ids => {
        const contacts = this.contacts$.value;
        return ids
          .map(id => contacts.find(c => c.id === id))
          .filter((c): c is Contact => c !== undefined);
      })
    );
  }

  /**
   * Marks a contact as viewed and updates recently viewed list
   * @param contactId - ID of the viewed contact
   */
  viewContact(contactId: string): void {
    const contact = this.contacts$.value.find(c => c.id === contactId);
    if (contact) {
      const recentlyViewed = this.recentlyViewed$.value;
      const filtered = recentlyViewed.filter(id => id !== contactId);
      const updated = [contactId, ...filtered].slice(0, 5);
      this.recentlyViewed$.next(updated);
      localStorage.setItem('recentlyViewed', JSON.stringify(updated));
    }
  }

  /**
   * Toggles the favorite status of a contact
   * @param contactId - The ID of the contact to toggle favorite status
   */
  toggleFavorite(contactId: string): void {
    const contacts = this.contacts$.value;
    const updated = contacts.map(c => 
      c.id === contactId ? { ...c, favorite: !c.favorite } : c
    );
    this.contacts$.next(updated);
  }

  /**
   * Deletes multiple contacts from the contacts list
   * @param contactIds - Array of contact IDs to delete
   */
  deleteContacts(contactIds: string[]): void {
    const contacts = this.contacts$.value;
    const updated = contacts.filter(c => !contactIds.includes(c.id));
    this.contacts$.next(updated);
  }

  /**
   * Exports contacts to CSV format
   * @returns CSV string containing all contacts data
   */
  exportContacts(): string {
    const contacts = this.contacts$.value;
    const headers = ['First Name', 'Last Name', 'Email', 'Phone', 'Address', 'Group', 'Favorite'];
    const rows = contacts.map(c => [
      c.firstName,
      c.lastName,
      c.email,
      c.phone,
      c.address,
      c.group || '',
      c.favorite ? 'Yes' : 'No'
    ]);
    return [headers, ...rows]
      .map(row => row.map(cell => `"${cell}"`).join(','))
      .join('\n');
  }

  /**
   * Imports contacts from a CSV string
   * @param csv - CSV string containing contacts data in the format:
   * "First Name","Last Name","Email","Phone","Address","Group","Favorite"
   */
  importContacts(csv: string): void {
    const rows = csv.split('\n').map(row => 
      row.split(',').map(cell => cell.replace(/^"|"$/g, ''))
    );
    const headers = rows[0];
    const contacts = rows.slice(1).map(row => ({
      id: crypto.randomUUID(),
      firstName: row[0],
      lastName: row[1],
      email: row[2],
      phone: row[3],
      address: row[4],
      group: row[5] || undefined,
      favorite: row[6] === 'Yes',
      imageUrl: ''
    }));
    this.contacts$.next(this.sortContacts([...this.contacts$.value, ...contacts]));
  }

  /**
   * Assigns a group to multiple contacts
   * @param contactIds - Array of contact IDs to update
   * @param group - The group name to assign to the contacts
   */
  assignGroup(contactIds: string[], group: string): void {
    const contacts = this.contacts$.value;
    const updated = contacts.map(contact => 
      contactIds.includes(contact.id) 
        ? { ...contact, group } 
        : contact
    );
    this.contacts$.next(updated);
  }

  /**
   * Retrieves a single contact by ID
   * @param id - The ID of the contact to retrieve
   * @returns Observable of the found contact or undefined if not found
   */
  getContact(id: string): Observable<Contact | undefined> {
    return this.contacts$.pipe(
      map(contacts => contacts.find(c => c.id === id))
    );
  }

  /**
   * Updates an existing contact's information
   * @param updatedContact - Contact object with updated information
   */
  updateContact(updatedContact: Contact): void {
    const contacts = this.contacts$.value;
    const updated = contacts.map(c => 
      c.id === updatedContact.id ? updatedContact : c
    );
    this.contacts$.next(this.sortContacts(updated));
  }
}