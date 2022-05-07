export default class Base{
    readonly model: any;
    constructor(model: any){
        this.model = model;
    }
    getModel() {
        return this.model;
    }
    addValue = async (payload: any) => {
        try{
            const newDoc = await this.getModel().create(payload);
            return newDoc;
        }catch(err){
            return Promise.reject(err);
        }
    }
    getValues = async(query: any = {}) => {
        try{
            const docs = await this.getModel().find(query);
            return docs;
        }catch(err){
            return Promise.reject(err);
        }
    }
    getValue =async (query: any) => {
        try{
            const doc = await this.getModel().findOne(query);
            return doc;
        }catch(err){
            return Promise.reject(err);
        }
    }
}