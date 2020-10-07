import java.util.ArrayList;
import java.util.HashMap;

class Main{
    public static void main(String[] args){
        int[] targetList1 = {1,2,3,4,5,6};
        int[] searchList1 = {1,4,4,5,8,9,10,11};
        System.out.println(listIntersection(targetList1, searchList1));

        int[] targetList2 = {3,4,5,10,2,20,4,5};
        int[] searchList2 = {4,20,22,2,2,2,10,1,4};
        System.out.println(listIntersection(targetList2, searchList2));
        
        int[] targetList3 = {2,3,4,54,10,5,9,11};
        int[] searchList3 = {3,10,23,10,0,5,9,2};
        System.out.println(listIntersection(targetList3, searchList3));
    }
    public static ArrayList<Integer> listIntersection(int[] targetList, int[] searchList){
        HashMap<Integer, Integer> hashmap = new HashMap<>();
        ArrayList<Integer> results = new ArrayList<>();
        for(int i = 0; i < targetList.length; i++){
            hashmap.put(targetList[i], targetList[i]);
        }
        for(int i = 0; i < searchList.length; i++){
            if(hashmap.get(searchList[i]) != null) results.add(searchList[i]);
        }

        return results;
    }
}