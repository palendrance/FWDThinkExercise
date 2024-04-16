import type { Ticket } from "@/types/Ticketing";

type TableDisplayType = "text" | "chip" | "buttons";

/**
 * Definition for building an icon button for the ticket table.
 * @param text - Aria text for improved accessibility
 * @param icon - CSS classes for setting the button's icon
 * @param callback - Callback to provide the button's functionality
 */
interface TicketsTableButton {
	text: string; // *** Ideally I would have hover text
	icon: string;
	callback(rowIndex: number): void;
}

/**
 * Base interface for building each ticket table column interface
 * @param title - column title
 * @param displayType - basic information on how the cell contents will be rendered
 */
interface BaseTicketsTableColumn {
	title: string;
	displayType: TableDisplayType;
}

/**
 * Text column definition
 * @param key - key used to access the data for the cell
 */
interface TextTicketsTableColumn extends BaseTicketsTableColumn {
	displayType: "text";
	key: keyof Ticket;
}

/**
 * Chip column definition
 * @param key - key used to access the data for the cell
 */
interface ChipTicketsTableColumn extends BaseTicketsTableColumn {
	displayType: "chip";
	key: string;
}

/**
 * Buttons column definition
 * @param buttons - collection of button definitions
 */
interface ButtonsTicketsTableColumn extends BaseTicketsTableColumn {
	displayType: "buttons";
	buttons: TicketsTableButton[];
}

export type TicketsTableColumn = TextTicketsTableColumn | ChipTicketsTableColumn | ButtonsTicketsTableColumn;