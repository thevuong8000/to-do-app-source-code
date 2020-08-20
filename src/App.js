import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import AddIcon from '@material-ui/icons/Add';
import Card from './Card'
import EmptyWorkload from './EmptyWorkload';

function App() {
	var initialState = window.localStorage.getItem('list') ? 
						JSON.parse(window.localStorage.getItem('list')) : []
	const [toDoList, setToDoList] = useState(initialState);
	const [removeList, setRemoveList] = useState([]);
	const [adding, setAdding] = useState(false);

	useEffect(() => {
		// console.log('update removeList', removeList.length);
		if(removeList.length === 0) return;
		document.addEventListener('keypress', (e) => {
			const newRemoveList = [...removeList];
			const todo = newRemoveList.pop();
			if (e.ctrlKey) {
				if(e.which === 26 && !adding){ 
					add_todo(todo);
					setRemoveList(newRemoveList);
				}
		  	}
		});
	}, [removeList]);

	const remove_todo = (event) => {
		const todo = event.target.innerHTML;
		var idx = toDoList.indexOf(todo);
		// add to removeList
		var newRemoveList = [...removeList];
		newRemoveList.push(todo);
		setRemoveList(newRemoveList);

		// remove from list
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
