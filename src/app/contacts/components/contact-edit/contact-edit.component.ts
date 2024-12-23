import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactService } from '../../services/contact.service';
import { Contact } from '../../models/contact.model';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss'],
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true
})
export class ContactEditComponent implements OnInit {
  contact: Contact | null = null;
  editForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contactService: ContactService,
    private fb: FormBuilder
  ) {
    this.editForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: [''],
      group: [''],
      imageUrl: ['']
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.contactService.getContact(id).subscribe(contact => {
        if (contact) {
          this.contact = contact;
          this.editForm.patchValue(contact);
        } else {
          this.router.navigate(['/contacts']);
        }
      });
    }
  }

  getAvatarUrl(): string {
    if (this.contact?.imageUrl) {
      return this.contact.imageUrl;
    }
    return `https://ui-avatars.com/api/?name=${this.contact?.firstName}+${this.contact?.lastName}&background=random&color=fff`;
  }

  onSubmit(): void {
    if (this.editForm.valid && this.contact) {
      const updatedContact: Contact = {
        ...this.contact,
        ...this.editForm.value
      };
      this.contactService.updateContact(updatedContact);
      this.router.navigate(['/contacts']);
    }
  }

  onCancel(): void {
    this.router.navigate(['/contacts']);
  }
}
