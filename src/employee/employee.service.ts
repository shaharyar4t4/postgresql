import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './employee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeeService {


    // this is the inject data on DB
    constructor(
        @InjectRepository(Employee)
        private employeeRepository: Repository<Employee>
    ) { }

    // this function help the data on PostgreSQl
    async createEmployeedetial(employeeData: Partial<Employee>): Promise<Employee> {
        const employee = this.employeeRepository.create(employeeData);
        return this.employeeRepository.save(employee);
    }

    // this function is help to fetch the data show on console .. Inshort they fetch complete data
    async getallemployeeDetail(): Promise<Employee[]> {
        return this.employeeRepository.find();
    }

    // this function is help to fetch the data by using the ID ..
    async getDatabyId(id: number): Promise<Employee> {
        const employee = await this.employeeRepository.findOneBy({ id })
        if (!employee) {
            throw new NotFoundException(`Employee with Id: ${id} not found`);
        }
        return employee;
    }

    // this function is help to update the data by using the ID ..
    async updateEmployee(id: number, employeeData: Partial<Employee>): Promise<Employee> {
        const updateEmployeedetial = await this.employeeRepository.preload({
            id,
            ...employeeData
        })
        if (!updateEmployeedetial) {
            throw new NotFoundException(`Employee with Id: ${id} not found`);
        }
        return this.employeeRepository.save(updateEmployeedetial);
    }

    // this function is help to update specific data by using the ID ..
    async patchEmployee(
        id: number,
        employeeData: Partial<Employee>,
    ): Promise<Employee> {

        const employeedetial = await this.employeeRepository.findOne({
            where: { id },
        });

        if (!employeedetial) {
            throw new NotFoundException(`Employee with ID ${id} not found`);
        }

        // Update only provided fields
        Object.assign(employeedetial, employeeData);

        return await this.employeeRepository.save(employeedetial);
    }
// this function is help to delete the entity....
    async deleteEmployee(id: number): Promise<string>{
        const deleteEmployee = await this.employeeRepository.delete(id);
        if(!deleteEmployee){
            return 'Student not found';
        }
        return 'your data is deleted sucessfully'
    }
}
