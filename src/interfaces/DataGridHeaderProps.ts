import { IColumnType } from './IColumnType';

export interface DataGridHeaderProps<T> {
	columns: IColumnType<T>[];
}
