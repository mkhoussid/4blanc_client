import { DataGridHeaderProps } from 'src/interfaces/DataGridHeaderProps';

export function DataGridHeader<T>({ columns }: DataGridHeaderProps<T>): JSX.Element {
	return (
		<tr className={'headerContainer'}>
			{columns.map((column, index) => (
				<th
					style={{ maxWidth: column.width }}
					key={['header_element', index].join('_')}
					title={column.title}
					className={'header'}
				>
					{column.title}
				</th>
			))}
		</tr>
	);
}
