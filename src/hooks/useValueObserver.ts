import * as React from 'react';

export const useValueObserver = <T = unknown>(getValue: () => T, queryRate = 100) => {
	const [value, setValue] = React.useState(getValue());

	React.useEffect(() => {
		let curValue: T = value;
		const interval = setInterval(() => {
			const newValue = getValue();

			if (newValue !== curValue) {
				setValue(newValue);
				curValue = newValue;
			}
		}, queryRate);

		return () => {
			clearInterval(interval);
		};
	});

	return value;
};
