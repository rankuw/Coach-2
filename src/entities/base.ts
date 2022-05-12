
export default class Base<T>{
    readonly model: any;
    constructor(model: any){
        this.model = model;
    }
    getModel(){
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
    getValues = async(query: any = {}): Promise<T[]> => {
        try{
            const docs: T[] = await this.getModel().find(query);
            return docs;
        }catch(err){
            return Promise.reject(err);
        }
    }
    getValue =async (query: any): Promise<T> => {
        try{
            const doc: T = await this.getModel().findOne(query);
            return doc;
        }catch(err){
            return Promise.reject(err);
        }
    }
    removeValue = async (query:any): Promise<boolean> => {
        try{
            const removeStatus = await this.getModel().deleteOne(query);
            if(removeStatus.deletedCount === 0){
                return false;
            }else{
                return true;
            }
        }catch(err){
            return Promise.reject(err);

        }
    }
}