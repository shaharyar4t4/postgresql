import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './employee.entity';
import { Repository } from 'typeorm';
import { promises } from 'dns';
import { NotFoundError } from 'rxjs';

@Injectable()
export class EmployeeService {


    // this is the inject data on DB
    constructor(
        @InjectRepository(Employee)
        private employeeRepository: Repository<Employee>
    ){}

    // this function help the data on PostgreSQl
    async createEmployeedetial(employeeData: Partial <Employee>): Promise<Employee>{
        const employee = this.employeeRepository.create(employeeData);
        return this.employeeRepository.save(employee);
    }

    // this function is help to fetch the data show on console .. Inshort they fetch complete data
    async getallemployeeDetail(): Promise <Employee[]>{
        return this.employeeRepository.find();
    }

    // this function is help to fetch the data by using the ID ..
    async getDatabyId(id: number): Promise<Employee>{
        const employee = await this.employeeRepository.findOneBy({id})
        if(!employee){
            throw new NotFoundException(`Employee with Id: ${id} not found`);
        }
        return employee;
    }
}
