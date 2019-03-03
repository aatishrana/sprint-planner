import { Task } from './task';

export class Story {
    constructor(
        public id: number,
        public title: string,
        public developer: string,
        public tester: string,
        public owner: string,
        public tasks: Task[],
    ) {
    }
}