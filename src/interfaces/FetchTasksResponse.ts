import { TaskDataGridElement } from './TaskDataGridElement';

interface FetchTasksResponseWithData {
	tasks: TaskDataGridElement[];
	buttonsToRight: number;
	redirect?: never;
}

interface FetchTasksResponseWithRedirect {
	tasks?: never;
	buttonsToRight?: never;
	redirect: boolean;
}

export type FetchTasksResponse = FetchTasksResponseWithData | FetchTasksResponseWithRedirect;
