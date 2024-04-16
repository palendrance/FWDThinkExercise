<script setup lang="ts">
import type { Ticket } from "@/types/Ticketing";
import { RouterLink } from "vue-router";
import type { TicketsTableColumn } from "@/types/TicketsTable";

interface Props {
	data: Ticket[];
	viewItem: (rowIndex: number) => void;
	editItem: (rowIndex: number) => void;
	deleteItem: (rowIndex: number) => void;
}

const props: Props = defineProps<Props>();

const columns: TicketsTableColumn[] = [
	{
		title: "Category",
		displayType: "text",
		key: "category",
	},
	{
		title: "Subject",
		displayType: "text",
		key: "subject",

	},
	{
		title: "Type",
		displayType: "chip",
		key: "type",
	},
	{
		title: "",
		displayType: "buttons",
		buttons: [
			{
				text: "View Detail",
				icon: "bi bi-zoom-in",
				callback: props.viewItem,
			},
			{
				text: "Edit",
				icon: "bi bi-pencil",
				callback: props.editItem,
			},
			{
				text: "Delete",
				icon: "bi bi-trash",
				callback: props.deleteItem,
			},
		],
	},
];
</script>

<template>
	<table class="table">
		<thead>
			<tr>
				<th v-for="(column, columnIndex) of columns"
					:key="'th' + columnIndex"
				>
					{{ column.title }}
				</th>
			</tr>
		</thead>

		<tbody>
			<!--Normally I would use a unique, immutable ID here to prevent unnecessary rerenders, but we don't have one so row number will do-->
			<tr v-for="(row, rowIndex) of props.data"
				:key="'row' + rowIndex"
			>
				<td v-for="(column, columnIndex) of columns"
					:key="'td' + rowIndex + '-' + columnIndex"
				>
					<div v-if="column.displayType === 'text'">{{ row[column.key] }}</div>

					<div v-else-if="column.displayType === 'chip'"
						class="container-fluid d-flex gap-1 align-items-center"
					>
						<div v-for="(chip, chipIndex) of row.type"
							:key="rowIndex + '-' + columnIndex + 'chip' + chipIndex"
							class="badge text-bg-primary"
						>
							{{ chip }}
						</div>
					</div>

					<div v-else class="container-fluid d-flex gap-1">
						<button v-for="button of column.buttons"
							:key="rowIndex + '-' + columnIndex + 'button-' + button.text"
							v-on:click="() => button.callback(rowIndex)"
							:aria-label="button.text"
							type="button"
							class="btn"
						>
							<i :class="button.icon"></i>
						</button>
					</div>
				</td>
			</tr>
		</tbody>
	</table>

	<div class="container-fluid d-flex justify-content-end">
		<RouterLink to="/tickets/new" class="btn btn-primary" role="button">New Ticket</RouterLink>
	</div>
</template>

<style scoped>
	tr {
		height: 1px;
	}

	td {
		height: inherit;
	}

	tr > td > div {
		height: 100%;
		align-content: center;
	}
</style>