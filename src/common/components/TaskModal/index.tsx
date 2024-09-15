import * as React from 'react';
import './modalStyles.css';
import { ModalEventData } from 'src/interfaces/ModalEventData';
import { EventName } from 'src/enums/EventName';
import { httpClient } from 'src/services/httpClient';
import { generateRequestUrl } from 'src/services/httpClient/utils';
import { Entity } from 'src/enums/Entity';
import { useLocationParam } from 'src/hooks/useLocationParam';
import { TaskElement } from 'src/interfaces/TaskDataGridElement';
import { setLocationParam } from 'src/utils/dom';
import { Param } from 'src/enums/Param';
import { formatDate } from 'src/utils/date';

const fieldMatrixMap: Partial<Record<keyof TaskElement, string>> = {
	title: 'Заголовок',
	deadline_date: 'Дата выполнения',
	author: 'Автор',
	description: 'Описания',
};

const getValue = (field: keyof TaskElement, value: string | number) => {
	if (field === 'deadline_date') {
		return formatDate(new Date(value));
	}

	return value;
};

const stopPropagation = (e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation();

// can make more generic, but this will suffice for this interview test
export const TaskModal = React.memo(() => {
	const [task, setTask] = React.useState<TaskElement | null>(null);

	const taskId = useLocationParam(Param.TaskId);
	const page = useLocationParam(Param.Page);

	React.useEffect(() => {
		if (taskId) {
			httpClient({
				url: generateRequestUrl(Entity.Task, taskId),
				onSuccess: (data) => {
					setTask((data as { task: TaskElement }).task);
				},
				onFail: (err) => {
					console.log(err);
				},
			});
		}
	}, [taskId]);

	React.useEffect(() => {
		if (!page) {
			setTask(null);
		}
	}, [page]);

	const handleKeyUp = React.useCallback(
		(age: number) => (e: KeyboardEvent) => {
			if (e.code === 'Escape') {
				handleClose();
			}
		},
		[],
	);

	React.useEffect(() => {
		document.addEventListener('keyup', handleKeyUp(18));

		return () => {
			document.removeEventListener('keyup', handleKeyUp(18));
		};
	}, []);

	const handleClose = React.useCallback(() => {
		setTask(null);
		setLocationParam(Param.TaskId, null);
	}, []);

	if (!task || !page) {
		return null;
	}

	return (
		<div className={'modalBackdrop'} onClick={handleClose}>
			<div className={'modalContainer'} onClick={stopPropagation}>
				<div className={'modalHeader'}>
					<div className='modalCloseButton' onClick={handleClose}>
						×
					</div>
					{['Информация о задаче №', taskId].join(' ')}
				</div>

				<div className={'modalBody'}>
					{Object.entries(task)
						.filter(([field]) => (field as keyof TaskElement) !== 'id')
						.map(([field, value]) => {
							return (
								<div key={field} className={'taskDetailContainer'}>
									<span>
										{fieldMatrixMap[
											field as keyof TaskElement
										] ?? 'Unkown field'}
									</span>
									<span className={'taskValueContainer'}>
										{getValue(
											field as keyof TaskElement,
											value,
										)}
									</span>
								</div>
							);
						})}
				</div>
			</div>
		</div>
	);
});
