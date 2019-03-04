export class Task {
    constructor(
        public taskFor: string,
        public seq: number,
        public title: string,
        public hours: number,
        public after: string,
    ) { }
}