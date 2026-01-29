import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Palette } from 'lucide-react';
import useAppStore from '../store/useAppStore';

const noteColors = [
  { name: 'yellow', bg: 'bg-yellow-500/20', border: 'border-yellow-500/50', text: 'text-yellow-400' },
  { name: 'blue', bg: 'bg-blue-500/20', border: 'border-blue-500/50', text: 'text-blue-400' },
  { name: 'green', bg: 'bg-green-500/20', border: 'border-green-500/50', text: 'text-green-400' },
  { name: 'purple', bg: 'bg-purple-500/20', border: 'border-purple-500/50', text: 'text-purple-400' },
  { name: 'pink', bg: 'bg-pink-500/20', border: 'border-pink-500/50', text: 'text-pink-400' },
];

function Notes() {
  const { notes, addNote, updateNote, deleteNote } = useAppStore();
  const [showNewNote, setShowNewNote] = useState(false);
  const [newNote, setNewNote] = useState({ title: '', content: '', color: 'yellow' });

  const handleCreateNote = () => {
    if (newNote.title.trim() || newNote.content.trim()) {
      addNote(newNote);
      setNewNote({ title: '', content: '', color: 'yellow' });
      setShowNewNote(false);
    }
  };

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Notes
          </h1>
          <p className="text-slate-400">Your sticky notes</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowNewNote(true)}
          className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold flex items-center gap-2 shadow-lg shadow-cyan-500/50"
        >
          <Plus size={20} />
          New Note
        </motion.button>
      </div>

      <AnimatePresence>
        {showNewNote && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="p-6 rounded-2xl bg-dark-card/50 backdrop-blur-xl border border-dark-border"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Create New Note</h3>
              <button
                onClick={() => setShowNewNote(false)}
                className="p-2 rounded hover:bg-dark-surface"
              >
                <X size={20} />
              </button>
            </div>
            <input
              type="text"
              placeholder="Note title..."
              value={newNote.title}
              onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
              className="w-full p-3 mb-4 rounded-lg bg-dark-surface border border-dark-border text-slate-200 focus:outline-none focus:border-cyan-500"
            />
            <textarea
              placeholder="Note content..."
              value={newNote.content}
              onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
              rows={6}
              className="w-full p-3 mb-4 rounded-lg bg-dark-surface border border-dark-border text-slate-200 focus:outline-none focus:border-cyan-500 resize-none"
            />
            <div className="flex items-center gap-4 mb-4">
              <Palette size={20} className="text-slate-400" />
              <div className="flex gap-2">
                {noteColors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setNewNote({ ...newNote, color: color.name })}
                    className={`w-8 h-8 rounded-full border-2 ${
                      newNote.color === color.name ? 'border-white scale-110' : 'border-transparent'
                    } ${color.bg}`}
                  />
                ))}
              </div>
            </div>
            <button
              onClick={handleCreateNote}
              className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold hover:shadow-lg shadow-cyan-500/50 transition-all"
            >
              Create Note
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {notes.map((note) => {
            const colorStyle = noteColors.find((c) => c.name === note.color) || noteColors[0];
            return (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={`p-6 rounded-2xl ${colorStyle.bg} border ${colorStyle.border} backdrop-blur-xl relative group`}
              >
                <button
                  onClick={() => deleteNote(note.id)}
                  className="absolute top-4 right-4 p-2 rounded-lg bg-dark-surface/50 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/20"
                >
                  <X size={16} className="text-slate-400 hover:text-red-400" />
                </button>
                <input
                  type="text"
                  value={note.title}
                  onChange={(e) => updateNote(note.id, { title: e.target.value })}
                  className={`w-full mb-3 font-semibold text-lg bg-transparent border-none focus:outline-none ${colorStyle.text}`}
                  placeholder="Note title..."
                />
                <textarea
                  value={note.content}
                  onChange={(e) => updateNote(note.id, { content: e.target.value })}
                  className="w-full h-32 bg-transparent border-none focus:outline-none text-slate-300 resize-none"
                  placeholder="Note content..."
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {notes.length === 0 && !showNewNote && (
        <div className="text-center py-16">
          <p className="text-slate-400 text-lg mb-4">No notes yet</p>
          <p className="text-slate-500">Click "New Note" to create your first note</p>
        </div>
      )}
    </div>
  );
}

export default Notes;
