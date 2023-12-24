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
