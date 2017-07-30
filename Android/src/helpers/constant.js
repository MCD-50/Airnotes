import { PropTypes } from "react";

export const SIDEMARGIN = 10;
export const UPDOWNMARGIN = 5;
export const FONTSIZE = 'FONTSIZE';
export const FONTSTYLE = 'FONTSTYLE';
export const PRICOLOR = "#ff4500";
export const ACCENTCOLOR = "#ff4500";
export const TEXTGRAYSECCOLOR = '#8a8a8a';

export const propTypes = {
	navigator: PropTypes.object.isRequired,
	route: PropTypes.object.isRequired,
};


export const TASK_TYPE = ['Low', 'High'];
export const NOTE_TYPE = [ 'Less Important', 'Very Important'];

export const mainPageMenuItems = ['Share this app', 'Rate this app', 'Settings']
export const _actions = ["bold", "unorderedList", "ends", "delete"];