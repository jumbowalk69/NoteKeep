import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import useCreateDate from '../components/useCreateDate';

import { Button, Input } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import TextareaAutosize from '@mui/material/TextareaAutosize';

const EditNotes = ({notes, setNotes}) => {
  const {id} = useParams();
  const note = notes.find((item) => item.id == id);
  const [title, setTitle] = useState(note.title);
  const [details, setDetails] = useState(note.details);
  const date = useCreateDate();
  const navigate = useNavigate();

  const handleForm = (e) => {
    e.preventDefault();
    if(title && details){
      const newNote = {...note, title, details, date};

      const newNotes = notes.map(item => {
        if(item.id === id){
          item = newNote;
        }
        return item;
      })
      setNotes(newNotes);
    }
    navigate("/");
  }

  const handleDelete = () => {
    if(window.confirm("Are you sure you want to delete this note?")){
      const newNotes = notes.filter(item => item.id !== id);
      setNotes(newNotes);
      navigate("/");
    }
  }


  return (
    <section>
      <header className="create-note__header">
        <Link to="/"><ArrowBackIosIcon/></Link>
        <Button onClick={handleForm}>Save</Button>
        <Button color='error' onClick={handleDelete}><DeleteOutlineIcon/></Button>
      </header>
      <form className='create-note__form' onSubmit={handleForm}>
        <Input type='text' placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} autoFocus/>
        <TextareaAutosize minRows={40} placeholder='Note details...' value={details} onChange={(e) => setDetails(e.target.value)}></TextareaAutosize>
      </form>
    </section>
  )
}

export default EditNotes