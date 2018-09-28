import React from 'react';

const ListItem = (props) => {
	return <li className="list-group-item">
                {props.item.name}   
                <button
                	className="btn btn-sm btn-success ml-4"
                    onClick={props.editTodo} >
                	<i className="fas fa-pencil-alt"></i>
                </button>
                <button
                	className="btn btn-sm btn-danger ml-2"
                    onClick={props.deleteTodo}>
                    <i className="fas fa-trash-alt"></i>
                </button>
           </li>;
};

export default ListItem;