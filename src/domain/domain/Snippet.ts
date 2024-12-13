export class Snippet {
    constructor(
        public readonly id: string,
        public title: string,
        public content: string,
        public createdAt: Date,
        public updatedAt: Date = new Date()
    ) {}
}
