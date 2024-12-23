/**
 * Represents a single contact in the phonebook application.
 *
 * @interface Contact
 */
export interface Contact {
    /**
     * Unique identifier for the contact.
     *
     * @type {string}
     */
    id: string;

    /**
     * First name of the contact.
     *
     * @type {string}
     */
    firstName: string;

    /**
     * Last name of the contact.
     *
     * @type {string}
     */
    lastName: string;

    /**
     * Email address of the contact.
     *
     * @type {string}
     */
    email: string;

    /**
     * Phone number of the contact.
     *
     * @type {string}
     */
    phone: string;

    /**
     * URL of the contact's image.
     *
     * @type {string}
     */
    imageUrl: string;

    /**
     * Address of the contact.
     *
     * @type {string}
     */
    address: string;

    /**
     * Group that the contact belongs to (optional).
     *
     * @type {string}
     * @optional
     */
    group?: string;

    /**
     * Indicates whether the contact is marked as a favorite (optional).
     *
     * @type {boolean}
     * @optional
     */
    favorite?: boolean;

    /**
     * Indicates whether the contact has been deleted (soft delete) (optional).
     *
     * @type {boolean}
     * @optional
     */
    deleted?: boolean;
}