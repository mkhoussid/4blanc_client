import { Param } from 'src/enums/Param';

export const getLocationHash = () => window.location.hash.replace(/^#\//, '');

export const setLocationParam = (param: Param, value: string | null, override = false) => {
	const currentParams = new URLSearchParams(override ? '' : getLocationHash());

	if (value) {
		currentParams.set(param, value);
	} else {
		currentParams.delete(param);
	}

	let hash = String(currentParams);

	if (!hash.startsWith('/?')) {
		hash = `/?${hash}`;
	}

	window.location.hash = hash;
};

export const debounce = <T>(cb: (arg: T) => void, delay: number) => {
	let timer: NodeJS.Timeout | null = null;

	return (e: T) => {
		clearTimeout(timer as NodeJS.Timeout);
		timer = setTimeout(() => cb(e), delay);
	};
};
