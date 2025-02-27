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
}

const test = new HashMap();

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("grape", "purpl");
test.set("hat", "black");
test.set("hat", "whie");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

console.log(test.buckets);

console.log(test.buckets[6]);
console.log(test.has("grape"));
console.log(test.has("pink"));
console.log(test.get("frog"));

console.log(test.buckets[11].toString());

test.buckets.forEach((bucket) => {
  if (bucket instanceof LinkedList) {
    console.log(bucket.toString());
  }
});
