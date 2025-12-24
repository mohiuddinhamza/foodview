import api from "./api";

export const  getMenuItems = async()=>{
try{
    const response = await api.get("/menu");
    return response.data;

}
catch(error){
console.error("Fetch Menu Error",error.response?.data || error.message);
throw error
}
};


// for partner dashbord

export const createMenuItem = async (menuData)=>{
    try{
        const response =await api.post("/menu",menuData,{
            headers : {'Content-Type' : "multipart/form-data"}
        });
        return response.data
    }
    catch(error){
        console.error("Create Menu Error : ",error.response?.data || error.message);
        throw error
    }
}