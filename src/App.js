import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from 'react';

import Home from "./pages/Home";
import CreateNotes from "./pages/CreateNotes";
import EditNotes from "./pages/EditNotes";


const App = () => {

    const [notes, setNotes] = useState(JSON.parse(localStorage.getItem('notes')) || []);
    
    useEffect(() => {
        localStorage.setItem('notes', JSON.stringify(notes));
    })

    return (
    <main id="app">
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home notes={notes}/>}/>
            <Route path="/create-note" element={<CreateNotes setNotes={setNotes}/>}/>
            <Route path="/edit-note/:id" element={<EditNotes notes={notes} setNotes={setNotes}/>}/>
        </Routes>
    </BrowserRouter>
    </main>
  )
}

export default App