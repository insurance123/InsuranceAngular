import { Claims } from "./claims";
import { Policy } from "./policy";
import { User } from "./user";
import { Vehicle } from "./vehicle";

export class CustomerVehiclePolicy {
    customerVehiclePolicyId: number;
    startDate: Date;
    endDate: Date;
    coverageAmount: number;
    premiumAmount:number;
    policyId :number;
    customerId: Number;
    vehicleId: number;
    //claimStatus:boolean;
    claims: Claims;
}
