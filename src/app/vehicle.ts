import { User } from "./user";

export class Vehicle {

    vehicleId: number;
    registrationNumber: String;
    registrationState: String;
    manufacturer:String;
    model:String;
    vehicleType:String;
    engineNumber:String;
    chassisNumber :String;
    fuelType:String;
    age:number;
    customer: User;
}
