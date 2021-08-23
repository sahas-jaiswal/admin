import React from 'react';
import { Redirect } from 'react-router-dom';
import Layout from '../../components/Layout/index';
import AddArticle from './AddArticle'

const index = () => {

    
    const user = JSON.parse(localStorage.getItem("user"));
    if (user.role === "admin") {
        return <Redirect to={`/home`} />;
    }
    return (
        <div>
            <Layout sidebar>
                <AddArticle></AddArticle>
            </Layout>
        </div>
    )
}

export default index