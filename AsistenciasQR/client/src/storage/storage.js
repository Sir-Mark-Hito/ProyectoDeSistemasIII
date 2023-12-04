export const storage={
    get(key){
        const userData = localStorage.getItem(key);
        return JSON.parse(userData);
    },
    set(key,value){
        localStorage.setItem(key,JSON.stringify(value));
    },
    remove(key){
        localStorage.removeItem(key);
    }
}