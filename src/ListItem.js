import React from 'react';

const ListItem = (props) => {
	return <li className="list-group-item">
                <div className="row">
                    <div className="col-7">
                        {props.item.name}
                    </div>
                    <div className="col-5">    
                        <span className="float-right">
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
                        </span>
                    </div>
                </div>            
           </li>;
};

export default ListItem;