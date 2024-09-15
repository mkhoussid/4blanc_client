import * as React from 'react';
import { Param } from 'src/enums/Param';
import { useLocationParam } from 'src/hooks/useLocationParam';
import { debounce, setLocationParam } from 'src/utils/dom';

export const SearchInput = React.memo(() => {
	const ref = React.useRef<HTMLInputElement>(null);
	const taskSearchQuery = useLocationParam(Param.TaskSearchQuery);

	React.useEffect(() => {
		if (ref.current) {
			ref.current.value = taskSearchQuery || '';
		}
	}, [taskSearchQuery]);

	const handleChange = React.useCallback(
		debounce<React.ChangeEvent<HTMLInputElement>>(
			(e) => setLocationParam(Param.TaskSearchQuery, e.target.value),
			500,
		),
		[],
	);

	const handleClearSearchInput = React.useCallback(() => setLocationParam(Param.TaskSearchQuery, null), []);

	return (
		<div className={'searchInputWrapper'}>
			<div className={'searchInputContainer'}>
				<input
					ref={ref}
					className={'searchInput'}
					placeholder='Поиск...'
					onChange={handleChange}
				/>
				{taskSearchQuery && (
					<div className={'clearSearchInputButton'} onClick={handleClearSearchInput}>
						×
					</div>
				)}
			</div>
		</div>
	);
});
