import { CustomerTravelPolicy } from "./customer-travel-policy";

export class TravelClaims {
    claimId:number;
	claimDate: Date;
	reasonOfClaim:String;
	proofOfClaim: String;
	claimStatus: String;
    customerTravelPolicyId:number;
}
