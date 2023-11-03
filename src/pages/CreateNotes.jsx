import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import useCreateDate from '../components/useCreateDate';

import { Button, TextareaAutosize, Input } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const CreateNotes = ({setNotes}) => {
  
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const date = useCreateDate();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(title && details) {
      const note = {id: uuid(), title, details, date};
      setNotes(prevNotes => [note, ...prevNotes]);
      navigate("/");
    }
    
  }

  return (
    <section>
      <header className="create-note__header">
        <Link to="/"><ArrowBackIosIcon/></Link>
        <Button onClick={handleSubmit}>Save</Button>
      </header>
      <form className='create-note__form' onSubmit={handleSubmit}>
        <Input type='text' placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} autoFocus/>
        <TextareaAutosize minRows={40} placeholder='Note details...' value={details} onChange={(e) => setDetails(e.target.value)}></TextareaAutosize>
      </form>
    </section>
  )
}

export default CreateNotes