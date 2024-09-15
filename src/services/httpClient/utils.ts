import { Entity } from 'src/enums/Entity';

export const generateRequestUrl = (entity: Entity, slug?: string | number) =>
	[import.meta.env.VITE_BE_URL, 'api/v1', entity, slug].filter(Boolean).join('/');
