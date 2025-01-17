import { defineInterface } from '@directus/shared/utils';
import InterfaceFiles from './files.vue';
import PreviewSVG from './preview.svg?raw';
import { ExtensionsOptionsContext } from '@directus/shared/types';

export default defineInterface({
	id: 'files',
	name: '$t:interfaces.files.files',
	description: '$t:interfaces.files.description',
	icon: 'note_add',
	component: InterfaceFiles,
	relational: true,
	types: ['alias'],
	localTypes: ['files'],
	group: 'relational',
	options: ({ relations }: ExtensionsOptionsContext) => [
		{
			field: 'folder',
			name: '$t:interfaces.system-folder.folder',
			type: 'uuid',
			meta: {
				width: 'full',
				interface: 'system-folder',
				note: '$t:interfaces.system-folder.field_hint',
			},
			schema: {
				default_value: undefined,
			},
		},
		{
			field: 'template',
			name: '$t:display_template',
			meta: {
				interface: 'system-display-template',
				options: {
					collectionName: relations.m2o?.related_collection ?? null,
				},
			},
		},
		{
			field: 'enableCreate',
			name: '$t:creating_items',
			schema: {
				default_value: true,
			},
			meta: {
				interface: 'boolean',
				options: {
					label: '$t:enable_create_button',
				},
				width: 'half',
			},
		},
		{
			field: 'enableSelect',
			name: '$t:selecting_items',
			schema: {
				default_value: true,
			},
			meta: {
				interface: 'boolean',
				options: {
					label: '$t:enable_select_button',
				},
				width: 'half',
			},
		},
	],
	recommendedDisplays: ['related-values'],
	preview: PreviewSVG,
});
