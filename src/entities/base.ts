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
}