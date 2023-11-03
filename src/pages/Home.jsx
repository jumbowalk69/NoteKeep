import React, { useEffect, useState } from "react";
import NoteItem from "../components/NoteItem";

import { Button, Input } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';


const Notes = ({notes}) => {

  const [show, setShow] = useState(false);

  const [text, setText] = useState("");
  const [filteredNotes, setFilteredNotes] = useState(notes);

  const handleSearch = () => {
    setFilteredNotes(notes.filter(note => {
      if(note.title.toLowerCase().match(text.toLocaleLowerCase())){
        return note;
      }
    }))
  }

  useEffect(() => {
    handleSearch();
    if (!show) {
      setText(""); // Clear the text when show is false
    }
  }, [show, text]);

  return (
    <section>
      <header className="notes__header">
        {!show && <div><h2>NoteKeep</h2><p>by jumbowalk69</p></div>}
        {show && <Input type="text" value={text} placeholder="Search..." 
        onChange={(e) => {setText(e.target.value); handleSearch();}} autoFocus/>}
        <Button onClick={() => setShow(prevState => !prevState)} style={{color: 'grey'}}>
          {show ?  <ClearIcon/> : <SearchIcon/>}</Button>
      </header>
      <div className="notes__container">
        {filteredNotes.length == 0 && <p className="empty__note">No notes found.</p>}
        {
          filteredNotes.map(note => <NoteItem key={note.id} note={note}/>)
        }
      </div>
      <Button href="/create-note" style={{
        position: 'fixed', bottom: '4rem', right: '1rem',
      }}><AddIcon/></Button>
    </section>
  )
}

export default Notes