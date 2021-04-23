import { CustomerVehiclePolicy } from "./customer-vehicle-policy";

export class Claims {
    claimId:number;
	claimDate:String;
	reasonOfClaim:String;
	proofOfClaim:String ;
	claimStatus: String;
	claimAmount:number;
    customerVehiclePolicy: CustomerVehiclePolicy;
}
