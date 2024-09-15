import { IColumnType } from 'src/interfaces/IColumnType';
import { TaskDataGridElement } from 'src/interfaces/TaskDataGridElement';
import { formatDate } from 'src/utils/date';

export const taskColumns: IColumnType<TaskDataGridElement>[] = [
	{
		key: 'id',
		title: 'Номер задачи',
		width: 300,
	},
	{
		key: 'title',
		title: 'Заголовок',
		width: 400,
	},
	{
		key: 'deadline_date',
		title: 'Дата выполнения',
		width: 400,
		render: ({ item: { deadline_date } }) => formatDate(new Date(deadline_date)),
	},
];
