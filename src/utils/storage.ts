import { TaskElement } from 'src/interfaces/TaskDataGridElement';

const getTaskStorageKey = (taskId: string | number) => ['__4blanc__task', taskId].join('_');

export const setCachedTask = (task: TaskElement) =>
	localStorage.setItem(getTaskStorageKey(task.id), JSON.stringify(task));

export const getCachedTask = (taskId: string): TaskElement | null => {
	try {
		const cachedTask = localStorage.getItem(getTaskStorageKey(taskId));

		if (cachedTask) {
			return JSON.parse(cachedTask);
		}

		return null;
	} catch (err) {
		return null;
	}
};
