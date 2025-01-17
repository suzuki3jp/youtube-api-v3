/**
 * This is a internal Logger class that is used to log messages.
 * @internal
 */
export class Logger {
    public name: string;
    public level: LogLevel;
    public parent: Logger | null;

    constructor({ name, level, parent }: LoggerOptions) {
        this.name = name;
        this.level = level ?? "ERROR";
        this.parent = parent ?? null;
    }

    public createChild(name: string): Logger {
        return new Logger({ name, level: this.level, parent: this });
    }

    public error(...messages: string[]) {
        this.log("ERROR", ...messages);
    }

    public info(...messages: string[]) {
        this.log("INFO", ...messages);
    }

    public debug(...messages: string[]) {
        this.log("DEBUG", ...messages);
    }

    private log(level: LogLevel, ...messages: string[]) {
        if (
            ["ERROR", "INFO", "DEBUG"].indexOf(level) >
            ["ERROR", "INFO", "DEBUG"].indexOf(this.level)
        )
            return;
        const message = this.makeMessage(level, ...messages);
        console.log(message);
    }

    private makeMessage(level: LogLevel, ...messages: string[]): string {
        const parents: Logger[] = [];
        let child: Logger = this;

        while (child.parent) {
            parents.unshift(child.parent);
            child = child.parent;
        }

        return [
            `[${[...parents, this].map((i) => i.name).join("/")}]`,
            `[${level.toUpperCase()}]`,
            ...messages,
        ].join(" ");
    }
}

type LogLevel = "ERROR" | "INFO" | "DEBUG";

type LoggerOptions = {
    name: string;
    level?: LogLevel;
    parent?: Logger;
};

export const mainLogger = new Logger({ name: "YOUTUBE.JS" });
