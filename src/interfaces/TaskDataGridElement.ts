export interface TaskElement {
	id: number;
	title: string;
	deadline_date: string;
	author: string;
	status: string;
	description: string;
}

export type TaskDataGridElement = Pick<TaskElement, 'id' | 'title' | 'deadline_date'>;
