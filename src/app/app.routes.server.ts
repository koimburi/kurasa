import { RenderMode, ServerRoute } from '@angular/ssr';
import { mockContacts } from './contacts/utils/mock-contacts';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'contacts/:id',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      return mockContacts.map(contact => ({
        id: contact.id
      }));
    }
  },
  {
    path: 'contacts/:id/edit',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => {
      return mockContacts.map(contact => ({
        id: contact.id
      }));
    }
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
