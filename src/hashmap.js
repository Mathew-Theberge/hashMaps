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

  matchKeys(key) {
    let i = 0;
    const index = this.hash(key);
    let tempNode = this.buckets[index].head;
    while (this.buckets[index].listSize > i) {
      if (tempNode.value[0] === key) {
        return tempNode;
      }
      tempNode = tempNode.nextNode;
      i++;
    }
  }

  set(key, value) {
    const index = this.hash(key);

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    if (this.buckets[index] !== undefined) {
      // we check if the index is a linkedlist because our hashmap
      //   allows for single peices of data inside a bucket to not
      // require a linked list

      if (this.buckets[index] instanceof LinkedList) {
        const matchedKey = this.matchKeys(key);
        if (matchedKey !== undefined) {
          console.log(`updating key: ${key} to value: ${value}`);
          matchedKey.value = [key, value];
        } else {
          this.buckets[index].append([key, value]);
        }
      }
      // this else clause is here to let buckets with 1 peice of data
      // to not need linkedlist objects to store the single element
      // of data but if a collision does occur a linkedlist obj is created
      // and the old and incoming data is put into the linkedlist
      else {
        if (this.buckets[index][0] === key) {
          console.log(`updating key: ${key} to value: ${value}`);
          this.buckets[index] = [key, value];
        } else {
          const oldValue = this.buckets[index];
          this.buckets[index] = new LinkedList();
          this.buckets[index].append(oldValue);
          this.buckets[index].append([key, value]);
        }
      }
    } else {
      this.buckets[index] = [key, value];
    }
  }

  get(key) {
    const index = this.hash(key);
    if (this.buckets[index] === undefined) return null;

    if (this.buckets[index] instanceof LinkedList) {
      let matchedKey = this.matchKeys(key);
      if (matchedKey !== undefined) return matchedKey.value[1];
    } else if (this.buckets[index][0] === key) {
      return this.buckets[index][1];
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
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");
console.log(test.buckets);

console.log(test.buckets[6]);
console.log(test.has("grape"));
console.log(test.has("pink"));

console.log(test.buckets[11].toString());
