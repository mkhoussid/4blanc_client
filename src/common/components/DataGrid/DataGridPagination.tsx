import * as React from 'react';
import { DataGridPaginationProps } from 'src/interfaces/DataGridPaginationProps';
import './dataGridStyles.css';
import { setLocationParam } from 'src/utils/dom';
import { Param } from 'src/enums/Param';
import { useLocationParam } from 'src/hooks/useLocationParam';

const SequentialPaginationButton = React.memo<{
	isLeft?: boolean;
	pages: number;
	disabled: boolean;
}>(({ pages, disabled, isLeft = false }) => {
	const handleClick = React.useCallback(() => {
		if (disabled) {
			return;
		}

		if (isLeft) {
			setLocationParam(Param.Page, '1');
		} else {
			setLocationParam(Param.Page, String(pages));
		}
	}, [disabled]);

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

export const DataGridPagination = React.memo<DataGridPaginationProps>(({ pages }) => {
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
		const BUTTONS_COUNT = 5;

		const res = Array.from({ length: BUTTONS_COUNT }, (_, index) => {
			if (currentPage >= 3) {
				index = currentPage - 2 + index;
			}

			if (pages !== 1 && index > pages - 1) {
				return null;
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
				pages={pages}
				disabled={currentPage <= 0 || !pages}
			/>,
		);

		res.push(
			<SequentialPaginationButton
				key={'sequentialPaginationButton-right'}
				pages={pages}
				disabled={currentPage + 1 === pages || !pages}
			/>,
		);

		return res;
	}, [currentPage, pages]);

	return <div className={'paginationContainer'}>{buttons}</div>;
});
