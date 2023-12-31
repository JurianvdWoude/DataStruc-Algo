type QNode<U> = {
  value: U|undefined,
  next: QNode<U>|undefined,
}

type LNode<U> = {
  value: U|undefined,
  next: LNode<U>|undefined,
  prev: LNode<U>|undefined,
}

class Queue<T> {
  public length: number;
  public head: QNode<T>|undefined; 
  public tail: QNode<T>|undefined; 

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
    } as QNode<T>;
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

class DoublyLinkedList<T> {
  public length: number;
  public head: LNode<T>|undefined; 
  public tail: LNode<T>|undefined; 

  constructor() {
    this.head = this.tail = undefined; 
    this.length = 0;
  }

  public prepend(value: T): void {
    let node = { value: value } as LNode<T>;
    this.length++;
    if(!this.head || !this.tail) {
      this.head = this.tail = node;
      return;
    }
    node.next = this.head;
    this.head.prev = node;
    this.head = node;
  }

  public insertAt(idx: number, value: T): void {
    if(idx < 0 || idx > this.length) throw new Error('invalid index given for insertAt.');
    if(idx === this.length) {
      this.append(value);
      return;
    }
    if(idx === 0) {
      this.prepend(value);
      return;
    }
    this.length++;
    let curr = this.getByIdx(idx);
    let node = { value: value } as LNode<T>;
    node.next = curr!.next;
    node.prev = curr;
    curr!.next!.prev = node;
    curr!.next = node;
  }

  public append(value: T): void {
    let node = { value: value } as LNode<T>;
    this.length++;
    if(!this.head || !this.tail) {
      this.head = this.tail = node;
      return;
    }
    node.prev = this.tail;
    this.tail.next = node;
    this.tail = node;
  }

  public toString(): string {
    if(!this.head || !this.tail) return '';
    let str = '';
    let curr: LNode<T> | undefined = this.head;
    for(let i = 0; curr && i < this.length; i++) {
      if(i > 0) str += ', ';
      str += curr.value;
      curr = curr.next;
    }
    return str;
  }

  public remove(value: T): void {
    let curr = this.head;
    for(let i = 0; curr && i < this.length; i++) {
      if(curr.value === value) break;
      curr = curr.next;
    }

    if(!curr) throw new Error('unable to remove the value');
    this.removeNode(curr);
  }

  public get(idx: number): T|void {
    if(idx < 0 || idx > this.length) throw new Error('invalid index given for get.');
    let node = this.getByIdx(idx);
    if(node) return node.value;
  }

  public removeAt(idx: number): void {
    if(idx < 0 || idx > this.length) throw new Error('invalid index given for get.');
    let curr = this.getByIdx(idx);
    if(!curr) throw new Error('value doesnt exist');
    this.removeNode(curr);
  }

  private getByIdx(idx: number): LNode<T>|undefined {
    let curr = this.head;
    for(let i = 0; curr && i < idx; i++) {
      curr = curr.next;
    }
    return curr;
  }

  private removeNode(curr: LNode<T>): void {
    this.length--;
    if(curr === this.head) {
      if(!curr.next || curr.next === this.head) {
        this.head = this.tail = undefined;
        return;
      }
      curr.next.prev = undefined;
      this.head = curr.next;
    }

    if(curr === this.tail) {
      if(!curr.prev) throw new Error('something went wrong');
      this.tail = curr.prev;
      this.tail.next = undefined;
    }
    curr.prev!.next = curr.next;
    curr.next!.prev = curr.prev;
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
    // sort all values based onnthe pivot value
    for(let i = lo; i < hi; i++) {
      if(arr[i] < pivot) {
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

  function sort(arr: Array<number>, lo: number, hi: number) {
    if(lo >= hi) return;

    const partIdx = partition(arr, lo, hi);
    sort(arr, partIdx + 1, hi);
    sort(arr, lo, partIdx - 1);
  }

  sort(arr, 0, arr.length - 1);
  return arr;
}

function MergeSort(arr: Array<number>) {
  function partition(arr: Array<number>, lo: number, hi: number): Array<number> {
    if(lo == hi) {
      if(arr[lo] !== undefined) return [arr[lo]];
      return [];
    }
    if(lo > hi) {
      return [];
    }
    let pivot = Math.round(lo + (hi - lo) * 0.5);

    // continue partitioning until returning the smallest slice, then merge and return them
    let left = partition(arr, lo, pivot - 1);
    let right = partition(arr, pivot, hi);

    return merge(left, right);
  }

  function merge(left: Array<number>, right: Array<number>): Array<number> {
    let arr = [];

    while(left.length && right.length) {
      if(left[0] < right[0]) {
        arr.push(left.shift());
      } else {
        arr.push(right.shift());
      }
    }

    return [...arr, ...left, ...right] as Array<number>;

  }

  return partition(arr, 0, arr.length);
}

function time(fn: () => void) {
  const start = Date.now();
  fn();
  return Date.now() - start;
}

let list = new DoublyLinkedList();
list.append(3);
console.log('append 3: ' + list.toString());
list.append(4);
console.log('append 4: ' + list.toString());
list.prepend(1);
console.log('prepend 1: ' + list.toString());
list.prepend(0);
console.log('prepend 0: ' + list.toString());
list.insertAt(1, 2);
console.log('insert 1 at idx 1: ' + list.toString());
console.log('get at idx 3: ' + list.get(3));
list.remove(2);
console.log('remove 2: ' + list.toString());
list.removeAt(2);
console.log('remove at idx 2: ' + list.toString());
