class BinarySearchTree {
    // represents a single node in the tree
    constructor(key = null, value = null, parent = null) {
        this.key = key; // if key = null, then object represents empty tree
        this.value = value;
        this.parent = parent; // each node has a parent except for root node
        this.left = null; // point to left child node
        this.right = null; // point to right child 
        // node starts with left and right pointers to their children being null
    }
    // bst support insert, remove, and find
    insert(key, value) {
        // tree is empty, set root node
        if (this.key == null) {
            this.key = key;
            this.value = value
        } else if (key < this.key) { // left branch
            /* If the existing node does not have a left child, 
               meaning that if the `left` pointer is empty, 
               then we can just instantiate and insert the new node 
               as the left child of that node, passing `this` as the parent */
            if (this.left == null) {
                this.left = new BinarySearchTree(key, value, this);
            } else {
                /* If the node has an existing left child, 
               then we recursively call the `insert` method 
               so the node is added further down the tree */
                this.left.insert(key, value);
            }
        } else { // right branch
            if (this.right == null) {
                this.right = new BinarySearchTree(key, value, this);
            } else {
                this.right.insert(key, value);
            }
        }
    }

    find(key) {
        // if key is equal to the root
        if (this.key === key) {
            return this.value;
        } else if (key < this.key && this.left) {
           /* If the item you are looking for is less than the root 
           then follow the left child.
           If there is an existing left child, 
           then recursively check its left and/or right child
           until you find the item */
            return this.left.find(key);
        } else if (key > this.key && this.right) {
            return this.right.find(key);
        } else {
            throw new Error('Key Error');
        }
    }

    remove(key) {
        if (this.key == key) {
            if (this.left && this.right) {
                const successor = this.right._findMin();
                this.key = successor.key;
                this.value = successor.value;
                successor.remove(successor.key);
            } else if (this.left) {
                this._replaceWith(this.left);
            } else if (this.right) {
                this._replaceWith(this.right);
            } else {
                this._replaceWith(null);
            }
        } else if (key < this.key && this.left) {
            this.left.remove(key);
        } else if (key > this.key && this.right) {
            this.right.remove(key);
        } else {
            throw new Error('Key Error');
        }
    }

    _replaceWith(node) {
        if (this.parent) {
            if (this == this.parent.left) {
                this.parent.left = node
            } else if (this == this.parent.right) {
                this.parent.right = node;
            }

            if (node) {
                node.parent = this.parent;
            }
        } else {
            if (node) {
                this.key = node.key;
                this.value = node.value;
                this.left = node.left;
                this.right = node.right;
            } else {
                this.key = null;
                this.value = null;
                this.left = null;
                this.right = null;
            }
        }
    }

    _findMin() {
        if (!this.left) {
            return this;
        }
        return this.left._findMin();
    }
}