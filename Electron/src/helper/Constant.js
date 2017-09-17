import React from 'react';


export const APP_NAME = "Airtask";


export const SIDE_VIEW_ITEMS =
	[{
		name: "Notes",
		icon: "fa-sticky-note-o"
	}, {
		name: "Tasks",
		icon: "fa-tasks"
	}, {
		name: "About",
		icon: "fa-bolt"
	}];

export const SIDEBAR_GRAY_COLOR = "#e8e6e8";
export const SIDEBAR_LINUX_COLOR = "#333";
export const DETAIL_LINUX_COLOR = "#fff";
export const PRICOLOR = "#ff4500";
export const ACCENTCOLOR = "#ff4500";
export const TEXTGRAYSECCOLOR = '#8a8a8a';

export const CARROT = '#e67e22';
export const PETER_RIVER = '#3498db';
export const WISTERIA =	'#8e44ad';
export const ALIZARIN =	'#e74c3c';
export const TURQUOISE =	'#1abc9c';
export const MIDNIGHT_BLUE =	'#2c3e50';
export const INDIANRED = '#CD5C5C';
export const TEAL = '#008080';
export const NAVY = '#000080';
export const PURPLE = '#800080';


export const EMPTY_NOTES_MESSAGE = "It's empty in here, create a note to get started."
export const EMPTY_TASKS_MESSAGE = "It's empty in here, create a task to get started."
export const EDITOR_TASK_PLACE_HOLDER = "Create your task...";
export const EDITOR_NOTE_PLACE_HOLDER = "Start writing your note...";

export const NOTE_TYPE = [ 'Less Important', 'Very Important'];


export const BLOCK_BUTTONS = [
  {
	label: 'Q',
	style: 'blockquote',
	icon: 'quote-right',
	description: 'Blockquote',
  },
  {
	label: 'UL',
	style: 'unordered-list-item',
	icon: 'list-ul',
	description: 'Unordered List',
  }
];

export const INLINE_BUTTONS = [
  {
	label: 'B',
	style: 'BOLD',
	icon: 'bold',
	description: 'Bold',
  },
  {
	label: 'HI',
	style: 'HIGHLIGHT',
	description: 'Highlight Selection',
  }
];