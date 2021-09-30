export interface Reminder {
	who: string;
	what: string;
	when: Date;
}

export function parse(
    text: string
): Reminder;
export default parse;
