import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
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
    async getAlldetailempbyId(@Param('id', ParseIntPipe) id: number): Promise<Employee> {
        return this.employeeService.getDatabyId(id);
    }

    @Put(':id')
    async updateEmployee(@Param('id', ParseIntPipe) id: number, @Body() employeeData: Partial<Employee>): Promise<Employee> {
        return this.employeeService.updateEmployee(id, employeeData);
    }

    @Patch(':id')
    async patchEmployeedetial(@Param('id') id: number, @Body() employeeData: Partial<Employee>){
        return this.employeeService.patchEmployee(id, employeeData);
    }

    @Delete(':id')
    async deleteEmployee(@Param('id') id: number){
        return this.employeeService.deleteEmployee(id);
    }
}
