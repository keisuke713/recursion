import java.util.HashMap;

class LRUCache<K, V>{
    private int capacity;
    private HashMap<K, V> cache;
    private LinkedList<K> keys;

    public LRUCache(int capacity){
        this.capacity = setCapacity(capacity);
        this.cache = new HashMap<>();
        this.keys = new LinkedList<>();
    }

    public int setCapacity(int capacity){
        return capacity > 0 ? capacity : 1;
    }
    public HashMap<K, V> getCache(){
        return cache;
    }
    public LinkedList<K> getKeys(){
        return keys;
    }
    public V get(K key){
        if(cache.get(key)==null) return null;
        keys.moveElementToTail(key);
        return cache.get(key);
    }
    public void put(K key, V value){
        if(cache.get(key)!=null){
            cache.replace(key, value);
            keys.moveElementToTail(key);
            return;
        }

        if(cache.size()<capacity){
            cache.put(key,value);
            keys.add(new Node<>(key));
            return;
        }

        Node<K> tmpNode = keys.poll();
        cache.remove(tmpNode.getData());
        cache.put(key, value);
        keys.add(new Node<K>(key));
    }
    public String toString(){
        return "cache: " + cache + ", keys: " + keys;
    }
}
class Node<E>{
    private E data;
    private Node<E> prev=null;
    private Node<E> next=null;

    public Node(E data){
        this.data = data;
    }
    public E getData(){
        return data;
    }
    public Node<E> getPrevNode(){
        return prev;
    }
    public Node<E> getNextNode(){
        return next;
    }
    public void setPrevNode(Node<E> node){
        prev = node;
    }
    public void setNextNode(Node<E> node){
        next = node;
    }
    public String toString(){
        return "data: " + data;
    }
}
class LinkedList<E>{
    private Node<E> head=null;
    private Node<E> tail=null;

    public Node<E> getHead(){
        return head;
    }
    public Node<E> getTail(){
        return tail;
    }
    public void add(Node<E> node){
        if(head==null){
            head = node;
            tail = head;
            return;
        }
        if(head == tail){
            tail = node;
            head.setNextNode(tail);
            tail.setPrevNode(head);
            return;
        }
        tail.setNextNode(node);
        tail.getNextNode().setPrevNode(tail);
        tail = node;
    }
    public void moveElementToTail(E data){
        if(tail.getData() == data) return;
        if(head.getData() == data){
            Node<E> tmpNode = head;
            head = head.getNextNode();
            head.setPrevNode(null);

            setElementAsTail(tmpNode);
            return;
        }
        Node<E> iterator = head;
        while(iterator != null){
            if(iterator.getData() == data){
                iterator.getPrevNode().setNextNode(iterator.getNextNode());
                iterator.getNextNode().setPrevNode(iterator.getPrevNode());

                setElementAsTail(iterator);
                break;
            }
            iterator = iterator.getNextNode();
        }
    }
    public Node<E> poll(){
        if(head == null) return null;
        if(head == tail){
            Node<E> tmpNode = head;
            head = null;
            tail = null;
            return tmpNode;
        }
        Node<E> tmpNode = head;
        head = head.getNextNode();
        tmpNode.setNextNode(null);
        head.setPrevNode(null);
        return tmpNode;
    }
    public void setElementAsTail(Node<E> node){
        node.setPrevNode(tail);
        tail.setNextNode(node);
        tail = node;
        node.setNextNode(null);
    }
    public String toString(){
        if(head == null) return "";
        Node<E> iterator = head;
        String result = String.valueOf(iterator.getData());
        iterator = iterator.getNextNode();
        while(iterator != null){
            result += " , ";
            result += String.valueOf(iterator.getData());
            iterator = iterator.getNextNode();
        }
        return result;
    }
}
public class Main{
    public static void main(String[] args){
        LRUCache<Integer, Integer> cache = new LRUCache<>(3);
        cache.put(1,5);
        cache.put(2,5);
        cache.put(3,5);
        cache.put(2,10);
        cache.put(4,10);
        cache.put(1,11);
        cache.put(5,1);
        cache.put(6,3);
        cache.put(1,2);
        System.out.println(cache);
    }
}