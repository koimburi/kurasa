import { Routes } from '@angular/router';
import { ContactListComponent } from './contacts/components/contact-list/contact-list.component';
import { ContactDetailComponent } from './contacts/components/contact-detail/contact-detail.component';
import { ContactEditComponent } from './contacts/components/contact-edit/contact-edit.component';

export const routes: Routes = [
    { path: '', redirectTo: '/contacts', pathMatch: 'full' },
    { path: 'contacts', component: ContactListComponent },
    { path: 'contacts/:id', component: ContactDetailComponent },
    { path: 'contacts/:id/edit', component: ContactEditComponent },
];
