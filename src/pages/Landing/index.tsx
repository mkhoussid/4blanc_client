import * as React from 'react';
import { taskColumns } from 'src/common/components/DataGrid/columns/taskColumns';
import { DataGrid } from 'src/common/components/DataGrid/DataGrid';
import { SearchInput } from 'src/common/components/SearchInput';
import { TaskModal } from 'src/common/components/TaskModal';
import { Entity } from 'src/enums/Entity';
import { Param } from 'src/enums/Param';
import { useLocationParam } from 'src/hooks/useLocationParam';
import { FetchTasksResponse } from 'src/interfaces/FetchTasksResponse';
import { TaskDataGridElement } from 'src/interfaces/TaskDataGridElement';
import { httpClient } from 'src/services/httpClient';
import { generateRequestUrl } from 'src/services/httpClient/utils';
import { setLocationParam } from 'src/utils/dom';

export const Landing = React.memo(() => {
	const [data, setData] = React.useState<TaskDataGridElement[]>([]);
	const [buttonsToRight, setButtonsToRight] = React.useState(0);

	const page = useLocationParam(Param.Page);
	const taskSearchQuery = useLocationParam(Param.TaskSearchQuery);

	const fetchTasks = React.useCallback(
		({ page, taskSearchQuery }: { page: string; taskSearchQuery: string | null }) => {
			console.log('page..', page);
			httpClient({
				url: generateRequestUrl(Entity.Task),
				params: { page, [Param.TaskSearchQuery]: taskSearchQuery },
				onSuccess: ({ tasks, redirect, buttonsToRight }: FetchTasksResponse) => {
					if (redirect) {
						setLocationParam(Param.Page, '1');
					} else {
						setData(tasks as TaskDataGridElement[]);
						setButtonsToRight(buttonsToRight as number);
					}
				},
				onFail: (err) => {
					console.log(err);
				},
			});
		},
		[],
	);

	React.useEffect(() => {
		if (!page) {
			setLocationParam(Param.Page, '1', true);
		} else {
			fetchTasks({ page, taskSearchQuery });
		}
	}, [page, taskSearchQuery]);

	const handleRowClick = React.useCallback((item: TaskDataGridElement) => {
		setLocationParam(Param.TaskId, String(item.id));
	}, []);

	const handleRequestLastPage = React.useCallback(() => {
		fetchTasks({ page: 'end', taskSearchQuery });
	}, [taskSearchQuery]);

	return (
		<>
			<SearchInput />
			<DataGrid
				data={data}
				columns={taskColumns}
				onRowClick={handleRowClick}
				buttonsToRight={buttonsToRight}
				onRequestLastPage={handleRequestLastPage}
			/>
			<TaskModal />
		</>
	);
});
