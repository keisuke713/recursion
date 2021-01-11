import java.util.HashMap;
import java.util.Objects;
import java.util.Date;
import java.text.SimpleDateFormat;
import java.text.ParseException;

interface FlightInterface {

    //----------------------------------------------------------------
    //          CONSTRUCTOR
    //----------------------------------------------------------------
    // Should take these parameters, in this order:
    // flight number (string)
    // origin (string)
    // destination (string)
    // date (string)

    //----------------------------------------------------------------
    //          REQUIRED METHODS
    //----------------------------------------------------------------
    public String getFlightNum();
    public String getOrigin();
    public String getDestination();
    public String getDate();
    public Seat getSeat(int rowIdx, int seatIdx);
    public Seat getSeat(String seatNumber);
    public int getPassengerCount();
    public boolean readConfirmationFile();
    public String getSeatsInfo();
}

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
    // public MealType getMealType();

    /**
     * Retrieves the customer confirmation for this seat
     *
     * @return     the customer confirmation associated with this seat
     */
    public CustConf getCustConf();

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
    // public void setMealType(MealType mealType);
    
    /**
     * Confirms a customer into this seat
     * 
     * @param   customerConfirmation    the customer booking confirmation
     */
    public void setCustConf(CustConf custConf);

}

interface CustConfInterface {

    //----------------------------------------------------------------
    //          CONSTRUCTORS
    //----------------------------------------------------------------
    // Should accept customer name and confirmation number, in that order
    public String getName();
    public String getConfirmationCode();

}

class Flight implements FlightInterface{
    public static final int COLUMNS = 6;
    public static final int ROWS = 40;
    public static final HashMap<Integer, String>COLUMN_NAME = new HashMap<>(){
        {
            put(0,"A");
            put(1,"B");
            put(2,"C");
            put(3,"D");
            put(4,"E");
            put(5,"F");
        }
    };

    private String flightNumber;
    private String origin;
    private String destination;
    private String date;
    private Seat[] seats;

    public Flight(String flightNumber, String origin, String destination, String date){
        this.flightNumber = setAttribute(flightNumber);
        this.origin = setAttribute(origin);
        this.destination = setAttribute(destination);
        this.date = setDate(date);
        this.seats = generateSeats();
    }

    @Override
    public String getFlightNum(){
        return flightNumber;
    }
    public String getOrigin(){
        return origin;
    }

    @Override
    public String getDestination(){
        return destination;
    }

    @Override
    public String getDate(){
        return date;
    }

    public Seat[] getSeats(){
        return seats;
    }

    /**
     * Retrieves a specific list from the seat array
     * 
     * @param   rowIdx      the index of the row in which the seat exists
     * @param   seatIdx     the index of the seat (within the row) to retrieve
     * @return              the Seat object at the specified position in the array
     */
    @Override
    public Seat getSeat(int rowIdx, int seatIdx){
        if(COLUMN_NAME.get(seatIdx) == null || rowIdx >= ROWS) return null;

        return getSeat(String.valueOf(rowIdx+1) + COLUMN_NAME.get(seatIdx));
    }

    /**
     * Retrieves a specific list from the seat array, via seat number
     * 
     * @param   seatNumber      the seat number to retrieve; must be in nA or nnA format and must be valid for this flight's seat configuration
     * @return                  the corresponding Seat object from the array
     */
    @Override
    public Seat getSeat(String seatNumber){
        for(int i=0; i<getSeats().length; i++){
            if(getSeats()[i].getNumber().equals(seatNumber)) return getSeats()[i];
        }
        return null;
    }

    /**
     * Gets a count of the confirmed passengers on the flight
     * 
     * @return      the count of confirmed passengers
     */
    @Override
    public int getPassengerCount(){
        int result = 0;
        for(int i=0; i<getSeats().length; i++){
            if(getSeats()[i].getCustConf() != null) result++;
        }
        return result;
    }

    /**
     * Reads confirmation information from the confirmation text file (format:  flightnum.txt, e.g., 21.txt)
     * 
     * @return      true, if confirmation information could be read from the file; false, if not
     */
    @Override
    public boolean readConfirmationFile(){
        return false;
    }

    /**
     * Returns a string listing all seat information for the flight
     * 
     * @return      a String with an entry for each seat
     */
    public String getSeatsInfo(){
        String result = "";
        for(int i=0; i<getSeats().length; i++){
            result += getSeats()[i].toString();
        }
        return result;
    }

    public String toString(){
        return "fligntInfo:" + "\n" + "flightNumber: " + getFlightNum() + "\n" + " origin: " + getOrigin() + "\n" + " destination: " + getDestination() + "\n" + " date: " + getDate() + "\n" + getSeatsInfo();
    }

    public static String setAttribute(String argument){
        if(argument == null) throw new NullPointerException();
        return argument;
    }

    public static String setDate(String date){
        try{
            SimpleDateFormat sdf = new SimpleDateFormat("MM/dd/yyyy");
            sdf.setLenient(false);
            sdf.parse("date");
        }catch(ParseException e){
            System.out.println(e);
            System.exit(0);
        }
        return date;
    }

    public static Seat[] generateSeats(){
        Seat[] seats = new Seat[COLUMNS*ROWS];
        for(int i=0; i<ROWS; i++){
            for(int j=0; j<COLUMNS; j++){
                int index = COLUMNS*i + j;
                String seatNumber = String.valueOf(i+1) + COLUMN_NAME.get(j);
                seats[index] = new Seat(seatNumber);
            }
        }
        return seats;
    }
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
    private CustConf custConf;

    public Seat(String seatNumber){
        this.seatNumber = setAttribute(seatNumber);
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
     * Retrieves the customer confirmation for this seat
     *
     * @return     the customer confirmation associated with this seat
     */
    @Override
    public CustConf getCustConf(){
        return custConf;
    }

    /**
     * Sets the price for this seat
     * 
     * @param   price   the price for this seat
     */
    @Override
    public void setPrice(double price){
        this.price = price;
    }

    /**
     * Sets the recline for this seat
     * 
     * @param   recline     the number of inches this seat reclines
     */
    @Override
    public void setRecline(int recline){
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
    
    /**
     * Confirms a customer into this seat
     * 
     * @param   customerConfirmation    the customer booking confirmation
     */
    @Override
    public void setCustConf(CustConf custConf){
        this.custConf = custConf;
    }

    public void removeCustConf(){
        this.custConf = null;
    }

    public String toString(){
        return "seatInfo:" + "\n" + "seatNumber: " + getNumber() + "\n" + " price: " + getPrice() + "\n" + " recline: " + getRecline() + "\n" + "mealType:" + getMealType() + "\n" + "customerInfo:" + Objects.toString(getCustConf()) + "\n";
    }

    public static String setAttribute(String argument){
        if(argument == null) throw new NullPointerException();
        return argument;
    }
}

class CustConf implements CustConfInterface{
    private String name;
    private String confirmationCode;

    public CustConf(String name, String confirmationCode){
        this.name = setAttribute(name);
        this.confirmationCode = confirmationCode;
    }

    @Override
    public String getName(){
        return name;
    }

    @Override
    public String getConfirmationCode(){
        return confirmationCode;
    }

    public String toString(){
        return "name: " + getName() + "\n" + "confirmation: " + getConfirmationCode();
    }

    public static String setAttribute(String argument){
        if(argument == null) throw new NullPointerException();
        return argument;
    }
}

public class Main{
    public static void main(String[] args){
        Flight flight = new Flight("airbone", "HND", "NRT", "01/08/2021");
        System.out.println(flight.getDate());
        // System.out.println(flight.getSeats()[0].toString());
    }
}