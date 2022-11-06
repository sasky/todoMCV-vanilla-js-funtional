export class schema {
    #key = ''
    #type = 'string'
    #default = ''
    #enums = []
}


let state = {}
let schemas = [];
export const State ={

    setSchema : (schema) => {

    },
    setState : (key, value) => {
        
    },
    // or perhaps json encode-> decode for a deeper copy
    getState: () => Object.freeze({...state}),
}
