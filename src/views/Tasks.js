import React from 'react';
import AfterLoginTemplate from '../templates/AfterLoginTemplate';
import Card from '../components/molecules/Card/Card';

const Tasks = () =>(
    <AfterLoginTemplate pageType="tasks">
    <Card cardType="tasks"  id='1'/>
    <Card cardType="tasks" />
    <Card cardType="tasks" />
    <Card cardType="tasks" />
    </AfterLoginTemplate>
);


export default Tasks;