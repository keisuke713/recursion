import java.util.Random;

class BinaryTree{
    public int data;
    public BinaryTree left;
    public BinaryTree right;

    public BinaryTree(int data){
        this.data = data;
    }
}

class BinarySearchTree{
    public BinaryTree root;

    public BinarySearchTree(int[] arr){
        this.root = new BinaryTree(arr[0]);
        this.notSortedArrToBST(arr);
    }
    public void notSortedArrToBST(int[] arr){
        for(int i=1; i<arr.length; i++){
            insert(arr[i]);
            // 挿入されたノードの親ノード取得
            BinaryTree iterator = searchParentNode(arr[i]);
            // 親ノードの更に親を取得
            BinaryTree iteratorParent = searchParentNode(iterator.data);
            while(iterator != null){
                // 左右の部分木の深さの差を確認
                int leftDepth = maxDepth(iterator.left);
                int rightDepth = maxDepth(iterator.right);
                int diffDepth = leftDepth - rightDepth;
                // 差が2以上だったら左→右へ回転
                if(diffDepth >= 2) {
                    if(iteratorParent == null) {
                        this.root = rotateLtoR(iterator);
                    } else {
                        if(iteratorParent.data > iterator.data) iteratorParent.left = rotateLtoR(iterator);
                        else iteratorParent.right = rotateLtoR(iterator);
                    }
                }
                // 差が-2以下だったら右→左へ回転
                if(diffDepth <= -2) {
                    if(iteratorParent == null) {
                        this.root = rotateRtoL(iterator);
                    } else {
                        if(iteratorParent.data > iterator.data) iteratorParent.left = rotateRtoL(iterator);
                        else iteratorParent.right = rotateRtoL(iterator);
                    }
                }
                if(iteratorParent == null) break;
                iterator = iteratorParent;
                iteratorParent = searchParentNode(iterator.data);
            }
        }
    }
    // 左から右へ回転
    public BinaryTree rotateLtoR(BinaryTree root){
        // System.out.println("################" + root.data);
        BinaryTree child = root.left;
        root.left = null;
        if(child.right != null) root.left = child.right;
        child.right = root;
        return child;
    }
    // 右から左へ回転
    public BinaryTree rotateRtoL(BinaryTree root){
        BinaryTree child = root.right;
        root.right = null;
        if(child.left != null) root.right = child.left;
        child.left = root;
        return child;
    }
    //引数のデータを左右どちらかの部分木に持つノードを返す
    public BinaryTree searchParentNode(int data){
        if(root.data == data) return null; 
        return searchParentNodeHelper(root, data);
    }
    public BinaryTree searchParentNodeHelper(BinaryTree root, int data){
        if(root.left != null && root.left.data == data) return root;
        if(root.right != null && root.right.data == data) return root;

        if(root.data > data) return searchParentNodeHelper(root.left, data);
        if(root.data < data) return searchParentNodeHelper(root.right, data);
        return null;
    }
    //対象のデータをBSTに挿入
    public void insert(int data){
        if(this.isExist(data)) return;
        insertHelper(this.root, data);
    }
    public void insertHelper(BinaryTree root, int data){
        if(root != null){
            if(root.data > data){
                if(root.left == null) root.left = new BinaryTree(data);
                else insertHelper(root.left, data);
            }else{
                if(root.right == null) root.right = new BinaryTree(data);
                else insertHelper(root.right, data);
            }
        }
    }
    //対象のデータを持つノードが既に存在するか確認
    public boolean isExist(int data){
        return isExistHelper(this.root, data);
    }
    public boolean isExistHelper(BinaryTree root, int data){
        if(root != null){
            if(root.data == data) return true;
            if(root.data > data) return isExistHelper(root.left, data);
            else return isExistHelper(root.right, data); 
        }else{
            return false;
        }
    }
    //ノードを昇順に表示
    public void inOrder(){
        inOrderHelper(this.root);
    }
    public void inOrderHelper(BinaryTree root){
        if(root != null){
            inOrderHelper(root.left);
            System.out.println(root.data);
            inOrderHelper(root.right);
        }
    }
    //引数のノードを根とした部分木の最大の深さを返す
    public int maxDepth(BinaryTree root){
        if(root == null) return 0;
        return maxDepthHelper(root, 1, 1);
    }
    public int maxDepthHelper(BinaryTree root, int tmpDepth, int maxDepth){
        if(root.left == null && root.right == null) return tmpDepth;

        int tmpMaxDepth;
        if(root.left != null){
            tmpMaxDepth = maxDepthHelper(root.left, tmpDepth+1, maxDepth);
            if(tmpMaxDepth > maxDepth) maxDepth = tmpMaxDepth;
        }
        if(root.right != null){
            tmpMaxDepth = maxDepthHelper(root.right, tmpDepth+1, maxDepth);
            if(tmpMaxDepth > maxDepth) maxDepth = tmpMaxDepth;
        }

        return maxDepth;
    }
}

// ランダムな配列を作成
class RandomContainer{
    public static int[] generateRandomArr(int length){
        int[] arr = new int[length];
        for(int i=0; i<length; i++){
            arr[i] = i+1;
        }
        Random random = new Random();
        for(int i=0; i<arr.length; i++){
            int randomInt = random.nextInt(arr.length-1);
            int tmp = arr[randomInt];
            arr[randomInt] = arr[i];
            arr[i] = tmp;
        }
        return arr;
    }
}

public class Main{
    public static void main(String[] args){
        BinarySearchTree binaryTree = new BinarySearchTree(RandomContainer.generateRandomArr((int)Math.pow(2,5)));
        binaryTree.inOrder();
        System.out.println("Max depth is :" + binaryTree.maxDepth(binaryTree.root));
    }
}