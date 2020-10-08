import java.util.HashMap;
class Main{
    public static void main(String[] args){
        int[] arr1 = {1,1,1,1,1,2,2,2,2,2,2,3,3,3,4,5,6,6,6,6,7,8,8,8,9,9,9};
        printDuplicates(arr1);
        int[] arr2 = {7,7,6,6,3,5,3,9,2,5,5,4,6,4,1,4,1,7,2};
        printDuplicates(arr2);
    }
    public static void printDuplicates(int[] inputList){
        HashMap<Integer, Integer> hashmap = new HashMap<>();

        for(int i = 0; i < inputList.length; i++){
            if(hashmap.get(inputList[i]) == null){
                hashmap.put(inputList[i], 1);
            }else{
                hashmap.replace(inputList[i], hashmap.get(inputList[i]) + 1);
            }
        }

        System.out.println(hashmap.keySet());

        for(Integer key : hashmap.keySet()){
            System.out.println(String.valueOf(key) + " has " + String.valueOf(hashmap.get(key)) + " duplicates.");
        }
    }
}