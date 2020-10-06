// Javaで開発しましょう。
import java.util.HashMap;

class Main{
    public static void main(String[] args){
        int[] sampleList = {3,10,23,3,4,50,2,3,4,18,6,1,-2};
        System.out.println(existsWithnList(sampleList, 23));
        System.out.println(existsWithnList(sampleList, -2));
        System.out.println(existsWithnList(sampleList, 100));
    }
    public static boolean existsWithnList(int[] listL, int dataY){
        HashMap<Integer, Integer> hash_map = new HashMap<>();
        for(int i = 0; i < listL.length; i++){
            hash_map.put(listL[i], listL[i]);
        }
        return (hash_map.get(dataY) != null) ? true : false; 
    }
}