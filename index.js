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
function BubbleSort(arr) {
    let sortLength = arr.length;
    if (sortLength <= 1) {
        return arr;
    }
    for (let l = 0; l < arr.length; l++) {
        sortLength--;
        for (let i = 0; i < sortLength; i++) {
            if (arr[i] > arr[i + 1]) {
                let tmpVal = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = tmpVal;
            }
        }
    }
    return arr;
}
let arr = [4, 1, 4, 7, 3, 2, 6, 9, 4, 0];
console.log(arr);
arr = BubbleSort(arr);
console.log(arr);
