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
    async deleteEmployee(id: number): Promise<string> {
        const deleteEmployee = await this.employeeRepository.delete(id);
        if (!deleteEmployee) {
            return 'Student not found';
        }
        return 'your data is deleted sucessfully'
    }
    // this function help to serach the data..
    // searching feactue by using the dep OR name
    async searchEmployee(filters: { name?: string; department?: string }): Promise<Employee[]> {
        const query = this.employeeRepository.createQueryBuilder('employee');
        if (filters.name) {
            // andWhere is help to find any emp name...
            // ILIKE is help case sensetive feacture user name small letter insect karya ye tu phir captial letter me add karya dono case me data fetch karya daya ga..
            //% % ---> me na serach bar me na ALI likha ta ho tu DB me jese kiya naam kiya name kiya start me ye tu end me ALI aarha ho ga tu wo fetch ho kar aajaya ga like "{"Ali khan", "Shaharyar ALi", "Hassan ALi"}" ye sub data aajaya ga 
            // or ager hum % use nhi karta ha tu only Ali ko liya kar aaya ga...
            query.andWhere('employee.name ILIKE :name', { name: `%${filters.name}%` });
        }
        if(filters.department){
            query.andWhere('employee.department = :dept',{dept: filters.department});
        }
        return query.getMany();
    }

}
