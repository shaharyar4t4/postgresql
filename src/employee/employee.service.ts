import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './employee.entity';
import { Repository } from 'typeorm';
import { promises } from 'dns';

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
}
