import NBoard from "./Puzzle";

// interface IQueueElement {
//     board: NBoard;
//     score: number;
//     move: number;
//     heuristics: number;
//     parent?: NBoard;
// }

export default class PriorityQueue {

    public items: NBoard[];
    constructor() {
        this.items = [];
    }

    public enqueue(elem: NBoard) {
        let contain = false;
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].score > elem.score) {
                this.items.splice(i, 0, elem);
                contain = true;
                break;
            }
        }
        if (!contain) {
            this.items.push(elem);
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