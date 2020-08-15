import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import AddIcon from '@material-ui/icons/Add';
import Card from './Card'
import EmptyWorkload from './EmptyWorkload';

function App() {
	// console.log(window.localStorage.getItem('list'))
	var initialState = window.localStorage.getItem('list') ? 
						JSON.parse(window.localStorage.getItem('list')) : []
	const [toDoList, setToDoList] = useState(initialState);
	const [adding, setAdding] = useState(false)
	
	const remove_todo = (event) => {
		const todo = event.target.innerHTML;
		var idx = toDoList.indexOf(todo);
		// console.log(idx);
		var newList = [...toDoList];
		newList.splice(idx, 1);
		window.localStorage.setItem('list', JSON.stringify(newList));
		setToDoList(newList);
	}
	const add_todo = (todo) => {
		if(toDoList.includes(todo)){
			alert('This work has been already added!')
		} else{
			// console.log("add item")
			var newList = [...toDoList];
			newList.push(todo);
			window.localStorage.setItem('list', JSON.stringify(newList));
			setToDoList(newList)
		}
		document.getElementById('add_work').value = '';
		normalize()
	}

	const make_transparent = () => {
		setAdding(true);
		document.querySelector('.app').style.opacity = 0.5;
		document.getElementById('add_work').style.display = 'block';
		document.getElementById('add_work').focus();
	}
	const normalize = () => {
		setAdding(false);
		document.querySelector('.app').style.opacity = 1;
		document.getElementById('add_work').style.display = 'none';
	}

	return (
		<div>
			<input 
				id='add_work' 
				class="form-control" 
				type="text" 
				placeholder="Add new work…"
				autofocus
				onKeyPress={(event) => {
					if(event.key === 'Enter'){
						add_todo(event.target.value);
					}
				}} 
			/>
			
			<div className="app" onClick={() => {
				console.log("try to normalize")
				if(adding){
					normalize()
				}
			}}>
				<h1 className='title'>To Do List</h1>
				<div className='to_do_list'>
					<div>
						<button onClick={make_transparent} id='add_btn' type="button" class="btn btn-primary"><AddIcon></AddIcon>New</button>
					</div>
					<div className='clear'></div>
					{toDoList.length === 0 && (<EmptyWorkload></EmptyWorkload>)}
					{toDoList.map(toDo => (
						<Card text={toDo} onClick={e => remove_todo(e)}></Card>
					))}
				</div>
			</div>
		</div>
	);
}

export default App;
