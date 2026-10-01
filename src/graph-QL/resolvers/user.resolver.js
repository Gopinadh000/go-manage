



const userResolver = {
    Query : {
        userOptions : (parent , args  , context , info)=>{
           console.log({
            parent, 
            args ,
            context,
            info
           })
            return [{id : 1, name : "Gopinadh"}, { id :2 , name : "Vallabhaneni"}]
        },

        userCards : () => {
            return [{
                id :1,
                name : "Gopinadh",
                email: "gopi@gmail.com",
                role : "Super Admin",
                status : "active"
            }]

        }
    }
}

export default userResolver;