const Employee = require('../model/employee');

const employeeController = {
    addEmployee: async function (req, res) {
        const {name, departments, salary} = req.body;

        if (!name || !departments || !salary) {
            return res.json({
                error: true,
                msg: 'all fields are mandatory',
                body: {}
            });
        }

        try {
            const response = await Employee.create({ name, departments, salary });
            return res.json({
                error: false,
                msg: 'employee details successfully inserted',
                body: response
            });
        } catch (err) {
            return res.json({
                error: true,
                msg: err.message,
                body: {}
            });
        }
    },

    getEmployee: async function(req, res) {
        try {
            const response = await Employee.find({});
            return res.json({
                error: false,
                msg: 'employees successfully get',
                body: response
            });
        } catch (err) {
            return res.json({
                error: true,
                msg: 'get employees failed ',
                body: []
            });
        }
    },

    updateEmployee: async function (req, res) {
        const {name, departments, salary, id} = req.body;

        if (!id) {
            return res.json({
                error: true,
                msg: 'id is mandatory field',
                body: {}
            });
        }

        try {
            const employee = await Employee.findOne({ _id: id });

            if (!employee) {
                return res.json({
                    error: true,
                    msg: 'invalid employee id',
                    body: {}
                });
            }

            employee.name = name ? name : employee.name;
            employee.departments = departments ? departments : employee.departments;
            employee.salary = salary ? salary : employee.salary;
            await employee.save();

            return res.json({
                error: false,
                msg: 'employee details successfully update',
                body: employee
            });
        } catch (err) {
            return res.json({
                error: true,
                msg: err.message,
                body: {}
            });
        }
    },

    deleteEmployee: async function(req, res) {
        const {id} = req.params;
        if (!id) {
            return res.json({
                error: true,
                msg: 'employee id is madatory',
                body: {}
            });
        }
        try {
            const deleteEmployee = await Employee.findOneAndDelete({_id: id});

            if (deleteEmployee) {
                return res.json({
                    error: false,
                    msg: 'employee successfully deleted',
                    body: {}
                });
            }
            return res.json({
                error: true,
                msg: 'invalid employee id',
                body: {}
            });

        } catch (err) {
            return res.json({
                error: true,
                msg: err.message,
                body: {}
            });
        }
    }
}
module.exports = employeeController;