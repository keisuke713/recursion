import java.util.HashMap;
import java.util.Objects;
import java.util.Date;
import java.text.SimpleDateFormat;
import java.text.ParseException;

interface SeatInterface {

    //----------------------------------------------------------------
    //          ENUMERATED TYPES
    //----------------------------------------------------------------
    public enum MealType {GOURMET, FULL, SNACK}
    
    //----------------------------------------------------------------
    //          CONSTRUCTOR REQUIREMENTS
    //----------------------------------------------------------------
    // Seat constructor should take, in this order:
    // seat number (string)
    // price (double)
    // recline (integer)
    // meal type (enumerated type)

    public String getNumber();
    public double getPrice();
    public int getRecline();
    public MealType getMealType();

    /**
     * Sets the price for this seat
     * 
     * @param   price   the price for this seat
     */
    public void setPrice(double price);

    /**
     * Sets the recline for this seat
     * 
     * @param   recline     the number of inches this seat reclines
     */
    public void setRecline(int recline);

    /**
     * Sets the meal type for this seat
     * 
     * @param   mealType    the meal type assigned to this seat; must not be null
     */
    public void setMealType(MealType mealType);

}

class Seat implements SeatInterface {
    public enum MealType {GOURMET, FULL, SNACK}
    // Seat constructor should take, in this order:
    // seat number (string)
    // price (double)
    // recline (integer)
    // meal type (enumerated type)
    private String seatNumber;
    private double price;
    private int recline;
    private MealType mealType;

    public Seat(String seatNumber){
        this.seatNumber = setSeatNumber(seatNumber);
        // this.price = price;
        // this.recline = recline;
        // this.mealType = mealType;
    }

    @Override
    public String getNumber(){
        return seatNumber;
    }

    @Override
    public double getPrice(){
        return price;
    }

    @Override
    public int getRecline(){
        return recline;
    }
    
    /**
     * Retrieves the meal type for this seat
     *
     * @return     the meal type for this seat
     */
    public MealType getMealType(){
        return mealType;
    }

    /**
     * Sets the price for this seat
     * 
     * @param   price   the price for this seat
     */
    @Override
    public void setPrice(double price){
        if(price < 0.0) throw new IllegalArgumentException();
        this.price = price;
    }

    /**
     * Sets the recline for this seat
     * 
     * @param   recline     the number of inches this seat reclines
     */
    @Override
    public void setRecline(int recline){
        if(recline < 0) throw new IllegalArgumentException();
        this.recline = recline;
    }

    /**
     * Sets the meal type for this seat
     * 
     * @param   mealType    the meal type assigned to this seat; must not be null
     */
    public void setMealType(MealType mealType){
        this.mealType = mealType;
    }

    public String toString(){
        return "seatInfo:" + "\n" + "seatNumber: " + getNumber() + "\n" + " price: " + getPrice() + "\n" + " recline: " + getRecline() + "\n" + "mealType:" + getMealType() + "\n" + "customerInfo:" + "\n";
    }

    public static void isArgumentNull(String argument){
        if(argument == null) throw new NullPointerException();
    }

    public static String setSeatNumber(String argument){
        isArgumentNull(argument);
        return argument;
    }
}

public class Main{
    public static void main(String[] args){
        Seat seat = new Seat("1A");
        System.out.println(seat);
    }
}