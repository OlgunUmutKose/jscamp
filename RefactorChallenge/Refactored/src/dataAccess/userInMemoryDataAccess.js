// burda diğer kampı izleyenler varsa neden InMemoryBase benzeri bi sınıf açmadın diye soracaklardır
// nedeni genel olarak bu BaseRepository olayı desteklenmemesi neden desteklenmiyor diye soracak olursanız
// sınıfın içinde kullanılmayan metot ve alanların tutulmaması gerektiğini düşünmeleri gereksiz yer tutmasın diye yani
// işte silme olayı bulunmayan entity ler için vs. 
// tamam benzer şeyleri her entity için tekrar tekrar yazmak amelelik gibi duruyor ama sonuç olarak kod tekrarı vb bişey yok

import { users } from "../constants/defaultData/users.js";
import PredicateHelper from "../utils/predicateHelper.js";
import UserDataAccess from "./userDataAccess.js";

// bu arada normalde her entity için repository/data access sınıfı açmam gerek ama
// ödevi hızlı verebilmek adına Table per Hierarchy (TPH) miras stratejisini kullanmış varsayalım
export default class UserInMemoryDataAccess extends UserDataAccess{

    constructor(){
        super()
        this.users = users;
    }
    add(user){
        //otomatik artan yapmak istedim
        let lastUser = this.users[this.users.length-1]
        user.id = lastUser.id++
        this.users.push(user)
    }
    update(user){
        const index = this.users.findIndex(x => x.id === user.id)
        this.users[index] = user
    }
    deleteBy(user,predicate = (x) => x.id === user.id){
        this.users = this.users.filter((x,y,z) => PredicateHelper.convertToNagative(predicate).call(null,x,y,z))
    }
    getAllBy(filter = () => true){
        return this.users.filter(filter)
    }
    getBy(filter){
        return this.users.find(filter)
    }
}