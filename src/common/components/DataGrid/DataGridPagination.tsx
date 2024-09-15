import * as React from 'react';
import { DataGridPaginationProps } from 'src/interfaces/DataGridPaginationProps';
import './dataGridStyles.css';
import { setLocationParam } from 'src/utils/dom';
import { Param } from 'src/enums/Param';
import { useLocationParam } from 'src/hooks/useLocationParam';
import { httpClient } from 'src/services/httpClient';
import { DataGridProps } from 'src/interfaces/DataGridProps';
import { TaskDataGridElement, TaskElement } from 'src/interfaces/TaskDataGridElement';

const SequentialPaginationButton = React.memo<{
	isLeft?: boolean;
	disabled: boolean;
	onRequestLastPage?: DataGridProps<TaskDataGridElement>['onRequestLastPage'];
}>(({ disabled, onRequestLastPage, isLeft = false }) => {
	const handleClick = React.useCallback(() => {
		if (disabled) {
			return;
		}

		if (isLeft) {
			setLocationParam(Param.Page, '1');
		} else {
			// setLocationParam(Param.Page, String(pages));
			onRequestLastPage?.();
		}
	}, [disabled, onRequestLastPage]);

	return (
		<div
			className={['paginationButton', disabled && 'paginationButtonDisabled']
				.filter(Boolean)
				.join(' ')}
			onClick={handleClick}
		>
			{isLeft ? '<<' : '>>'}
		</div>
	);
});

export const DataGridPagination = React.memo<DataGridPaginationProps>(({ buttonsToRight, onRequestLastPage }) => {
	const [currentPage, setCurrentPage] = React.useState(0);
	const page = useLocationParam(Param.Page);

	const handleSetPage = React.useCallback(
		(page: number) => () => {
			setLocationParam(Param.Page, String(page + 1));
		},
		[],
	);

	React.useEffect(() => {
		if (page) {
			setCurrentPage(+page - 1);
		}
	}, [page]);

	const buttons = React.useMemo(() => {
		const buttonsToLeftMap = {
			4: 0,
			3: 1,
			2: 2,
		};

		const buttonsToLeft = buttonsToLeftMap[buttonsToRight as keyof typeof buttonsToLeftMap] ?? 2;

		const buttonsCount = buttonsToLeft + buttonsToRight + 1;

		const res = Array.from({ length: buttonsCount }, (_, index) => {
			if (currentPage >= 3) {
				index = currentPage - 2 + index;
			}

			return (
				<div
					key={['page', index].join('_')}
					onClick={handleSetPage(index)}
					className={[
						'paginationButton',
						index === currentPage && 'paginationButtonActive',
					]
						.filter(Boolean)
						.join(' ')}
				>
					{index + 1}
				</div>
			);
		});

		res.unshift(
			<SequentialPaginationButton
				key={'sequentialPaginationButton-left'}
				isLeft
				disabled={currentPage <= 0}
			/>,
		);

		res.push(
			<SequentialPaginationButton
				key={'sequentialPaginationButton-right'}
				disabled={!buttonsToRight}
				onRequestLastPage={onRequestLastPage}
			/>,
		);

		return res;
	}, [currentPage, buttonsToRight]);

	return <div className={'paginationContainer'}>{buttons}</div>;
});
