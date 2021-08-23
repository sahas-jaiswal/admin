import { React, useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { ButtonGroup, ToggleButton, Alert, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory} from '../../actions'
import './style.css';
 
const AddCategory = (props) => {

    const category = useSelector(state => state.category);
    const auth = useSelector(state => state.auth);
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const [name, setName] = useState("");
    const [parentId, setParentId] = useState("");
    const dispatch = useDispatch("");

    useEffect(() => {
        if(!category.loading)
        setName("");
        setParentId("");
        category.message = "";
        category.error = "";
    }, [category.loading]);
   
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
    const categoryList = createCategoryList(category.categories);

    const AddNewCategory = (e) => {
        const cat = {
            name,
            parentId,
        }
        dispatch(addCategory( cat ));
    }

    const renderMessage = () => {
        return <Alert variant="success" >{category.message}</Alert>;
    }

    const renderError = () => {
        return <Alert variant="danger">{category.error}</Alert>;
    }

    return (


        <div>
            <Button className="BtnReg" onClick={handleShow}>
                Add Category
            </Button>
            <Modal show={show} onHide={handleClose} animation={true} className="myModal">
                <Modal.Header closeButton>
                    <Modal.Title className="login-title">Add New Category</Modal.Title>
                </Modal.Header>
                <Modal.Body  >
                    { (category.message)? renderMessage(): renderError()}
                    <form >
                        <div className="form-group">
                            <label className="form-control-label">CATEGORY NAME</label>
                            <input type="text" className="form-control"
                                label="UserName" value={name}
                                onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label className="form-control-label" style={{fontSize:"large"}}>If want to add inside another category</label>
                            <select className="form-control" style={{ backgroundColor: "#1A2226", border: "none", borderBottom: "2px solid #0DB8DE" }}
                             onChange={(e) => setParentId(e.target.value)}>
                                    <option>select category</option>
                                    {
                                       categoryList.map(option =>
                                        <option key={option.value} value={option.value}>{option.name}</option>) 
                                    }
                            </select>
                        </div>
                       
                        
                    </form>
                </Modal.Body>
                <Modal.Footer className="col-lg-12 loginbttm">
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <button type="submit" className="btn btn-outline-primary" onClick={()=>AddNewCategory()}>ADD CATEGORY</button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default AddCategory;