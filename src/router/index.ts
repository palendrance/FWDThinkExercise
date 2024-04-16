import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import TicketsView from "@/views/TicketsView.vue";
import TicketEditView from "@/views/TicketEditView.vue";
import TicketDetailView from "@/views/TicketDetailView.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "home",
			component: HomeView,
		},
		{
			path: "/tickets",
			children: [
				{
					path: "",
					name: "tickets",
					component: TicketsView,
				},
				{
					path: "/tickets/new",
					name: "new ticket",
					component: TicketEditView,
					props: {
						rowNumber: -1,
					},
				},
				{
					path: "/tickets/:rowNumber/edit",
					name: "edit ticket",
					component: TicketEditView,
					props: ({params}) => ({rowNumber: Number(params.rowNumber)}),
				},
				{
					path: "/tickets/:rowNumber/detail",
					name: "detail ticket",
					component: TicketDetailView,
					props: ({params}) => ({rowNumber: Number(params.rowNumber)}),
				},
			],
		},
	],
});

export default router;
