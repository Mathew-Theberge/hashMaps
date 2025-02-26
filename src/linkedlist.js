export class LinkedList {
  constructor() {
    this.head = null;
    this.listSize = 0;
  }
  append(value) {
    let newNode = new Node(value);
    let node = this.head;
    if (this.head === null) {
      this.head = newNode;
    } else {
      while (node.nextNode !== null) {
        node = node.nextNode;
      }
      node.nextNode = newNode;
    }
    this.listSize++;
  }

  prepend(value) {
    this.head = new Node(value, this.head);
    this.listSize++;
  }

  size() {
    return this.listSize;
  }

  showHead() {
    return this.head;
  }

  tail() {
    let tempNode = this.head;
    while (tempNode.nextNode !== null) {
      tempNode = tempNode.nextNode;
    }
    return tempNode;
  }

  at(index) {
    let tempNode = this.head;
    let i = 0;
    while (i < index) {
      tempNode = tempNode.nextNode;
      i++;
    }
    return tempNode;
  }

  pop() {
    let tempNode = this.head;
    while (tempNode.nextNode !== null) {
      if (tempNode.nextNode.nextNode === null) {
        tempNode.nextNode = null;
        break;
      } else {
        tempNode = tempNode.nextNode;
      }
    }
    this.listSize--;
  }

  contains(value) {
    let tempNode = this.head;
    while (tempNode.nextNode !== null) {
      if (tempNode.value === value) {
        return true;
      }
      tempNode = tempNode.nextNode;
    }
    if (tempNode.value === value) {
      return true;
    }
    return false;
  }

  find(value) {
    let tempNode = this.head;
    let index = 0;
    while (tempNode.nextNode !== null) {
      if (tempNode.value === value) {
        return index;
      }
      tempNode = tempNode.nextNode;
      index++;
    }
    if (tempNode.value === value) {
      return index;
    }
    return null;
  }

  toString() {
    let tempNode = this.head;
    let string = "";
    let index = 0;
    while (index < this.listSize) {
      string += `( ${tempNode.value} ) -> `;
      tempNode = tempNode.nextNode;
      index++;
    }
    return string + "null";
  }

  insertAt(value, index) {
    if (index === 0) {
      this.prepend(value);
      return;
    }
    let currentNode = this.at(index);
    let prevNode = this.at(index - 1);
    prevNode.nextNode = new Node(value, currentNode);
    this.listSize++;
  }

  remove(index) {
    if (index === this.listSize - 1) {
      this.pop();
      return;
    } else if (index === 0) {
      this.head = this.head.nextNode;
    }
    let nextNode = this.at(index + 1);
    let prevNode = this.at(index - 1);
    prevNode.nextNode = new Node(nextNode.value, nextNode.nextNode);
    this.listSize--;
  }
}

class Node {
  constructor(value = null, nextNode = null) {
    this.value = value;
    this.nextNode = nextNode;
  }
}
