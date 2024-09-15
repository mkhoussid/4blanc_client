import { getLocationHash } from 'src/utils/dom';
import { useValueObserver } from './useValueObserver';
import { Param } from 'src/enums/Param';

export const useLocationParam = (param: Param) =>
	useValueObserver(() => new URLSearchParams(getLocationHash()).get(param));
