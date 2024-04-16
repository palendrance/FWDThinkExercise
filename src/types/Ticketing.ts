// Primary data object
export interface Ticket<C extends TicketCategory = TicketCategory> {
	category: C;
	type: TicketType<C>[];
	subject: string;
	description: string;
	documents: string[];
}

// Categories of ticket
export const ticketCategories = [
	"Hardware",
	"Software",
	"Network",
	"In-Processing",
] as const;
export type TicketCategory = typeof ticketCategories[number];

// Ticket types for the "Hardware" category
const hardwareTicketTypes = [
	"Laptop",
	"Mobile",
	"Peripherals",
	"Desk Phone",
	"Printers",
	"Other",
] as const;

// Ticket types for the "Software" category
const softwareTicketTypes = [
	"Teams/Zoom",
	"Mobile Blackberry",
	"Adobe",
	"Outlook",
	"Microsoft Office",
	"Other",
] as const;

// Ticket types for the "Network" category
const networkTicketTypes = [
	"Network Access",
	"Connectivity",
	"VPN",
	"Drivers",
	"Other",
] as const;

// Ticket types for the "In-Process" category
const inProcessTicketTypes = [
	"Access Badge",
	"Common Access Card (CAC)",
	"SIPR",
	"Trello",
] as const;

// Map for retrieving the proper types for a given category
export const ticketCategoryTypeMap = {
	"Hardware": hardwareTicketTypes,
	"Software": softwareTicketTypes,
	"Network": networkTicketTypes,
	"In-Processing": inProcessTicketTypes,
} as const;
export type TicketType<Category extends TicketCategory = TicketCategory> = typeof ticketCategoryTypeMap[Category][number];