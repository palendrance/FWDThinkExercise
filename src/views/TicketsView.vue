<script setup lang="ts">
import TicketsTable from "@/components/TicketsTable.vue";
import type { Ticket } from "@/types/Ticketing";
import router from "@/router";
import { ticketService } from "@/services/TicketService";
import { onUnmounted, ref, type Ref } from "vue";
import { Subscription } from "rxjs";

// *** We could load the data in the table itself, but providing it through the parent gives us better control over
// *** reloads and I wanted to demonstrate a common design pattern.
// Collection of tickets for the table to display
let data: Ref<Ticket[]> = ref([]);

// Store a subscription to the tickets for unsubscribing later
const tickets$: Subscription = ticketService.getTickets().subscribe(tickets => data.value = tickets);

// Open the detail view for a ticket, called from inside the table
function viewTicket(rowNumber: number): void {
	router.push({ path: `tickets/${rowNumber}/detail` });
}

// Open the edit view for a ticket, called from inside the table
function editTicket(rowNumber: number): void {
	router.push({ path: `tickets/${rowNumber}/edit` });
}

// Delete a ticket, called from inside the table
function deleteTicket(rowNumber: number): void {
	ticketService.deleteTicket(rowNumber);
}

// Unsubscribe from the tickets when the view is unmounted
onUnmounted(() => {
	tickets$.unsubscribe();
});
</script>

<template>
	<TicketsTable :data="data" :view-item="viewTicket" :edit-item="editTicket" :delete-item="deleteTicket" />
</template>
