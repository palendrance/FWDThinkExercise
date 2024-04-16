<script setup lang="ts">
import { type Ticket } from "@/types/Ticketing";
import { take } from "rxjs";
import { ticketService } from "@/services/TicketService";
import router from "@/router";

interface Props {
	rowNumber: number;
}
const props: Props = defineProps<Props>();

// Local copy of the ticket
let ticket: Ticket;

// Get the ticket once and unsubscribe
ticketService.getTickets().pipe(take(1)).subscribe(tickets => {
	ticket = tickets[props.rowNumber];
});

// Return to the table view
function handleReturn(): void {
	router.push("/tickets");
}
</script>

<template>
	<div class="card">
		<div class="card-body">
			<h2 class="card-title">Ticket Details</h2>

			<form @submit.prevent>
				<div class="row">
					<div class="col">
						<h5>Category</h5>
						<div>{{ ticket.category }}</div>
					</div>
					<div class="col">
						<h5>Type</h5>
						<div class="d-flex gap-2">
							<div v-for="type of ticket.type"
								:key="'type-' + type"
								class="badge fs-6 text-bg-primary"
							>
								{{ type }}
							</div>
						</div>
					</div>
				</div>

				<div class="row">
					<div class="col">
						<h5>Subject</h5>
						<div>{{ ticket.subject }}</div>
					</div>
				</div>

				<div class="row">
					<div class="col">
						<h5>Description</h5>
						<div>{{ ticket.description }}</div>
					</div>
				</div>

				<div class="mt-4">
					<h6>Ticket Files & Documents</h6>
				</div>

				<div class="container mb-2 mx-0 p-0">
					<div v-for="(document) of ticket.documents"
						:key="document"
						class="row"
					>
						<div class="col col-auto align-content-center">
							<a class="link-underline-primary">{{ document }}</a>
						</div>
					</div>
				</div>

				<div class="container-fluid d-flex justify-content-end gap-2">
					<button class="btn btn-primary" v-on:click="handleReturn">Return</button>
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