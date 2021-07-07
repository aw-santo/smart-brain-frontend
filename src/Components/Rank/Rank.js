import React from 'react';


const Rank = ( {name, count}) => {
    return(
        <div>
            <div className='white f3'>
                <span style={{textTransform:'capitalize', fontWeight: 'bold'}}>{name}</span>{`, your current entry count is...`}
            </div>
            <div className='white f1'>
                {count}
            </div>
        </div>
    );
}

export default Rank;