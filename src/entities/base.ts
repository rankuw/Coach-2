export default class Base<T>{
    readonly model: any;
    constructor(model: any){
        this.model = model;
    }
    getModel() {
        return this.model;
    }
    addValue = async (payload: any): Promise<T> => {
        try{
            const newDoc: T = await this.getModel().create(payload);
            return newDoc;
        }catch(err){
            return Promise.reject(err);
        }
    }
    getValues = async(query: any = {}) => {
        try{
            const docs: [T] = await this.getModel().find(query);
            return docs;
        }catch(err){
            return Promise.reject(err);
        }
    }
    getValue =async (query: any) => {
        try{
            const doc: T = await this.getModel().findOne(query);
            return doc;
        }catch(err){
            return Promise.reject(err);
        }
    }
}