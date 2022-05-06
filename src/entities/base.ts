export default class Base{
    readonly model: any
    constructor(model: any){
        this.model = model;
    }
    getModel() {
        return this.model;
    }
    addValue = async (payload: any) => {
        try{
            const newDoc = await this.getModel().create(payload);
            return newDoc.id;
        }catch(err){
            return Promise.reject(err);
        }
    }

    getValue =async (payload: any) => {
        try{
            
            const doc = await this.getModel().findOne(payload);
            console.log(doc);
            await Promise.all([
                doc.populate({path: "userId", select: "phoneNumber email -_id"}),
                doc.populate("subscriptionId")
            ]);
            console.log("--------------------------------------------------------------------------------------")
            console.log(doc);
            const res = {
                lastBilled: doc.createdAt,
                billedAmount: doc.subscriptionId.cost,
                billingCycle: doc.subscriptionId.type,
                nextBillingDate: doc.createdAt,
                autoRenewal: doc.autoRenew
            }
            return res;
        }catch(err){
            return Promise.reject(err);
        }
    }
}