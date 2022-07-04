// Dependecies
import React, { useState, useEffect } from 'react'
import axios from 'axios';

// Styles
import './ArgonautsList.css'


// ********** COMPONENTS ********** //  
function ArgonautsList() {

    // *** STATES *** //
    const [argonautList, setArgonautList]= useState([]);
    const [newArgonautName, setNewArgonautName]= useState('');
    const [argonautCount, setArgonautCount ]= useState(0);

    // *** LIFECYCLE FUNCTIONS *** // 
 
    //Fetch Data from DataBase - READ from "CRUD" //
    useEffect(()=>{
        const getArgonautList = async () =>{
            try {
                const res = await axios.get('http://localhost:5500/api/argonauts')
                console.log(res.data)
                setArgonautList(res.data);
                setArgonautCount(res.data.length);
            } catch (err) {
                console.log(err)
            }
        }
        getArgonautList();
    },[argonautCount]);


    // *** FUNCTIONNALITTIES *** // 

    // Increment or decremente ArgonautCounter // 
    const countArgonautUpdate = (a) => {
        setArgonautCount(argonautCount+a);
    }
    
    // Created New Argonaut - CREATE from "CRUD" //
    const AddNewArgonaut = async (e) =>{
        e.preventDefault();
        try {
            const res = await axios.post(
                'http://localhost:5500/api/argonaut',
                {name: newArgonautName }
            );
            console.log(res);
            setNewArgonautName("");
            countArgonautUpdate(1);
        } catch (err) {
            console.log(err);
        }
    }

    // Delete a Argonaut from DataBAse - DELETE from "CRUD" // 
    const deleteArgonaut = async  (id, name) => {
        try {
            const res = await axios.delete(`http://localhost:5500/api/argonaut/${id}`);
            console.log( 'Argonaut '+name+' deleted');
            countArgonautUpdate(-1);
        } catch (err) {
            console.log(err);
        }
    }



    return (
        <div className='container'>
            <div className='title'>
                <h2> Ajouter un Argonaute</h2>
            </div>
            <form className='argo-input'
                onSubmit={(e) => {AddNewArgonaut(e)}}>
                <label>
                    Nom de l'argonaut :
                </label>
                <input 
                    className='text-input'
                    type="text"
                    placeholder='Nom...'
                    value={newArgonautName}
                    onChange={(e) => setNewArgonautName(e.target.value)}
                />
                <input 
                    className='button'
                    type='submit'
                    value="Ajouter"
                    />
            </form>
            <div className='argo-counter'>
                Membre d'équipage : {argonautCount}
            </div>
            <div className='argo-list'>
                {argonautList.map((argonaut) => {
                    return(
                        <div className='argonaut' key={argonaut.id}>
                            <p>{argonaut.name}</p>
                            <div 
                                className='del-btn'
                                children="x"
                                onClick={() => { 
                                    deleteArgonaut(argonaut._id, argonaut.name)
                                }}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default ArgonautsList