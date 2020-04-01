const BinarySearchTree = require('./bstree');

// 3. Create a binary search tree called BST and insert 3,1,4,6,9,2,5,7 into your tree.
// Create a binary search tree called BST and insert E A S Y Q U E S T I O N into your tree. Compare your results with the results from the 1st exercise.
const BST = new BinarySearchTree();
const BST2 = new BinarySearchTree();

BST.insert(3, 3);
BST.insert(1, 1);
BST.insert(4, 4);
BST.insert(6, 6);
BST.insert(9, 9);
BST.insert(2, 2);
BST.insert(5, 5);
BST.insert(7, 7);
console.log(BST);

// BST2.insert('E', 'E');
// BST2.insert('A', 'A');
// BST2.insert('S', 'S');
// BST2.insert('Y', 'Y');
// BST2.insert('Q', 'Q');
// BST2.insert('U', 'U');
// BST2.insert('E', 'E');
// BST2.insert('S', 'S');
// BST2.insert('T', 'T');
// BST2.insert('I', 'I');
// BST2.insert('O', 'O');
// BST2.insert('N', 'N');
// console.log(BST2);

// 4. What does this program do?
function tree(t){
    if(!t){
        return 0;
    }
    return tree(t.left) + t.value + tree(t.right)
}

// Program takes a binary search tree and adds all of its nodes' values together.
// First checks left branch of root node and returns zero if the node's left or right branch is null.
// console.log(tree(BST)); // 7+9+5+6+4+2+1+3 = 37
// The runtime depends on the binary search tree. If it is balanced on both
// left and right sides, then average case would be logarithmic O(log n).
// When there are more nodes on one side, then it would be more linear O(n) trying to reach the end or leaf nodes.

// 5. Height of a BST
function heightOfBST(tree) {
    let leftHeight = 0;
    let rightHeight = 0;

    if (!tree) {
        return 0;
    } else {
        leftHeight = heightOfBST(tree.left);
        rightHeight = heightOfBST(tree.right);
        if (leftHeight > rightHeight) {
            return leftHeight + 1;
        } else {
            return rightHeight + 1;
        }
    }
}

// console.log(heightOfBST(BST)); // height = 5, Run time is Linear O(n) because it is going through all the nodes.

// 6. Is it a BST?
function checkBST(tree) {
    if (!tree.key) {
        return false;
    }

    if (tree.left && tree.right) {
        checkBST(tree.left);
        checkBST(tree.right);
    }

    if (tree.left) {
        if (tree.key > tree.left.key) {
            return checkBST(tree.left);
        } else {
            return false;
        }   
    } 
    
    if (tree.right) {
        if (tree.key < tree.right.key) {
            return checkBST(tree.right);
        } else {
            return false;
        }
    }

    if (!tree.left && !tree.right) {
        return true;
    }
    
}
// need to check if left branch node is lower value than right branch node.
// console.log(checkBST(BST));

// 7. 3rd largest node
let arr = [];
function thirdLargestNode(tree) {
    if (!tree) {
        return false;
    }
    arr.push(tree.key);
    if (tree.left) {
        arr = thirdLargestNode(tree.left);
    }
    if (tree.right) {
        arr = thirdLargestNode(tree.right);
    }
    return arr;
}

function getThird(tree) {
    let treeArray = thirdLargestNode(tree);
    treeArray.sort((a, b) => b - a); // largest -> smallest
    return treeArray[2]; // third item in array
}
// console.log(getThird(BST)); // 6

// 8. Balanced BST
function balancedBST(tree, count = 0) {
    if (!tree) {
        return count;
    }
    
    count++;
    let left = 0;
    let right = 0;
    // go to left and counting nodes
    left = balancedBST(tree.left, count);
    if (left === false) {
        return false;
    }
    // go to right and count nodes
    right = balancedBST(tree.right, count);
    if (right === false) {
        return false;
    }
    // if left or right is greater than 1 false, else true
    return Math.abs(left - right) > 1 ? false : true;

}

// console.log(balancedBST(BST)); // false

// 9. Are they the same BSTs?

function checkSameTree(list1, list2) {
    // first number is root, if not the same number then return false
    if (list1[0] !== list2[0]) return false;
    // check list length and make sure they are the same
    if (list1.length !== list2.length) return false;
    // base case for recursive calls
    if (list1.length === 1 && list2.length === 1) return true;

    let root = list1[0];
    let leftList1 = [];
    let rightList1 = [];
    let leftList2 = [];
    let rightList2 = [];

    for (let i = 1; i < list1.length; i++) {
        if (list1[i] < root) {
            leftList1.push(list1[i])
        } else if (list1[i] > root) {
            rightList1.push(list1[i])
        }

        if (list2[i] < root) {
            leftList2.push(list2[i])
        } else if (list2[i] > root) {
            rightList2.push(list2[i])
        }
    }
    return checkSameTree(leftList1, leftList2) && checkSameTree(rightList1, rightList2);
}

let l1 = [3, 5, 4, 6, 1, 0, 2];
let l2 = [3, 1, 5, 2, 4, 6, 0];
console.log(checkSameTree(l1, l2)); // true

let l3 = [3, 5, 4, 6, 1, 0, 2];
let l4 = [3, 1, 5, 7, 4, 6, 0];
console.log(checkSameTree(l3, l4)); // false