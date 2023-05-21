import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { BASE_URL } from '../../config';
import { toast } from 'react-toastify';

function EmployeeForm({ handleClose, setRefreshData, editData }) {
    const [inputState, setInputState] = useState({
        name: '',
        departments: '',
        salary: '',
    });

    const [errorState, setErrorState] = useState({
        name: '',
        departments: '',
        salary: '',
    });

    useEffect(() => {
        if (editData) {
            setInputState(editData);
        }
    }, [editData])

    const changeHandler = (e) => {
        setInputState(prev => {
            return { ...prev, [e.target.name]: e.target.value };
        });

        if (errorState[e.target.name] !== '') {
            setErrorState(prev => {
                return { ...prev, [e.target.name]: '' };
            });
        }
        
    }

    const validationHandler = () => {
        let obj = {};
        let isValid = true;

        if (!inputState.name) {
            obj.name = "Name is mandatory field";
            isValid = false;
        }
        if (!inputState.departments) {
            obj.departments = "Departments is mandatory field";
            isValid = false;
        }
        if (!inputState.salary) {
            obj.salary = "Salary is mandatory field";
            isValid = false;
        }

        if (isNaN(inputState.salary)) {
            obj.salary = "Salary should be number";
            isValid = false;
        }

        setErrorState(prev => {
            return {...prev, ...obj}
        });
        return isValid;
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        let endPoint = ""
        if (editData) {
            endPoint = `${BASE_URL}/api/employee/update`
        } else {
            endPoint = `${BASE_URL}/api/employee/add`
        }
        if (validationHandler()) {
            try {
                const response = await fetch(endPoint,{
                    method: editData ? 'PATCH' : 'POST',
                    body: JSON.stringify(inputState),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json();
                if (data.error) {
                    toast.error(data.msg);
                    return;
                }
                toast.success(data.msg);
                setRefreshData(prev => !prev);
                handleClose();
            } catch (err) {
                toast.error("something went wrong");
            }
        }
    }

    return (
        <>
            <Modal show={true} onHide={handleClose}>
                <form onSubmit={submitHandler}>
                    <Modal.Header closeButton>
                        <Modal.Title>{editData ? 'Edit' : 'Add'} Employee Form</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" value={inputState.name} onChange={changeHandler} name="name" placeholder="Enter Name" />
                            {errorState.name && <span className='text-danger'>{errorState.name}</span>}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Departmentss</Form.Label>
                            <Form.Control type="text" as="textarea" value={inputState.departments} onChange={changeHandler} name="departments" placeholder="Enter Departmentss" />
                            {errorState.departments && <span className='text-danger'>{errorState.departments}</span>}
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Salary</Form.Label>
                            <Form.Control type="text" value={inputState.salary} onChange={changeHandler} name="salary" placeholder="Enter Salary" />
                            {errorState.salary && <span className='text-danger'>{errorState.salary}</span>}
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={handleClose}>
                            Close
                        </Button>
                        <Button type='submit' variant="success" >
                            {editData ? 'Update' : 'Save'}
                        </Button>
                    </Modal.Footer>
                </form>
            </Modal>
        </>
    );
}

export default EmployeeForm;