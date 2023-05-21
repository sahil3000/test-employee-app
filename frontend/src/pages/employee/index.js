import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { toast } from 'react-toastify';
import { BASE_URL } from '../../config';
import EmployeeForm from '../../components/employee/EmployeeForm';
import { Button } from 'react-bootstrap';

function Employee() {
    const [rowCollection, setRowCollection] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [refreshData, setRefreshData] = useState(false);
    const [editData, setEditData] = useState(null)
    const [currentSortOrder, setCurrentSortOrder] = useState({
        key: '',
        isAsc: false
    });

    const handleClose = () => {
        setShowModal(false);
        if (editData) {
            setEditData(null);
        }
    }

    const handleShow = () => setShowModal(true);
  
    useEffect(() => {
        const getEmployees = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/employee`);
                const data = await response.json();
                if (data.error) {
                    toast.error(data.msg);
                    setRowCollection([]);
                    return;
                }
                setRowCollection(data.body);
            } catch (err) {
                toast.error("Something went wrong");
                setRowCollection([]);
            }
        }
        getEmployees();
    }, [refreshData]);

    const sortHandler = (key) => {
        const data = [...rowCollection];
        let isAsc = currentSortOrder.key === key && currentSortOrder.isAsc === true;
        if (!isAsc) {
            if (key === 'salary') {
                data.sort((a,b) => a[key] - b[key]);
            } else {
                data.sort((a,b) => a[key] > b[key] ? 1 : -1);
            }
            isAsc = true;
        } else {
            if (key === 'salary') {
                data.sort((a,b) => b[key] - a[key]);
            } else {
                data.sort((a,b) => a[key] < b[key] ? 1 : -1);
            }
            isAsc = false;
        }
        setCurrentSortOrder({
            key,
            isAsc
        });
        setRowCollection(data);
    }

    const deleteHandler = async (id) => {
        const isDelete = window.confirm("Do you want to delete")
        if (!isDelete) {
            return;
        }
        try {
            const response = await fetch(`${BASE_URL}/api/employee/remove/${id}`,{
                method: 'DELETE'
            })
            const data = await response.json();
            if (data.error) {
                toast.error(data.msg)
                return;
            }
            toast.success(data.msg);
            setRefreshData(prev => !prev);
        } catch (err) {
            toast.error("Something went wrong");
        }
    }

    const editHandler = (data) => {
        setEditData({
            id: data._id,
            departments: data.departments,
            salary: data.salary,
            name: data.name,
        });
        handleShow();
    }

    return (
        <div className='container my-2'>
            <div class="d-flex justify-content-between mb-2">
                <h2 className='text-center'>Employee Details</h2>
                <Button variant="dark" onClick={handleShow}>
                    Add Employee
                </Button>
            </div>
            {showModal && <EmployeeForm editData={editData} handleClose={handleClose} setRefreshData={setRefreshData} />}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>
                            <div className='d-flex justify-content-between'>
                                <span>Name</span>
                                <i onClick={() => sortHandler('name')} className={`fa fa-sort${currentSortOrder.key === 'name' && currentSortOrder.isAsc ? '-asc text-primary' : currentSortOrder.key === 'name' && !currentSortOrder.isAsc ? '-desc text-primary' : ''}`} aria-hidden="true"></i>
                            </div>
                        </th>
                        <th>
                            <div className='d-flex justify-content-between'>
                                <span>Departments</span>
                                <i onClick={() => sortHandler('departments')} className={`fa fa-sort${currentSortOrder.key === 'departments' && currentSortOrder.isAsc ? '-asc text-primary' : currentSortOrder.key === 'departments' && !currentSortOrder.isAsc ? '-desc text-primary' : ''}`} aria-hidden="true"></i>
                            </div>
                        </th>
                        <th>
                            <div className='d-flex justify-content-between'>
                                <span>Salary</span>
                                <i onClick={() => sortHandler('salary')} className={`fa fa-sort${currentSortOrder.key === 'salary' && currentSortOrder.isAsc ? '-asc text-primary' : currentSortOrder.key === 'salary' && !currentSortOrder.isAsc ? '-desc text-primary' : ''}`} aria-hidden="true"></i>
                            </div>
                        </th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {rowCollection && Array.isArray(rowCollection) && rowCollection.length > 0 && rowCollection.map((ele, index) => {
                        return <tr key={ele._id}>
                            <td>{ele.name}</td>
                            <td>{ele.departments}</td>
                            <td>{ele.salary}</td>
                            <td>
                                <div className='d-flex justify-content-center'>
                                    <i onClick={() => editHandler(ele)} className="fa fa-pencil action-icon-margin-right text-dark" aria-hidden="true"></i>
                                    <i onClick={() => deleteHandler(ele._id)} className="fa fa-trash text-danger" aria-hidden="true"></i>
                                </div>
                            </td>
                        </tr>
                    })}

                    {rowCollection && Array.isArray(rowCollection) && rowCollection.length === 0 && <tr>
                        <td className='text-center' colSpan={4}>No records found</td>
                    </tr>}
                </tbody>
            </Table>
        </div>
    );
}

export default Employee;