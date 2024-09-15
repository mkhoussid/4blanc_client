import * as React from 'react';
import { DataGridRowCellProps } from 'src/interfaces/DataGridRowCellProps';

export function DataGridRowCell<T>({
	item,
	column,
	onRowClick,
	activeRowIndex,
	setActiveRowIndex,
	rowIndex,
}: DataGridRowCellProps<T>): JSX.Element {
	// const value = get(item, column.key)
	// @ts-expect-error
	const value = item[column.key];

	const isActive = React.useMemo(() => activeRowIndex === rowIndex, [activeRowIndex, rowIndex]);

	const handleOnClick = React.useCallback(() => {
		setActiveRowIndex(isActive ? null : rowIndex);
		onRowClick?.(item);
	}, [onRowClick, item, isActive]);

	return (
		<td className={'dataGridColumn'} style={{ maxWidth: column.width }} onClick={handleOnClick}>
			{column.render ? column.render({ column, item, isActive }) : value}
		</td>
	);
}
