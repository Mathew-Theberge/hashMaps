import { LinkedList } from "./linkedlist.js";

class HashSet {
  constructor() {
    this.loadFactor = 0.75;
    this.capacity = 16;
    this.buckets = new Array(16);
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }
    return hashCode;
  }

  set(key) {
    const index = this.hash(key);

    if (this.buckets[index] instanceof LinkedList) {
      if (this.isKeyEqual(key) !== null) {
        console.log("key already exists in hashSet");
      } else {
        this.buckets[index].append(key);
      }
    } else {
      this.buckets[index] = new LinkedList();
      this.buckets[index].append(key);
    }
    if (this.capacity * this.loadFactor < this.length()) {
      console.log(`load levels are too high`);
      this.growArray();
    }
    console.log(
      `load levels ${this.length()}/${this.capacity * this.loadFactor}`,
    );
  }

  growArray() {
    this.capacity *= 2;
    const currentArrayCopy = this.buckets;
    this.buckets = new Array(this.capacity);
    console.log(`growing array to ${this.capacity} buckets`);
    currentArrayCopy.forEach((bucket) => {
      if (bucket instanceof LinkedList && bucket.head !== null) {
        let node = bucket.head;
        for (let i = 0; i < bucket.listSize; i++) {
          this.set(node.value);
          node = node.nextNode;
        }
      }
    });
  }

  isKeyEqual(key) {
    const index = this.hash(key);
    let node = this.buckets[index].head;
    for (let i = 0; i < this.buckets[index].listSize; i++) {
      if (node.value === key) {
        return node;
      }
      node = node.nextNode;
    }
    return null;
  }

  length() {
    let length = 0;
    this.buckets.forEach((bucket) => {
      if (bucket instanceof LinkedList && bucket.head !== null) {
        let node = bucket.head;
        for (let i = 0; i < bucket.listSize; i++) {
          length++;
          node = node.nextNode;
        }
      }
    });
    return length;
  }

  clear() {
    this.capacity = 16;
    this.buckets = new Array(this.capacity);
  }

  keys() {
    let keys = [];
    this.buckets.forEach((bucket) => {
      if (bucket instanceof LinkedList && bucket.head !== null) {
        let node = bucket.head;
        for (let i = 0; i < bucket.listSize; i++) {
          keys.push(node.value);
          node = node.nextNode;
        }
      }
    });
    return keys;
  }

  get(key) {
    const index = this.hash(key);

    if (this.buckets[index] instanceof LinkedList) {
      let node = this.isKeyEqual(key);
      if (node !== null) return node.value;
    } else return null;
  }

  has(key) {
    if (this.get(key) !== null) return true;
    else return false;
  }

  remove(key) {
    if (this.has(key)) {
      const index = this.hash(key);
      let node = this.buckets[index].head;
      for (let i = 0; i < this.buckets[index].listSize; i++) {
        if (node.value === key) {
          console.log(`deleting ${node.value}`);
          this.buckets[index].remove(i);
          console.log(
            `load levels ${this.length()}/${this.capacity * this.loadFactor}`,
          );
          return true;
        }
        node = node.nextNode;
      }
    }
    return false;
  }
}

const test = new HashSet();

test.set("frog");
test.set("parrot");
test.set("cat");
test.set("dog");
test.set("goose");
test.set("bird");
test.set("eagle");
test.set("penguin");
test.set("frog");
test.set("parrot");
test.set("ct");
test.set("do");
test.set("gose");
test.set("brd");
test.set("eale");
test.set("peguin");
test.set("frg");
test.set("parot");

console.log(test.keys());

test.remove("bird");

console.log(test.keys());

console.log(test.get("frog"));
// console.log(test.buckets);
