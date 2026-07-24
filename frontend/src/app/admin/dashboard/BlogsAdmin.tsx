'use client';

import { useEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import dynamic from 'next/dynamic';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import API_BASE from '@/lib/api';

const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

const inp: React.CSSProperties = {
  width: '100%', padding: '0.75rem 1rem', borderRadius: '8px',
  background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
  color: '#fff', fontSize: '0.95rem', outline: 'none', boxSizing: 'border-box'
};
const lbl: React.CSSProperties = {
  display: 'block', marginBottom: '0.5rem', fontSize: '0.8rem',
  fontWeight: 600, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.05em'
};

export default function BlogsAdmin() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({ title: '', coverImage: '', description: '' });

  const fetchBlogs = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/blogs`);
      setBlogs(await res.json());
    } catch (e) { console.error(e); }
  }, []);

  useEffect(() => { fetchBlogs(); }, [fetchBlogs]);

  const openModal = (blog?: any) => {
    setEditing(blog || null);
    setForm(blog ? { title: blog.title, coverImage: blog.coverImage, description: blog.description } : { title: '', coverImage: '', description: '' });
    setModal(true);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append('image', file);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${API_BASE}/upload`, { method: 'POST', body: fd, headers: { 'Authorization': `Bearer ${token}` } });
      const data = await res.json();
      if (data.url) setForm(prev => ({ ...prev, coverImage: data.url }));
    } catch (e) { console.error(e); }
    finally { setUploading(false); }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    const method = editing ? 'PUT' : 'POST';
    const url = editing ? `${API_BASE}/blogs/${editing.id}` : `${API_BASE}/blogs`;
    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(form)
      });
      if (res.ok) { setModal(false); fetchBlogs(); }
    } catch (e) { console.error(e); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this blog post?')) return;
    const token = localStorage.getItem('adminToken');
    try {
      await fetch(`${API_BASE}/blogs/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
      fetchBlogs();
    } catch (e) { console.error(e); }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h3 style={{ color: '#fff', fontSize: '1.2rem', fontWeight: 600 }}>All Blog Posts ({blogs.length})</h3>
        <button onClick={() => openModal()} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#fff', color: '#000', border: 'none', borderRadius: '9999px', padding: '0.6rem 1.4rem', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem' }}>
          <Plus size={16} /> Add Blog Post
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {blogs.map(blog => (
          <div key={blog.id} style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', padding: '1rem 1.25rem', background: 'rgba(255,255,255,0.04)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.07)' }}>
            <img src={blog.coverImage} alt={blog.title} style={{ width: 80, height: 56, objectFit: 'cover', borderRadius: 8, flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <h4 style={{ color: '#fff', fontWeight: 600, marginBottom: '0.25rem' }}>{blog.title}</h4>
              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>{new Date(blog.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button onClick={() => openModal(blog)} style={{ background: 'rgba(255,255,255,0.08)', border: 'none', color: '#fff', width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><Edit2 size={15} /></button>
              <button onClick={() => handleDelete(blog.id)} style={{ background: 'rgba(239,68,68,0.15)', border: 'none', color: '#ef4444', width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><Trash2 size={15} /></button>
            </div>
          </div>
        ))}
        {blogs.length === 0 && (
          <p style={{ color: 'rgba(255,255,255,0.4)', textAlign: 'center', padding: '3rem 0' }}>No blog posts yet. Click "Add Blog Post" to create your first one.</p>
        )}
      </div>

      {modal && typeof document !== 'undefined' && createPortal(
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', zIndex: 1000, padding: '2rem', overflowY: 'auto' }}>
          <div style={{ background: '#111', borderRadius: '16px', padding: '2.5rem', width: '100%', maxWidth: '800px', position: 'relative', marginBottom: '2rem' }}>
            <button onClick={() => setModal(false)} style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><X size={18} /></button>
            <h3 style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 700, marginBottom: '2rem' }}>{editing ? 'Edit' : 'New'} Blog Post</h3>
            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div><label style={lbl}>Blog Title</label><input required style={inp} value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="e.g. A Go-To Neutral Cabinet Color" /></div>
              <div>
                <label style={lbl}>Cover Image {uploading && '(Uploading...)'}</label>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <input readOnly style={{ ...inp, flex: 1 }} value={form.coverImage} placeholder="Upload or paste URL" />
                  <label style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', padding: '0.75rem 1.25rem', borderRadius: '8px', cursor: 'pointer', fontSize: '0.85rem', whiteSpace: 'nowrap' }}>
                    Choose File
                    <input type="file" accept="image/*" onChange={handleUpload} style={{ display: 'none' }} />
                  </label>
                </div>
                {form.coverImage && <img src={form.coverImage} alt="preview" style={{ marginTop: '0.75rem', width: '100%', height: 200, objectFit: 'cover', borderRadius: 8 }} />}
              </div>
              <div data-color-mode="dark">
                <label style={lbl}>Content (Markdown)</label>
                <MDEditor
                  value={form.description}
                  onChange={val => setForm({ ...form, description: val || '' })}
                  height={320}
                  preview="edit"
                />
              </div>
              <button type="submit" disabled={uploading} style={{ background: '#fff', color: '#000', border: 'none', borderRadius: '9999px', padding: '0.9rem 2rem', fontWeight: 700, fontSize: '1rem', cursor: uploading ? 'not-allowed' : 'pointer', opacity: uploading ? 0.6 : 1 }}>
                {uploading ? 'Uploading...' : editing ? 'Update Blog Post' : 'Publish Blog Post'}
              </button>
            </form>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
