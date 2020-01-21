
export class Offer {
    price: number;
    description:string;
    phone_number:string;
    owner_uid:string;
    position_lat:number=0;
    position_long:number=0;
    constructor() {
        this.description="";
        this.price=0;
        this.phone_number="";
    }


}
