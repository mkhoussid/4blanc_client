import { IColumnType } from './IColumnType';

export interface DataGridRowProps<T> {
	data: T[];
	columns: IColumnType<T>[];
	onRowClick?: (item: T) => void;
}
