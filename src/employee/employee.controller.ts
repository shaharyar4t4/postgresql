import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Query } from '@nestjs/common';
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
    
    // http://localhost:3000/employee/search?name=ali
    // seach query use in postman
    @Get('search')
    async searchEmployees(@Query('name') name?: string,
        @Query('department') department?: string,): Promise<Employee[]> {
        return this.employeeService.searchEmployee({
            name, department
        })
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
    async patchEmployeedetial(@Param('id') id: number, @Body() employeeData: Partial<Employee>) {
        return this.employeeService.patchEmployee(id, employeeData);
    }

    @Delete(':id')
    async deleteEmployee(@Param('id') id: number) {
        return this.employeeService.deleteEmployee(id);
    }


}
