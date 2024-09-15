export interface IColumnType<T> {
	key: string;
	title: string;
	width?: number | string;
	render?: (args: { column: IColumnType<T>; item: T; isActive: boolean }) => JSX.Element | null | string;
}
