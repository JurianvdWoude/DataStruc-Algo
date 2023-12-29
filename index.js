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
class ArrayList {
    constructor(array) {
        this.increment = 8;
        this.length = array.length;
        const padding = this.increment - (array.length % this.increment);
        this.capacity = array.length + padding;
        let paddedArray = array;
        if (padding)
            paddedArray.push(...(new Array(padding).fill(0)));
        this.array = Uint32Array.from(paddedArray);
    }
    push(value) {
        if (Number.isInteger(value)) {
            if (this.length + 1 > this.capacity) {
                this.capacity += this.increment;
                let newArr = new Uint32Array(this.capacity);
                newArr.set(this.array);
                this.array = newArr;
            }
            this.length += 1;
            this.array[this.length - 1] = value;
        }
        else {
            throw new Error('value provided is not an integer');
        }
    }
    pop() {
        const value = this.array[this.length - 1];
        this.array[this.length - 1] = 0;
        this.length -= 1;
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
function time(fn) {
    const start = Date.now();
    fn();
    return Date.now() - start;
}
let a = [1, 2, 3, 4, 5, 6];
let arr = new ArrayList(a);
console.log(`initial array: ${arr.array}`);
console.log(`length: ${arr.length}`);
console.log(`capacity: ${arr.capacity}`);
arr.push(7);
console.log(`added 7: ${arr.array}`);
console.log(`length: ${arr.length}`);
console.log(`capacity: ${arr.capacity}`);
arr.push(8);
console.log(`added 8: ${arr.array}`);
console.log(`length: ${arr.length}`);
console.log(`capacity: ${arr.capacity}`);
arr.push(9);
console.log(`added 9: ${arr.array}`);
console.log(`length: ${arr.length}`);
console.log(`capacity: ${arr.capacity}`);
console.log(`pop: ${arr.pop()}`);
console.log(`removed 9: ${arr.array}`);
console.log(`length: ${arr.length}`);
console.log(`capacity: ${arr.capacity}`);
console.log(`pop: ${arr.pop()}`);
console.log(`removed 8: ${arr.array}`);
console.log(`length: ${arr.length}`);
console.log(`capacity: ${arr.capacity}`);
console.log(`pop: ${arr.pop()}`);
console.log(`removed 7: ${arr.array}`);
console.log(`length: ${arr.length}`);
console.log(`capacity: ${arr.capacity}`);
