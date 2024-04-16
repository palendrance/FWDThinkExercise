import type { Ticket } from "@/types/Ticketing";
import { BehaviorSubject, map, Observable } from "rxjs";

// *** Using a class largely for personal preference when creating a quick RXJS data store and mock service
class TicketService {
	// Pre-populate with some mock data for the example
	private tickets: Ticket[] = [
		{
			category: "Hardware",
			type: [
				"Laptop",
				"Peripherals",
			],
			description: "This is a test description",
			subject: "This is a test subject",
			documents: [
				"Document 1",
				"Document 2",
			],
		},
		{
			category: "Software",
			type: [
				"Outlook",
				"Microsoft Office",
			],
			description: "This is another test description",
			subject: "This is another test subject",
			documents: [
				"Document 3",
				"Document 4",
			],
		},
	];

	// Local Subject used for dereferencing objects, generally unnecessary in production
	private tickets$: BehaviorSubject<Ticket[]> = new BehaviorSubject<Ticket[]>(this.tickets);

	// Update the tickets and notify subscribers
	private updateTickets(tickets: Ticket[]) {
		tickets = JSON.parse(JSON.stringify(tickets));
		this.tickets$.next(tickets);
	}

	// Get an observable of the tickets collection
	getTickets(): Observable<Ticket[]> {
		return this.tickets$.pipe(
			// Quick and dirty way to dereference objects when they aren't being recycled in better ways
			map(tickets => JSON.parse(JSON.stringify(tickets))),
		);
	}

	// Add a ticket and update subscribers
	addTicket(ticket: Ticket) {
		this.tickets.push(ticket);
		this.updateTickets(this.tickets);
	}

	// Delete a ticket and update subscribers
	deleteTicket(ticketIndex: number) {
		this.tickets.splice(ticketIndex, 1);
		this.updateTickets(this.tickets);
	}

	// Edit a ticket and update subscribers
	editTicket(ticket: Ticket, ticketIndex: number) {
		this.tickets.splice(ticketIndex, 1 , ticket);
		this.updateTickets(this.tickets);
	}
}

export const ticketService = new TicketService()
