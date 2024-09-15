import { DataGridProps } from './DataGridProps';

export interface DataGridPaginationProps {
	buttonsToRight: number;
	onRequestLastPage: DataGridProps<unknown>['onRequestLastPage'];
}
