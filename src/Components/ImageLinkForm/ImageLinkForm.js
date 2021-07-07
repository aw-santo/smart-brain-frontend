import React from 'react';
import './ImageLinkForm.css';


const ImageLinkForm = ({onInputChange, onSubmit}) => {
    return(
        <div>
            <p className='f3 b op'>
                {"This Magic Brain will detect faces in your pictures. Give it a try!"}
            </p>
            <div className='pa4 br3 shadow-5 form center'>
                <input type='text' className='f4 pa2 w-70' onChange={onInputChange}></input>
                <button className='w-30 grow link f4 ph3 pv2 dib white bg-light-purple' onClick={onSubmit}>Detect</button>
            </div>
        </div>
    );
}

export default ImageLinkForm;