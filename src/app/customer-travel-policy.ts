import { Claims } from "./claims";
import { TravelClaims } from "./travel-claims";

export class CustomerTravelPolicy {
    customerTravelPolicyId: number;
    startDate: Date;
    endDate: Date;
    coverageAmount: number;
    premiumAmount:number;
    policyId :number;
    customerId: number;
    travelId: number;
    travelclaims : TravelClaims;
}
