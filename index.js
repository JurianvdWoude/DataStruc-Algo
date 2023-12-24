"use strict";
class Queue {
    constructor() {
        this.head = this.tail = undefined;
        this.length = 0;
    }
    peek() {
        var _a;
        return (_a = this.head) === null || _a === void 0 ? void 0 : _a.value;
    }
    enqueue(value) {
        const node = {
            value: value, next: undefined
        };
        this.length++;
        if (!this.head) {
            this.head = node;
            this.tail = node;
            return value;
        }
        if (!this.head.next)
            this.head.next = node;
        const tail = this.tail;
        this.tail = node;
        if (tail)
            tail.next = node;
        return value;
    }
    dequeue() {
        if (!this.head)
            return;
        this.length--;
        const head = this.head;
        this.head = head.next;
        head.next = undefined;
        return head.value;
    }
}
let q = new Queue;
console.log(q.peek());
console.log("\n");
q.enqueue(5);
console.log(q.peek());
console.log("\n");
q.enqueue(10);
console.log(q.peek());
console.log("\n");
q.dequeue();
console.log(q.peek());
console.log("\n");
q.dequeue();
console.log(q.peek());
console.log("\n");
