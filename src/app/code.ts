export class Code {

    constructor(id: number, name: string, age: number, gender: string, cosplay: string, cosplayImg: string, descriptionPhysical: string, descriptionClothing: string, lastSeen: string, timestampLogged: number, timestampResolved: number, resolved: boolean) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.cosplay = cosplay;
        this.cosplayImg = cosplayImg;
        this.descriptionPhysical = descriptionPhysical;
        this.descriptionClothing = descriptionClothing;
        this.lastSeen = lastSeen;
        this.timestampLogged = timestampLogged;
        this.timestampResolved = timestampResolved;
        this.resolved = resolved;
    }
    id: number;
    name: string;
    age: number;
    gender: string;
    cosplay: string;
    cosplayImg: string;
    descriptionPhysical: string;
    descriptionClothing: string;
    lastSeen: string;
    timestampLogged: number;
    timestampResolved: number;
    resolved: boolean;
    // TODO:: expand types


    static getTimeString(millis: number): string {
        const ms = millis % 1000;
        millis = (millis - ms) / 1000;
        const s = millis % 60;
        millis = (millis - s) / 60;
        const m = millis % 60;
        const h = (millis - m) / 60;

        return h + 'h.' + m + 'm.' + s + 's';
    }

    // TODO:: extract sev constants
    static getTimeMissingCss(code: Code, withFound: boolean): string {
        if (withFound && code.resolved) {
            return 'found';
        }
        const SEV3 = 3 * 60 * 1000; // 3 minutes
        const SEV2 = 6 * 60 * 1000; // 6 minutes
        const SEV1 = 10 * 60 * 1000; // 10 minutes

        const start = code.timestampResolved ? code.timestampResolved : (new Date).getTime();
        const missing = start - code.timestampLogged;

        let css;
        if (missing > SEV3) {
            if (missing > SEV2) {
                if (missing > SEV1) {
                    // Over SEV1 - 10+ minutes
                    css = 'severe';
                } else {
                    // Under SEV1 - 6-10 minutes
                    css = 'warn';
                }
            } else {
                // Under SEV2 - 3-6 minutes
                css = 'alert';
            }
        } else {
            // under SEV3 - 0-3 minutes
            css = 'ok';
        }

        return css;
    }

    static getTimeMissing(code: Code): string {
        const start = code.timestampResolved ? code.timestampResolved : (new Date).getTime();
        return Code.getTimeString(start - code.timestampLogged);
    }

    static toggleFound(code: Code): void {
        // Toggle resolved state and then set resolved timestamp to now if resolved, null if unresolved
        code.resolved = !code.resolved;
        code.timestampResolved = code.resolved ? (new Date).getTime() : null;
    }

    static emptyCode(): Code {
        return new Code(null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            (new Date).getTime(),
            null,
            false);
    }

}
