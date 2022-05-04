import { NODE_ENV } from "../constants";
import {buildDevLogger} from "./dev.logger";
import {buildProdLogger} from "./prod.logger";


export default function Logger(place: string){
    if(NODE_ENV === "dev"){
        return buildDevLogger(place);
     }
     else{
        return buildProdLogger(place);
     }
}