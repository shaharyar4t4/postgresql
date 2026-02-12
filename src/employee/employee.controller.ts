import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Employee } from './employee.entity';

@Controller('employee')
export class EmployeeController {

    constructor(private readonly employeeService: EmployeeService) { }

    @Post()
    async createEmployee(@Body() empdata: Partial<Employee>): Promise<Employee> {
        return this.employeeService.createEmployeedetial(empdata);
    }

    @Get()
    async getAlldetailemp(): Promise<Employee[]> {
        return this.employeeService.getallemployeeDetail();
    }
    @Get(':id')
    async getAlldetailempbyId(@Param('id') id: number): Promise<Employee> {
        return this.employeeService.getDatabyId(id);
    }
}
