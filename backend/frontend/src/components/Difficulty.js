import React from 'react'
import { ProgressBar } from 'react-bootstrap'

function Difficulty({value, text, color}) {
    return (
        <div className="difficulty">
            <ProgressBar 

                variant= {
                    value > 4
                    ? 'danger'
                    : value >= 3
                        ? 'warning'
                        : 'success'
                }
                now={
                    value*20
                } 
                label={
                    value*20 <30
                    ? `${value*20}%`
                    : `Difficulty ${value*20}%`
                }
            />
           {/* <span>
               <i style={{ color }} className={
                value >= 1
                    ? 'fas fa-star'
                    : value >= 0.5
                        ? 'fas fa-star-half-alt'
                        : 'far fa-star'
               }>
               </i>
           </span>
           <span>
               <i style={{ color }} className={
                value >= 2
                    ? 'fas fa-star'
                    : value >= 1.5
                        ? 'fas fa-star-half-alt'
                        : 'far fa-star'
               }>
               </i>
           </span>
           <span>
               <i style={{ color }} className={
                value >= 3
                    ? 'fas fa-star'
                    : value >= 2.5
                        ? 'fas fa-star-half-alt'
                        : 'far fa-star'
               }>
               </i>
           </span>
           <span>
               <i style={{ color }} className={
                value >= 4
                    ? 'fas fa-star'
                    : value >= 3.5
                        ? 'fas fa-star-half-alt'
                        : 'far fa-star'
               }>
               </i>
           </span>
           <span>
               <i style={{ color }} className={
                value >= 5
                    ? 'fas fa-star'
                    : value >= 4.5
                        ? 'fas fa-star-half-alt'
                        : 'far fa-star'
               }>
               </i>
           </span>
           <span>{text && text}</span> */}
        </div>
    )
}

export default Difficulty
