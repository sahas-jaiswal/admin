import { React, useState, useEffect } from 'react';
import Layout from '../../components/Layout';
import { Redirect } from 'react-router-dom';
import AddCategory from './addCategory';
import { Button, Modal, Alert, Spinner } from 'react-bootstrap';
import {FiEdit, FiTrash2 } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux';
import UpdateCategory from './UpdateCategory'
import { getAllCategory, deleteCategory } from '../../actions/category.action';
import CheckboxTree from 'react-checkbox-tree';
import {
    IoIosCheckboxOutline,
    IoIosCheckbox,
    IoIosArrowForward,
    IoIosArrowDown,
    IoIosAdd,
    IoIosTrash,
    IoIosCloudUpload
} from 'react-icons/io';

const Category = () => {

    const category = useSelector(state => state.category);
    const dispatch = useDispatch()
    const user = JSON.parse(localStorage.getItem('user'));
    const [show, setShow] = useState(false);
    const [item, setItem] = useState("");
    const handleClose = () => setShow(false);
    const [checked, setChecked] = useState([]);
    const [expanded, setExpanded] = useState([]);
    
    useEffect(() => {
        if(!category.loading)
        dispatch(getAllCategory())
    }, []);

    if (user.role === "admin") {
        return <Redirect to={`/home`} />;
    }
    
    const renderCategories = (categories) => {
        const myCategories = [];
        if (categories)
        {
        for (let category of categories)
        {
            myCategories.push(
                <li key={category.name}>
                    
                    <FiEdit className="Edit" onClick={() => UpdateCategory(category)}/> <FiTrash2 className="Trash" onClick={() => deleteFunction(category)}/>
                    <p style={{marginLeft:"10px"}}>{category.name}</p>
                    
                    {category.children.length > 0 ? (<ul>{ renderCategories(category.children)}</ul>):null}
                </li>
            );
        }
        
        }
        return myCategories;
    }

     const createCategoryList = (categories, options = []) => {

        for (let category of categories) {
            options.push({
                value: category.id,
                name: category.name,
                parentId: category.parentId,
            });
            if (category.children.length > 0) {
                createCategoryList(category.children, options)
            }
        }
        return options;
    }
    /*{
                    label: category.name,
                    value: category.id,
                    children: category.children.length > 0 && renderCategories(category.children)
                }*/
    const deleteFunction = (data) => {
     setShow(true);
     setItem(data);
    }

    if (category.loading) {
        return  <Spinner animation="grow" variant="info" />;
    }
    
    const renderMessage = () =>{
        return <Alert variant="success" style={{ backgroundColor: "#1A2226", border: "none" }}>{category.message}</Alert>;
       
    }

    const renderError = () => {
        return <Alert variant="danger" style={{ backgroundColor: "#1A2226", border: "none" }}>{category.error}</Alert>;
    }
    return (
        <div>
            <Layout sidebar>
                <AddCategory />
                { (category.message)? renderMessage(): renderError()}
                <div className="ListCat">
                    <h>List of Categories</h>
                    <ul>{renderCategories(category.categories)}</ul>
                </div>
                
                
                {/*<CheckboxTree className="cbt"
                            nodes={renderCategories(category.categories)}
                            checked={checked}
                            expanded={expanded}
                            onCheck={checked => setChecked(checked)}
                            onExpand={expanded => setExpanded(expanded)}
                            icons={{
                                check: <IoIosCheckbox />,
                                uncheck: <IoIosCheckboxOutline />,
                                halfCheck: <IoIosCheckboxOutline />,
                                expandClose: <IoIosArrowForward />,
                                expandOpen: <IoIosArrowDown />
                            }}/>*/}

                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}>
                    <Modal.Header closeButton>
                        <Modal.Title className="login-title">Alert</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ fonntWeight: "30px", color: "#6C6C6C" }}>
                        Are you sure you want to delete "{item.name}"
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="danger" onClick={() => { dispatch(deleteCategory(item.name)); handleClose() }}>Delete</Button>
                    </Modal.Footer>
                </Modal>
            </Layout>
        </div>
    )
}

export default Category;
