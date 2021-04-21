import { Policy } from "./policy";
import { User } from "./user";
import { Vehicle } from "./vehicle";

export class CustomerVehiclePolicy {
    //customerVehiclePolicyId: number;
    startDate: String;
    endDate: String;
    coverageAmount: number;
    premiumAmount:number;
    policyId :number;
    customerId: Number;
    vehicleId: number;
}
