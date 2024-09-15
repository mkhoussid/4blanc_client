import { TaskDataGridElement } from './TaskDataGridElement';

interface FetchTasksResponseWithData {
	tasks: TaskDataGridElement[];
	count: number;
	redirect?: never;
}

interface FetchTasksResponseWithRedirect {
	tasks?: never;
	count?: never;
	redirect: boolean;
}

export type FetchTasksResponse = FetchTasksResponseWithData | FetchTasksResponseWithRedirect;
