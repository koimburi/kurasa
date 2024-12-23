import { Contact } from "../models/contact.model";

export const mockContacts: Contact[] = [
    {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
        address: '123 Main St, City, Country',
        favorite: true,
        imageUrl: ""
    },
    {
        id: '2',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane.smith@example.com',
        phone: '+1 (555) 234-5678',
        imageUrl: "",
        address: '456 Park Ave, City, Country',
    },
    {
        id: '3',
        firstName: 'Robert',
        lastName: 'Johnson',
        email: 'robert.j@example.com',
        phone: '+1 (555) 345-6789',
        imageUrl: "",
        favorite: true,
        address: '789 Oak Rd, City, Country',
    },
    {
        id: '4',
        firstName: 'Emily',
        lastName: 'Brown',
        email: 'emily.brown@example.com',
        phone: '+1 (555) 456-7890',
        address: '789 Oak Rd, City, Country',
        imageUrl: ""
    },
    {
        id: '5',
        firstName: 'Michael',
        lastName: 'Wilson',
        email: 'michael.w@example.com',
        phone: '+1 (555) 567-8901',
        imageUrl: "",
        address: ""
    }
];