import { IColumnType } from './IColumnType';

export interface DataGridProps<T> {
	data: T[];
	onRowClick?: (item: T) => void;
	columns: IColumnType<T>[];
	buttonsToRight: number;
	onRequestLastPage: () => void;
}
