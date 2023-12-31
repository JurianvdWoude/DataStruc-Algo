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
        if (Number.isInteger(value)
            && value >= 0) {
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
            throw new Error('value provided is not an integer or positive');
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
function QuickSort(arr) {
    function partition(arr, lo, hi) {
        let idx = lo - 1;
        let pivot = arr[hi];
        // sort all values based onnthe pivot value
        for (let i = lo; i < hi; i++) {
            if (arr[i] < pivot) {
                idx++;
                const tmp = arr[i];
                arr[i] = arr[idx];
                arr[idx] = tmp;
            }
        }
        // sort the pivot value
        idx++;
        arr[hi] = arr[idx];
        arr[idx] = pivot;
        return idx;
    }
    function sort(arr, lo, hi) {
        if (lo >= hi)
            return;
        const partIdx = partition(arr, lo, hi);
        sort(arr, partIdx + 1, hi);
        sort(arr, lo, partIdx - 1);
    }
    sort(arr, 0, arr.length - 1);
    return arr;
}
function MergeSort(arr) {
    function partition(arr, lo, hi) {
        if (lo == hi) {
            if (arr[lo] !== undefined)
                return [arr[lo]];
            return [];
        }
        if (lo > hi) {
            return [];
        }
        let pivot = Math.round(lo + (hi - lo) * 0.5);
        // continue partitioning until returning the smallest slice, then merge and return them
        let left = partition(arr, lo, pivot - 1);
        let right = partition(arr, pivot, hi);
        return merge(left, right);
    }
    function merge(left, right) {
        let arr = [];
        while (left.length && right.length) {
            if (left[0] < right[0]) {
                arr.push(left.shift());
            }
            else {
                arr.push(right.shift());
            }
        }
        return [...arr, ...left, ...right];
    }
    return partition(arr, 0, arr.length);
}
function time(fn) {
    const start = Date.now();
    fn();
    return Date.now() - start;
}
