import { users } from "../data/users.js"
import DataError from "./models/dataerror.js"

export default class UserService{
    constructor(loggerService){
        this.employees=[]
        this.customers=[]
        this.errors=[]
        this.loggerService=loggerService
    }

    load(){
        for (const user of users) {
            switch (user.type) {
                case "customer":
                    if(!this.checkCustomerValidityforErrors(user)){
                        this.customers.push(user)
                    }
                    this.customers.push(user)
                    break;
                case "employee":
                    if(!this.checkEmployeeValidityforErrors(user)){
                        this.employees.push(user)
                    }
                    this.employees.push(user)
                    break;

                default:
                    this.errors.push(new DataError("Wrong user type", user))
                    break;
            }
        }
    }

    checkCustomerValidityforErrors(user){
        let requiredFields = "id firstName lastName age city".split(" ")
        let hasErrors= false
        for (const field of requiredFields) {
            if(!user[field]){
                hasErrors=true
                this.errors.push(new DataError(`Validation Problem on ${field} is required`,user))
            }
        }

        if(Number.isNaN(Number.parseInt(+user.age))){
            hasErrors=true
            this.errors.push(new DataError(`Validation problem.. ${user.age} is not a number`, user))
        }
        return hasErrors
    }


    checkEmployeeValidityforErrors(user){
        let requiredFields = "id firstName lastName age city salary".split(" ")
        let hasErrors= false
        for (const field of requiredFields) {
            if(!user[field]){
                hasErrors=true
                this.errors.push(new DataError(`Validation Problem on ${field} is required`,user))
            }
        }
        return hasErrors
    }

    add(user){
        switch (user.type) {
            case "customer":
                if(!this.checkCustomerValidityforErrors(user)){
                    this.customers.push(user)
                }
                this.customers.push(user)
                break;
            case "employee":
                if(!this.checkEmployeeValidityforErrors(user)){
                    this.employees.push(user)
                }
                this.employees.push(user)
                break;
            default:
                this.errors.push(new DataError("This user cannot be added. Wrong user type",user))
                break;
        }
        this.loggerService.log(user)
    }

    listCustomers(){
        return this.users
    }

    getCustomerById(id){
        return this.users.find(u=>u.id == id)
    }

    getCustomersSorted(){
        return this.customers.sort((customer1,customer2)=>{
            if(customer1.firstName<customer2.firstName){
                return 1;
            }
            else if(customer1.firstName===customer2.firstName){
                return 0;
            }
            else{
                return -1;
            }
            
        })
    }
}