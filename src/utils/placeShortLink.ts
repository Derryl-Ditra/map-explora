import { PLACE_SHORT_CODES } from '../data/placeShortCodes';
export function placeCode(id:string):string|null {return PLACE_SHORT_CODES[id]??null;}
export function placeIdFromCode(code:string):string|null {return Object.entries(PLACE_SHORT_CODES).find(([,c])=>c===code)?.[0]??null;}
export function shortPlacePath(id:string):string|null {const code=placeCode(id);return code?`/id/places/${code}/`:null;}
