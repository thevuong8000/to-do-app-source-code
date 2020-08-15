import React from 'react'
import './Card.css'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

function Card({ text, onClick }) {
    return (
        <div className='card'>
            <div class="card-body">
                <HighlightOffIcon className='card_icon'></HighlightOffIcon>
                <span className='card_text' onClick={onClick}>{text}</span>
            </div>
        </div>
    )
}

export default Card
