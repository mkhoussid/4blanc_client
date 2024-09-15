import { IColumnType } from './IColumnType';

export interface DataGridRowCellProps<T> {
	item: T;
	column: IColumnType<T>;
	onRowClick?: (item: T) => void;
	rowIndex: number;
	activeRowIndex: number | null;
	setActiveRowIndex: (activeRowIndex: number | null) => void;
}
