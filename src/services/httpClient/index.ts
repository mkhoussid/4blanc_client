export const httpClient = async <T>({
	url,
	params,
	onFail,
	onSuccess,
	onPending,
	onFinally,
}: {
	url: string;
	params?: Record<string, any>;
	onFinally?: () => void;
	onPending?: () => void;
	onFail?: (err: any) => void;
	onSuccess?: (data: any) => void;
}): Promise<T> => {
	try {
		onPending?.();

		const _url = new URL(url);

		if (params) {
			Object.entries(params).forEach(([key, value]) => {
				if (value) {
					_url.searchParams.append(key, value);
				}
			});
		}

		const res = await fetch(_url);

		const result = (await res.json()) as Promise<T>;

		onSuccess?.(result);

		return result;
	} catch (err) {
		console.log(err);
		onFail?.(err as any);

		throw err;
	} finally {
		onFinally?.();
	}
};
