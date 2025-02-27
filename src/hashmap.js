import { LinkedList } from "./linkedlist.js";

class HashMap {
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

  isKeyEqual(key) {
    const index = this.hash(key);
    let node = this.buckets[index].head;
    for (let i = 0; i < this.buckets[index].listSize; i++) {
      if (node.value[0] === key) {
        return node;
      }
      node = node.nextNode;
    }
    return null;
  }

  set(key, value) {
    const index = this.hash(key);

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    if (this.buckets[index] instanceof LinkedList) {
      const node = this.isKeyEqual(key);
      if (node !== null) {
        console.log(`updating key: ${key} to value: ${value}`);
        node.value = [key, value];
      } else {
        this.buckets[index].append([key, value]);
      }
    } else {
      this.buckets[index] = new LinkedList();
      this.buckets[index].append([key, value]);
    }
  }

  get(key) {
    const index = this.hash(key);

    if (this.buckets[index] instanceof LinkedList) {
      let node = this.isKeyEqual(key);
      if (node !== null) return node.value[1];
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
        if (node.value[0] === key) {
          console.log(`deleting ${node.value}`);
          this.buckets[index].remove(i);
          return true;
        }
        node = node.nextNode;
      }
    }
    return false;
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
}

const test = new HashMap();

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("test", "1");
test.set("testt", "2");
test.set("testtt", "3");
test.set("testttt", "4");
test.set("tes", "5");
test.set("te", "6");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

console.log(test.length());

test.remove("frog");

console.log(test.length());

test.set("frog", "green");

console.log(test.length());

test.buckets.forEach((bucket) => {
  if (bucket instanceof LinkedList) {
    console.log(bucket);
    console.log(bucket.toString());
  }
});
