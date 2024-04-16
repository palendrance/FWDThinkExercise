<script setup lang="ts">
import {
	type Ticket,
	ticketCategories,
	ticketCategoryTypeMap,
} from "@/types/Ticketing";
import { Subscription } from "rxjs";
import { ticketService } from "@/services/TicketService";
import { onUnmounted, type Ref, ref } from "vue";
import router from "@/router";

	interface Props {
		rowNumber: number;
	}
	const props: Props = defineProps<Props>();

	// Initialize form fields related to a ticket
	let ticketCategory: Ref<Ticket["category"]> = ref("Hardware");
	let ticketType: Ref<Ticket["type"]> = ref([
		"Laptop",
	]);
	let ticketDescription: Ref<Ticket["description"]> = ref("");
	let ticketSubject: Ref<Ticket["subject"]> = ref("");
	let ticketDocuments: Ref<Ticket["documents"]> = ref([]);

	// Store subscription for unsubscribing later
	let ticket$: Subscription;

	// Load the ticket if the ticket number is 0 or greater, otherwise treat as a new ticket
	if (props.rowNumber >= 0) {
		ticket$ = ticketService.getTickets().subscribe(tickets => {
			const ticket: Ticket = tickets[props.rowNumber];

			// Update local values based on the loaded ticket
			ticketCategory.value = ticket.category;
			ticketType.value = ticket.type;
			ticketDescription.value = ticket.description;
			ticketSubject.value = ticket.subject;
			ticketDocuments.value = ticket.documents;
		});
	}

	// Handle files being added through the uploader
	function handleFileInput(e: Event): void {
		// *** Ideally we would have the correct event type from our input element, or I would write a shim to fix this properly without extra assertions
		const file: File = (e as Event & { target: HTMLInputElement & EventTarget }).target.files![0];

		ticketDocuments.value = [...ticketDocuments.value, file.name];
	}

	// Delete an uploaded document
	function deleteDocument(documentIndex: number): void {
		const newDocuments = JSON.parse(JSON.stringify(ticketDocuments.value));
		newDocuments.splice(documentIndex, 1);
		ticketDocuments.value = newDocuments;
	}

	// *** In production there would be dirty form checks that prevent accidental routing away
	// Return to the table view without saving
	function handleCancel(): void {
		router.push("/tickets");
	}

	// *** In production this would be debounced and await the result
	function handleSubmit(): void {
		const newTicket: Ticket = {
			category: ticketCategory.value,
			type: ticketType.value,
			description: ticketDescription.value,
			subject: ticketSubject.value,
			documents: ticketDocuments.value,
		}

		if (props.rowNumber >= 0) { // Update an existing ticket
			ticketService.editTicket(newTicket, props.rowNumber);
		} else { // Create a new ticket
			ticketService.addTicket(newTicket);
		}

		router.push("/tickets");
	}

	// Unsubscribe from the tickets when the view is unmounted
	onUnmounted(() => {
		ticket$?.unsubscribe();
	});
</script>

<template>
	<div class="card">
		<div class="card-body">
			<h2 class="card-title">Ticket Details</h2>

			<form @submit.prevent>
				<div class="row">
					<div class="col">
						<label for="category-select" class="form-label">Category</label>
						<select v-model="ticketCategory"
							class="form-select"
							id="category-select"
						>
							<option v-for="category of ticketCategories"
								:key="'category-' + category"
							>
								{{ category }}
							</option>
						</select>
					</div>
					<div class="col">
						<label for="type-input" class="form-label">Type</label>
						<!--***Ideally I would grab an off the shelf multiselect dropdown component that is more intuitive than the default.-->
						<!--***If there wasn't a good enough option available, I would absolutely make my own.-->
						<select v-model="ticketType"
							multiple
							class="form-select"
							id="type-input"
							size="1"
						>
							<!--***Ideally I would build a list of orphaned options (options that were selected but aren't available on the current category).-->
							<!--***This way a user doesn't lose data from accidental category changes, and can see the error-colored options above the valid ones.-->
							<option v-for="type of ticketCategoryTypeMap[ticketCategory]"
								:key="'type-' + type"
							>
								{{ type }}
							</option>
						</select>
					</div>
				</div>

				<div class="row">
					<div class="col">
						<label for="subject-input" class="form-label">Subject</label>
						<input v-model="ticketSubject"
							type="text"
							class="form-control"
							id="subject-input"
						>
					</div>
				</div>

				<div class="row">
					<div class="col">
						<label for="description-input" class="form-label">Description</label>
						<input v-model="ticketDescription"
							type="text"
							class="form-control"
							id="description-input"
						>
					</div>
				</div>

				<div class="mt-4">
					<h6>Ticket Files & Documents</h6>
				</div>

				<div class="container mb-2 mx-0 p-0">
					<div v-for="(document, documentIndex) of ticketDocuments"
						:key="document"
						class="row"
					>
						<div class="col col-auto align-content-center">
							<a class="link-underline-primary">{{ document }}</a>
						</div>

						<div class="col col-auto">
							<button type="button" class="btn" v-on:click="() => deleteDocument(documentIndex)">
								<i class="bi bi-trash"></i>
							</button>
						</div>
					</div>
				</div>

				<div>
					<label for="file-upload" class="btn btn-outline-dark d-inline-flex gap-2 px-5">
						<i class="bi bi-plus-lg"></i>
						<span>Attach File</span>
					</label>
					<input v-on:change="handleFileInput"
						id="file-upload"
						type="file"
						class="d-none"
					/>
				</div>

				<div class="container-fluid d-flex justify-content-end gap-2">
					<button class="btn" v-on:click="handleCancel">Cancel</button>
					<button class="btn btn-primary" v-on:click="handleSubmit">Submit</button>
				</div>
			</form>
		</div>
	</div>
</template>

<style scoped>
	form > .row {
		margin-top: 1rem;
	}
</style>