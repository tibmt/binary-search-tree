function Node(key, value) {
    this.key = key;
    this.value = value;

    this.left = null;
    this.right = null;

}

function BinarySearchTree() {

    this._root = null;
    this.arrValue = [];
    this.arrKey = [];

    this.root = function () {
        if(this._root == null){
            return null
        }
        return this._root.value;
    };
    
    this.insert = function (key, value) {
        let node = new Node(key, value);
        if(!this._root){
            this._root = node;
        }
        let current = this._root;
        while(current){
            if(node.key < current.key){
                if(!current.left){
                    current.left = node;
                    break;
                }
                current = current.left;
            } else if(node.key > current.key){
                if(!current.right){
                    current.right = node;
                    break;
                }
                current = current.right;
            } else {
                break
            }
        }
        return this
    };

    let that = this;

    this.delete = function (key) {
        let removeNode = function(node, key) {
            if(!node) {
                return null;
            }
            if(key === node.key) {
                if(!node.left && !node.right) {
                    return null;
                }
                if(!node.left) {
                    return node.right;
                }
                if(!node.right) {
                    return node.left;
                }
                let temp = that.getMin(node.right);
                node.key = temp.key;
                node.value = temp.value;
                node.right = removeNode(node.right, temp.key);
                return node;

            } else if(key < node.key) {
                node.left = removeNode(node.left, key);
                return node;
            } else {
                node.right = removeNode(node.right, key);
                return node;
            }
        };
        this._root = removeNode(this._root, key);
        return this
    };
    
    this.getMin = function (node) {
        if(!node) {
            node = this._root;
        }
        while(node.left) {
            node = node.left;
        }
        return node;
    };

    this.search = function (key) {
        if(this._root.key == key){
            return this._root.value;
        }
        if(key < this._root.key){
            if(this._root.left == null) return null;
            this._root = this._root.left;
            return this.search(key);
        } else {
            if(this._root.right == null) return null;
            this._root = this._root.right;
            return this.search(key);
        }
    };

    this.contains = function (value) {
        this.traverse(true);
        return this.arrValue.some((index) => index == value)
    };

    this.traverse = function (param) {
        if(param == true){
            let current = this._root;
            this.inOrder(current, this.fn);
            return this.arrValue;
        }
        if(param == false){
            let current = this._root;
            this.inOrder(current, this.fn);
            return this.arrValue.reverse();
        }
    };

    this.inOrder = function(node, fn){
        if(node) {
            this.inOrder(node.left, this.fn);
            if(this.fn) {
                this.fn(node);
            }
            this.inOrder(node.right, this.fn);
        }
    };
    
    this.fn = function (node) {
        this.arrKey.push(node.key);
        this.arrValue.push(node.value);
    };

    this.verify = function () {
        this.traverse(true);
        let count = 0;
        for(let i = 0; i < this.arrKey.length - 1; i++){
            if(this.arrKey[i] > this.arrKey[i + 1]){
                count++;
            }
        }
        return !count
    }

}

const bst = new BinarySearchTree();


module.exports = {
  BinarySearchTree,

  //WARNING!!!
  //PROVIDE BST STRUCTURE FOR TESTS {STRING}
  root: '_root',
  left: 'left',
  right: 'right',
  //NAME FOR REPORTS
  student: 'Pavel Yukhnevich'
};
