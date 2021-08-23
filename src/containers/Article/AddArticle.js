import { React, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import Layout from '../../components/Layout';
import { ButtonGroup, ToggleButton, Alert, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addArticle, getArticles, getAllCategory } from '../../actions';
import './style.css';

 
const AddArticle = (props) => {

    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false)


    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [state, setState] = useState("");
    const [dist, setDist] = useState("");
    const [block, setBlock] = useState("");
    const [articlePictures, setArticlePictures] = useState("");
    const [categry, setCategry] = useState("");

    const auth = useSelector((state) => state.auth);
    const article = useSelector((state) => state.article);
    const category = useSelector((state) => state.category);

    useEffect(() => {
        if (!article.loading) {
            setTitle("");
            setDesc("");
            setState("");
            setDist("");
            setBlock("");
            
            setCategry("");
            dispatch(getAllCategory());
    }
  }, [article.loading]);

    

    const handleProductPictures = (e) => {
    setArticlePictures([...articlePictures, e.target.files[0]]);
  };

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

    const addNewArticle = (e) => {
        e.preventDefault();
        
        const article = {
            title,
            desc,
            state,
            dist,
            block,
            categry,
            articlePictures,
        }
        dispatch(addArticle(article));
        console.log(article);
        
    };

    if (article.loading) {
        return  <Spinner animation="grow" variant="info" />;
    }

    const renderMessage = () =>{
        return <Alert variant="success" style={{ backgroundColor: "#1A2226", border: "none" }}>{article.message}</Alert>;
       
    }

    const renderError = () =>{
        return <Alert variant="danger" style={{backgroundColor:"#1A2226", border:"none"}}>{article.error}</Alert>;
    }

   

    return (


        <div>
            <Button className="BtnReg" onClick={handleShow}>
                Register New
            </Button>
            <Modal show={show} onHide={handleClose} animation={false} className="myModal">
                <Modal.Header closeButton>
                    <Modal.Title className="login-title">Register New Admin</Modal.Title>
                </Modal.Header>
                <Modal.Body  >
                {(article.message)?renderMessage():renderError()}
                    <form >
                        <div className="form-group">
                            <label className="form-control-label">TITLE</label>
                            <input type="text" className="form-control"
                                label="Title" value={title}
                                onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label className="form-control-label">DESCRIPTION</label>
                            <textarea type="text" className="form-control" id="transDesc"
                                label="DESC" value={desc}
                                onChange={(e) => setDesc(e.target.value)} />
                        </div>
                         <div className="form-group">
                            <label className="form-control-label">STATE</label>
                            <select className="form-control" style={{ backgroundColor: "#1A2226", border: "none", borderBottom: "2px solid #0DB8DE" }}
                             onChange={(e) => setState(e.target.value)}>
                                    <option>select state</option>
                                    {
                                       categoryList.map(option =>
                                        <option key={option.value} value={option.value}>{option.name}</option>) 
                                    }
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="form-control-label">DISTRICT</label>
                            <select className="form-control" style={{ backgroundColor: "#1A2226", border: "none", borderBottom: "2px solid #0DB8DE" }}
                             onChange={(e) => setDist(e.target.value)}>
                                    <option>select state</option>
                                    {
                                       categoryList.map(option =>
                                        <option key={option.value} value={option.value}>{option.name}</option>) 
                                    }
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="form-control-label">BLOCK</label>
                            <select className="form-control" style={{ backgroundColor: "#1A2226", border: "none", borderBottom: "2px solid #0DB8DE" }}
                             onChange={(e) => setBlock(e.target.value)}>
                                    <option>select state</option>
                                    {
                                       categoryList.map(option =>
                                        <option key={option.value} value={option.value}>{option.name}</option>) 
                                    }
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="form-control-label">CATEGORY</label>
                            <select className="form-control" style={{ backgroundColor: "#1A2226", border: "none", borderBottom: "2px solid #0DB8DE" }}
                             onChange={(e) => setCategry(e.target.value)}>
                                    <option>select state</option>
                                    {
                                       categoryList.map(option =>
                                        <option key={option.value} value={option.value}>{option.name}</option>) 
                                    }
                            </select>
                        </div>
                        
                        <div className="form-group">
                            <label className="form-control-label">IMAGES</label>
                             {articlePictures.length > 0
          ? articlePictures.map((pic, index) => (
              <div key={index}>{pic.name}</div>
            ))
          : null}
                            <input type="file" className="form-control" 
                                label="ArticlePictures" 
                                name="articlePictures"
                                onChange={handleProductPictures} multiple/>
                             
                        </div>
                        
                       
                             
                        
                    </form>
                </Modal.Body>
                <Modal.Footer className="col-lg-12 loginbttm">
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <button type="submit" className="btn btn-outline-primary" onClick={addNewArticle}>REGISTER</button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default AddArticle