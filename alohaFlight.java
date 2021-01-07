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
    public String getSeatInfo();
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
    public MealType getMealType();

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

    public Seat(String seatNumber, double price, int recline, MealType mealType){
        this.seatNumber = seatNumber;
        this.price = price;
        this.recline = recline;
        this.mealType = mealType;
    }

    public String getNumber(){
        return seatNumber;
    }

    public double getPrice(){
        return price;
    }

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
    public CustConf getCustConf(){
        return null;
    }

    /**
     * Sets the price for this seat
     * 
     * @param   price   the price for this seat
     */
    public void setPrice(double price){}

    /**
     * Sets the recline for this seat
     * 
     * @param   recline     the number of inches this seat reclines
     */
    public void setRecline(int recline){}

    /**
     * Sets the meal type for this seat
     * 
     * @param   mealType    the meal type assigned to this seat; must not be null
     */
    // public void setMealType(MealType mealType){}
    
    /**
     * Confirms a customer into this seat
     * 
     * @param   customerConfirmation    the customer booking confirmation
     */
    public void setCustConf(CustConf custConf){}
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
    private String flightNumber;
    private String origin;
    private String destination;
    private String date;

    public Flight(String flightNumber, String origin, String destination, String date){
        this.flightNumber = flightNumber;
        this.origin = origin;
        this.destination = destination;
        this.date = date;
    }

    public String getFlightNum(){
        return flightNumber;
    }
    public String getOrigin(){
        return origin;
    }

    public String getDestination(){
        return destination;
    }

    public String getDate(){
        return date;
    }

    /**
     * Retrieves a specific list from the seat array
     * 
     * @param   rowIdx      the index of the row in which the seat exists
     * @param   seatIdx     the index of the seat (within the row) to retrieve
     * @return              the Seat object at the specified position in the array
     */
    public Seat getSeat(int rowIdx, int seatIdx){
        return null;
    }

    /**
     * Retrieves a specific list from the seat array, via seat number
     * 
     * @param   seatNumber      the seat number to retrieve; must be in nA or nnA format and must be valid for this flight's seat configuration
     * @return                  the corresponding Seat object from the array
     */
    public Seat getSeat(String seatNumber){
        return null;
    }

    /**
     * Gets a count of the confirmed passengers on the flight
     * 
     * @return      the count of confirmed passengers
     */
    public int getPassengerCount(){
        return 1;
    }

    /**
     * Reads confirmation information from the confirmation text file (format:  flightnum.txt, e.g., 21.txt)
     * 
     * @return      true, if confirmation information could be read from the file; false, if not
     */
    public boolean readConfirmationFile(){
        return false;
    }

    /**
     * Returns a string listing all seat information for the flight
     * 
     * @return      a String with an entry for each seat
     */
    public String getSeatInfo(){
        return "";
    }
}

class CustConf implements CustConfInterface{
    private String name;
    private String confirmationCode;

    public CustConf(String name, String confirmationCode){
        this.name = name;
        this.confirmationCode = confirmationCode;
    }

    public String getName(){
        return name;
    }

    public String getConfirmationCode(){
        return confirmationCode;
    }
}

public class Main{
    public static void main(String[] args){
        System.out.println("dd");
    }
}
