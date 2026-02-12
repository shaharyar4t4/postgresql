import { Body, Controller, Post } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Employee } from './employee.entity';

@Controller('employee')
export class EmployeeController {

    constructor( private readonly employeeService: EmployeeService){}

    @Post()
    async createEmployee(@Body() empdata: Partial<Employee>): Promise<Employee>{
        return this.employeeService.createEmployeedetial(empdata);
    }
}
