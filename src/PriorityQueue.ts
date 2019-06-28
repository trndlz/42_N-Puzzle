import NBoard from "./Puzzle";

interface IQueueElement {
    element: NBoard;
    priority: number;
}

export default class PriorityQueue {

    public items: IQueueElement[];
    constructor() {
        this.items = [];
    }

    public enqueue(element, priority) {
        const QElem = { element, priority };
        let contain = false;
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].priority > QElem.priority) {
                this.items.splice(i, 0, QElem);
                contain = true;
                break;
            }
        }
        if (!contain) {
            this.items.push(QElem);
        }
    }

    public dequeue() {
        return this.isEmpty() ? undefined : this.items.shift();
    }

    // Returns the highest priority element
    public front() {
        return this.isEmpty() ? undefined : this.items[0];
    }

    // Returns the lowest priorty element
    public rear() {
        return this.isEmpty() ? undefined : this.items[this.items.length - 1];
    }

    private isEmpty() {
        return this.items.length === 0;
    }
} 