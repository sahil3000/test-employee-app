const express = require('express');
const employeeController = require('../controller/employee');
const router = express.Router();

router.post('/add', employeeController.addEmployee);
router.get('/', employeeController.getEmployee);
router.patch('/update', employeeController.updateEmployee);
router.delete('/remove/:id', employeeController.deleteEmployee);

module.exports = router;