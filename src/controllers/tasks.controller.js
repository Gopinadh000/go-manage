export const createTask =  async (req, res)=>{

    try{
        ReS(res, {
            status: true,
            statusCode: 200,
            statusMessage: "Task created successfully",
            data: {
                taskdata : {
                    taskid : "1234567890",
                    taskname : "Task 1",
                    taskdescription : "Task 1 description",
                    taskstatus : "pending",
                    taskpriority : "low",
                    taskassignedto : "John Doe",
                }
            }
        })
    }catch(error){
        ReE(res, {
            error: error
        })
    }
};


export const getAllTasks =  async (req, res) => {
    try{
        ReS(res, {
            status: true,
            statusCode: 200,
            statusMessage: "All tasks fetched successfully",
            data: {
                taskdata : []
            }
        })
    }catch(error){
        ReE(res, {
            error: error
        })
    }
};


export const getTaskById =  async (req, res) => {
    
    try{
        ReS(res, {
            status: true,
            statusCode: 200,
            statusMessage: "Task fetched successfully",
            data: {
                taskdata : {}
            }
        })
    }catch(error){
        ReE(res, {
            error: error
        })
    }
};


export const updateTask =  async (req, res) => {
    
    try{
        ReS(res, {
            status: true,
            statusCode: 200,
            statusMessage: "Task updated successfully",
            data: {
                taskdata : {}
            }
        })
    }catch(error){
        ReE(res, {
            error: error
        })
    }
};


export const deleteTask =  async (req, res) => {
    
    try{
        ReS(res, {
            status: true,
            statusCode: 200,
            statusMessage: "Task deleted successfully",
            data: {
                taskdata : {}       
            }
        })
    }catch(error){
        ReE(res, {
            error: error
        })
    }
};
