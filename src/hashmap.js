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
          this.set(node.value[0], node.value[1]);
          node = node.nextNode;
        }
      }
    });
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
          keys.push(node.value[0]);
          node = node.nextNode;
        }
      }
    });
    return keys;
  }

  values() {
    let values = [];
    this.buckets.forEach((bucket) => {
      if (bucket instanceof LinkedList && bucket.head !== null) {
        let node = bucket.head;
        for (let i = 0; i < bucket.listSize; i++) {
          values.push(node.value[1]);
          node = node.nextNode;
        }
      }
    });
    return values;
  }

  entries() {
    let keysWithValues = [];
    this.buckets.forEach((bucket) => {
      if (bucket instanceof LinkedList && bucket.head !== null) {
        let node = bucket.head;
        for (let i = 0; i < bucket.listSize; i++) {
          keysWithValues.push([node.value[0], node.value[1]]);
          node = node.nextNode;
        }
      }
    });
    return keysWithValues;
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
test.set("ie cream", "white");
test.set("jace", "pink");
test.set("lin", "golden");
test.set("banana", "yellow");
test.set("carot", "orange");
test.set("do", "brown");
test.set("elphant", "gray");
test.set("frog", "green");
test.set("grpe", "purple");
test.set("tst", "1");
test.set("stt", "2");
test.set("tettt", "3");
test.set("testtt", "4");
test.set("ts", "5");
test.set("te", "6");
test.set("grap", "purple");
test.set("ht", "black");
test.set("ie cream", "white");
test.set("jaket", "blue");
test.set("kie", "pink");
test.set("lin", "golden");
test.set("grpe", "purple");
test.set("t", "black");
test.set("ie crem", "white");
test.set("jace", "pink");
test.set("lin", "golden");
test.set("banaa", "yellow");
test.set("caot", "orange");

test.remove("caot");
test.set("caot", "orange");

// console.log(test.buckets);

console.log(test.entries());
