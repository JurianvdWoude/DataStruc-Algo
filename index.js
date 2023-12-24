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
function LinearSearch(needle, haystack) {
    for (let i = 0; i < haystack.length; i++) {
        if (needle === haystack[i])
            return i;
    }
    return null;
}
function BinarySearch(needle, haystack) {
    if (haystack.length === 0)
        return null;
    let i = haystack.length - 1;
    i = Math.round(i / 2);
    while (i > 1) {
        if (needle === haystack[i])
            return i;
        if (needle < haystack) {
            i = Math.round(i / 2);
        }
        else {
            i = Math.round(i + i / 2);
        }
    }
    if (haystack[i] === needle)
        return i;
    return null;
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
let arr = [3, 7, 4, 8, 5, 3, 2, 6, 8, 4];
let sortedArr = BubbleSort(arr);
const lin = LinearSearch(8, sortedArr);
const bin = BinarySearch(8, sortedArr);
console.log(`${lin} === ${bin}`);
