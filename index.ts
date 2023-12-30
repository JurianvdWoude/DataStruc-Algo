type QueueNode<U> = {
  value: U|undefined,
  next: QueueNode<U>|undefined,
}

class Queue<T> {
  public length: number;
  public head: QueueNode<T>|undefined; 
  public tail: QueueNode<T>|undefined; 

  constructor() {
    this.head = this.tail = undefined; 
    this.length = 0;
  }

  peek() {
    return this.head?.value;
  }

  enqueue(value: T) {
    const node = { 
      value: value, next: undefined 
    } as QueueNode<T>;
    this.length++;
    if(!this.head) {
      this.head = node;
      this.tail = node;
      return value;
    }
    if(!this.head.next) this.head.next = node;
    const tail = this.tail;
    this.tail = node;
    if(tail) tail.next = node;
    return value;
  }

  dequeue() {
    if(!this.head) return;
    this.length--;
    const head = this.head;
    this.head = head.next;
    head.next = undefined;
    return head.value;
  }
}

class ArrayList {
  length: number;
  capacity: number;
  increment: number = 8;
  array: Uint32Array;
  constructor(array: Array<number>) {
    this.length = array.length;
    const padding = this.increment - (array.length % this.increment);
    this.capacity = array.length + padding;
    let paddedArray = array;
    if(padding) paddedArray.push(...(new Array(padding).fill(0)));
    this.array = Uint32Array.from(paddedArray);
  }

  push(value: number) {
    if(
      Number.isInteger(value)
      && value >= 0
    ) {
      if(this.length + 1 > this.capacity) {
        this.capacity += this.increment;
        let newArr = new Uint32Array(this.capacity);
        newArr.set(this.array);
        this.array = newArr;
      }
      this.length += 1;
      this.array[this.length - 1] = value;
    } else {
      throw new Error('value provided is not an integer or positive');
    }
  }

  pop() {
    const value = this.array[this.length - 1];
    this.array[this.length - 1] = 0;
    this.length -= 1;
  }
}

function LinearSearch<R>(
  needle: R, 
  haystack: Array<R>,
) {
  for(let i = 0; i < haystack.length; i++) {
    if(needle === haystack[i]) return i;
  }
  return null;
}

function BinarySearch<R>(
  needle: R,
  haystack: Array<R>,
) {
  if(haystack.length === 0) return null;
  let i = haystack.length - 1;
  i = Math.round(i / 2);
  while(i > 1) {
    if(needle === haystack[i]) return i;
    if(needle < haystack) {
      i = Math.round(i / 2);
    } else {
      i = Math.round(i + i / 2);
    }
  }

  if(haystack[i] === needle) return i;
  return null;
}

function BubbleSort(arr: Array<number>) {
  let sortLength = arr.length;
  if(sortLength <= 1) {
    return arr;
  }
  for(let l = 0; l < arr.length; l++) {
    sortLength--;
    for(let i = 0; i < sortLength; i++) {
      if(arr[i] > arr[i + 1]) {
        let tmpVal = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = tmpVal;
      }
    }
  }
  return arr;
}

function QuickSort(arr: Array<number>) {
  function partition(arr: Array<number>, lo: number, hi: number) {
    let idx = lo - 1;
    let pivot = arr[hi];
    for(let i = lo; i < hi; i++) {
      if(arr[i] < pivot) {
        idx++;
        const tmp = arr[i];
        arr[i] = arr[idx];
        arr[idx] = tmp;
      }
    }
    idx++;
    arr[hi] = arr[idx];
    arr[idx] = pivot;
    return idx;
  }

  function qs(arr: Array<number>, lo: number, hi: number) {
    if(lo >= hi) return;

    const partIdx = partition(arr, lo, hi);
    qs(arr, partIdx + 1, hi);
    qs(arr, lo, partIdx - 1);
  }

  qs(arr, 0, arr.length - 1);
  return arr;
}

function time(fn: () => void) {
  const start = Date.now();
  fn();
  return Date.now() - start;
}
