import { DataGridProps } from 'src/interfaces/DataGridProps';
import { DataGridPagination } from './DataGridPagination';
import { DataGridHeader } from './DataGridHeader';
import { DataGridRow } from './DataGridRow';
import './dataGridStyles.css';

export function DataGrid<T>({
	data,
	columns,
	onRowClick,
	buttonsToRight,
	onRequestLastPage,
}: DataGridProps<T>): JSX.Element {
	return (
		<div className={'dataGrid'}>
			<table className={'innerContainer'}>
				<thead>
					<DataGridHeader columns={columns} />
				</thead>
				{!!data.length && (
					<tbody>
						<DataGridRow data={data} columns={columns} onRowClick={onRowClick} />
					</tbody>
				)}
			</table>
			{!data.length ? (
				<div className={'emptyListContainer'}>Ничего не найдено</div>
			) : (
				<DataGridPagination
					buttonsToRight={buttonsToRight}
					onRequestLastPage={onRequestLastPage}
				/>
			)}
		</div>
	);
}
