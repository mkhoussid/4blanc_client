import * as React from 'react';
import { DataGridRowProps } from 'src/interfaces/DataGridRowProps';
import { DataGridRowCell } from './DataGridRowCell';

export function DataGridRow<T>({ data, columns, onRowClick }: DataGridRowProps<T>): JSX.Element {
	const [activeRowIndex, setActiveRowIndex] = React.useState<number | null>(null);

	return (
		<>
			{data.map((item, rowIndex) => {
				return (
					<tr className={'dataGridRow'} key={['tr_item', rowIndex].join('_')}>
						{columns.map((column, columnIndex) => {
							return (
								<DataGridRowCell
									key={['datagrid_cell', columnIndex].join('_ ')}
									column={column}
									item={item}
									onRowClick={onRowClick}
									activeRowIndex={activeRowIndex}
									setActiveRowIndex={setActiveRowIndex}
									rowIndex={rowIndex}
								/>
							);
						})}
					</tr>
				);
			})}
		</>
	);
}
