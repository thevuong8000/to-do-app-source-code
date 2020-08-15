import React from 'react'
import './EmptyWorkload.css'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

function EmptyWorkload() {
    return (
        <div className='card'>
            <div class="card-body empty_work">
                <span>
                    <CheckCircleOutlineIcon className='done_icon'></CheckCircleOutlineIcon>
                    You have no work to do!!!
                </span>
            </div>
        </div>
    )
}

export default EmptyWorkload
