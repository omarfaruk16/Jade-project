'use client';

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import API_BASE from '@/lib/api';
import { Plus, Trash2, Edit2, ChevronDown, ChevronRight, X, Bold, Italic, List, ArrowUp, ArrowDown } from 'lucide-react';
import styles from './AdminDashboard.module.css';

const API = `${API_BASE}/services`;

// ─── tiny richtext toolbar ────────────────────────────────────────────────────
function RichEditor({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current && ref.current.innerHTML !== value) {
      ref.current.innerHTML = value;
    }
  }, []);

  const cmd = (command: string, val?: string) => {
    document.execCommand(command, false, val);
    if (ref.current) onChange(ref.current.innerHTML);
  };

  const btnStyle = (active = false): React.CSSProperties => ({
    padding: '6px 10px', background: active ? 'rgba(255,255,255,0.1)' : 'transparent',
    border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: 6, cursor: 'pointer', fontSize: 12
  });

  return (
    <div style={{ border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, overflow: 'hidden' }}>
      <div style={{ display: 'flex', gap: 6, padding: '8px 12px', background: 'rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <button type="button" style={btnStyle()} onMouseDown={e => { e.preventDefault(); cmd('bold'); }}><Bold size={13} /></button>
        <button type="button" style={btnStyle()} onMouseDown={e => { e.preventDefault(); cmd('italic'); }}><Italic size={13} /></button>
        <button type="button" style={btnStyle()} onMouseDown={e => { e.preventDefault(); cmd('insertOrderedList'); }}><List size={13} /></button>
        <button type="button" style={btnStyle()} onMouseDown={e => { e.preventDefault(); cmd('insertUnorderedList'); }}>• List</button>
      </div>
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        onInput={() => { if (ref.current) onChange(ref.current.innerHTML); }}
        className={styles.richEditorContent}
        style={{ minHeight: 100, padding: '12px 16px', background: 'rgba(0,0,0,0.3)', color: '#ffffff', outline: 'none', fontSize: 14, lineHeight: 1.6, caretColor: '#ffffff' }}
      />
    </div>
  );
}

// ─── input style ─────────────────────────────────────────────────────────────
const inp: React.CSSProperties = { background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', padding: '0.8rem 1rem', borderRadius: 12, color: '#fff', width: '100%', fontSize: 14, boxSizing: 'border-box', outline: 'none' };
const lbl: React.CSSProperties = { fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 6, display: 'block', fontWeight: 500 };
const card: React.CSSProperties = { background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 16, padding: '1.5rem', marginBottom: '1rem' };

export default function ServicesAdmin() {
  const token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : '';

  const [parents, setParents] = useState<any[]>([]);
  const [children, setChildren] = useState<any[]>([]);
  const [items, setItems] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const [view, setView] = useState<'parents' | 'children' | 'items'>('parents');

  // modals
  const [parentModal, setParentModal] = useState(false);
  const [editParent, setEditParent] = useState<any>(null);
  const [parentForm, setParentForm] = useState({ name: '' });


  const [childModal, setChildModal] = useState(false);
  const [editChild, setEditChild] = useState<any>(null);
  const [childForm, setChildForm] = useState({ name: '', parentId: '', description: '', coverImage: '', subtitle: '', statsNumber: '', statsText: '' });



  const [itemModal, setItemModal] = useState(false);
  const [editItem, setEditItem] = useState<any>(null);
  const [itemForm, setItemForm] = useState({ 
    title: '', childCategoryId: '', about: '', keyLine: '', imageUrl: '',
    overviewCategory: '', overviewBestFor: '', overviewStyleApproach: '',
    featureQuotesJson: '[]',
    whatsIncluded: [] as { title: string; description: string }[],
    gallery: [] as { url: string }[]
  });

  const fetchAll = async () => {
    const [pRes, cRes, iRes] = await Promise.all([
      fetch(`${API}/parents`),
      fetch(`${API}/children`),
      fetch(`${API}/items`)
    ]);
    setParents(await pRes.json());
    setChildren(await cRes.json());
    setItems(await iRes.json());
  };

  useEffect(() => { fetchAll(); }, []);

  const upload = async (file: File): Promise<string> => {
    setUploading(true);
    const fd = new FormData(); fd.append('image', file);
    const t = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : '';
    const res = await fetch(`${API_BASE}/upload`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${t}` },
      body: fd
    });
    const data = await res.json();
    setUploading(false);
    if (!res.ok) throw new Error(data.error || 'Upload failed');
    return data.url || '';
  };

  const getAuthHeaders = () => {
    const t = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : '';
    return { 'Content-Type': 'application/json', 'Authorization': `Bearer ${t}` };
  };


  // ── Parent CRUD ─────────────────────────────────────────────────────────────
  const saveParent = async () => {
    try {
      const method = editParent ? 'PUT' : 'POST';
      const url = editParent ? `${API}/parents/${editParent.id}` : `${API}/parents`;
      const res = await fetch(url, { method, headers: getAuthHeaders(), body: JSON.stringify(parentForm) });
      if (!res.ok) throw new Error(await res.text());
      setParentModal(false); fetchAll();
    } catch (e: any) { alert('Error saving parent: ' + e.message); }
  };

  const deleteParent = async (id: string) => {
    if (!confirm('Delete parent category and ALL its children/items?')) return;
    try {
      const res = await fetch(`${API}/parents/${id}`, { method: 'DELETE', headers: getAuthHeaders() });
      if (!res.ok) throw new Error(await res.text());
      fetchAll();
    } catch (e: any) { alert('Error deleting parent: ' + e.message); }
  };

  const uploadChildImage = async (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const url = await upload(file);
      setChildForm(prev => ({ ...prev, coverImage: url }));
    } catch (err: any) {
      alert('Image upload failed: ' + err.message);
    }
  };

  // ── Child CRUD ──────────────────────────────────────────────────────────────

  const saveChild = async () => {
    try {
      const method = editChild ? 'PUT' : 'POST';
      const url = editChild ? `${API}/children/${editChild.id}` : `${API}/children`;
      const res = await fetch(url, { method, headers: getAuthHeaders(), body: JSON.stringify(childForm) });
      if (!res.ok) throw new Error(await res.text());
      setChildModal(false); fetchAll();
    } catch (e: any) { alert('Error saving child: ' + e.message); }
  };

  const deleteChild = async (id: string) => {
    if (!confirm('Delete child category and ALL its service items?')) return;
    try {
      const res = await fetch(`${API}/children/${id}`, { method: 'DELETE', headers: getAuthHeaders() });
      if (!res.ok) throw new Error(await res.text());
      fetchAll();
    } catch (e: any) { alert('Error deleting child: ' + e.message); }
  };

  const reorderChild = async (parentId: string, childId: string, direction: 'up' | 'down') => {
    const siblings = children
      .filter(c => c.parentId === parentId)
      .sort((a: any, b: any) => a.order - b.order);
    const idx = siblings.findIndex((c: any) => c.id === childId);
    const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (swapIdx < 0 || swapIdx >= siblings.length) return;
    const reordered = [...siblings];
    [reordered[idx], reordered[swapIdx]] = [reordered[swapIdx], reordered[idx]];
    const ids = reordered.map((c: any) => c.id);
    try {
      const res = await fetch(`${API}/children/reorder`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({ ids })
      });
      if (!res.ok) throw new Error(await res.text());
      // Update local state optimistically
      setChildren(prev => {
        const updated = [...prev];
        reordered.forEach((c: any, i: number) => {
          const found = updated.findIndex(x => x.id === c.id);
          if (found !== -1) updated[found] = { ...updated[found], order: i };
        });
        return updated.sort((a: any, b: any) => a.order - b.order);
      });
    } catch (e: any) { alert('Error reordering: ' + e.message); }
  };

  // ── Item CRUD ───────────────────────────────────────────────────────────────
  const saveItem = async () => {
    try {
      const method = editItem ? 'PUT' : 'POST';
      const url = editItem ? `${API}/items/${editItem.id}` : `${API}/items`;
      const res = await fetch(url, { method, headers: getAuthHeaders(), body: JSON.stringify(itemForm) });
      if (!res.ok) throw new Error(await res.text());
      setItemModal(false); fetchAll();
    } catch (e: any) { alert('Error saving item: ' + e.message); }
  };

  const deleteItem = async (id: string) => {
    if (!confirm('Delete this service item?')) return;
    try {
      const res = await fetch(`${API}/items/${id}`, { method: 'DELETE', headers: getAuthHeaders() });
      if (!res.ok) throw new Error(await res.text());
      fetchAll();
    } catch (e: any) { alert('Error deleting item: ' + e.message); }
  };

  const openParentModal = (p?: any) => {
    setEditParent(p || null);
    setParentForm(p ? { name: p.name } : { name: '' });
    setParentModal(true);
  };


  const openChildModal = (c?: any) => {
    setEditChild(c || null);
    setChildForm(c ? { name: c.name, parentId: c.parentId, description: c.description || '', coverImage: c.coverImage || '', subtitle: c.subtitle || '', statsNumber: c.statsNumber || '', statsText: c.statsText || '' } : { name: '', parentId: parents[0]?.id || '', description: '', coverImage: '', subtitle: '', statsNumber: '', statsText: '' });
    setChildModal(true);
  };



  const openItemModal = (it?: any) => {
    setEditItem(it || null);
    setItemForm(it ? {
      title: it.title, about: it.about, keyLine: it.keyLine, imageUrl: it.imageUrl,
      childCategoryId: it.childCategoryId,
      overviewCategory: it.overviewCategory || '', overviewBestFor: it.overviewBestFor || '', overviewStyleApproach: it.overviewStyleApproach || '',
      featureQuotesJson: it.featureQuotesJson || '[]',
      whatsIncluded: it.whatsIncluded?.map((w: any) => ({ title: w.title, description: w.description })) || [],
      gallery: it.gallery?.map((g: any) => ({ url: g.url })) || []
    } : {
      title: '', about: '', keyLine: '', imageUrl: '', childCategoryId: children[0]?.id || '',
      overviewCategory: '', overviewBestFor: '', overviewStyleApproach: '',
      featureQuotesJson: '[]',
      whatsIncluded: [], gallery: []
    });
    setItemModal(true);
  };


  const tabBtn = (t: typeof view, label: string) => (
    <button
      onClick={() => setView(t)}
      className={`${styles.navButton} ${view === t ? styles.activeNav : ''}`}
      style={{ padding: '0.6rem 1.4rem' }}
    >{label}</button>
  );

  const overlayStyle: React.CSSProperties = {
    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(16px)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3000, padding: '2rem'
  };
  const modalStyle: React.CSSProperties = {
    background: '#111', borderRadius: 24, border: '1px solid rgba(255,255,255,0.1)', padding: '3rem',
    width: '100%', maxWidth: 700, maxHeight: '90vh', overflowY: 'auto', position: 'relative',
    boxShadow: '0 40px 100px rgba(0,0,0,0.5)'
  };

  return (
    <div>
      {/* Sub-tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: '2rem' }}>
        {tabBtn('parents', 'Parent Categories')}
        {tabBtn('children', 'Child Categories')}
        {tabBtn('items', 'Service Items')}
      </div>

      {/* ── PARENT CATEGORIES ─────────────────────────────────────────────── */}
      {view === 'parents' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ color: '#fff', fontSize: '1.2rem' }}>Parent Categories</h3>
            <button onClick={() => openParentModal()} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '0.6rem 1.2rem', background: '#fff', color: '#000', border: 'none', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}>
              <Plus size={16} /> Add Parent
            </button>
          </div>
          {parents.map(p => (
            <div key={p.id} style={card}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ color: '#fff', fontWeight: 600, fontSize: 15 }}>{p.name}</span>
                  <span style={{ color: '#555', fontSize: 12, marginLeft: 12 }}>{children.filter((c:any) => c.parentId === p.id).length} child categories</span>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button onClick={() => openParentModal(p)} style={{ padding: '6px 10px', background: '#1a1a1c', color: '#fff', border: '1px solid #333', borderRadius: 6, cursor: 'pointer' }}><Edit2 size={14} /></button>
                  <button onClick={() => deleteParent(p.id)} style={{ padding: '6px 10px', background: '#1a1a1c', color: '#ef4444', border: '1px solid #333', borderRadius: 6, cursor: 'pointer' }}><Trash2 size={14} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── CHILD CATEGORIES ──────────────────────────────────────────────── */}
      {view === 'children' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ color: '#fff', fontSize: '1.2rem' }}>Child Categories</h3>
            <button onClick={() => openChildModal()} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '0.6rem 1.2rem', background: '#fff', color: '#000', border: 'none', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}>
              <Plus size={16} /> Add Child Category
            </button>
          </div>
          {parents.map(p => (
            <div key={p.id} style={{ marginBottom: '1.5rem' }}>
              <div style={{ color: '#666', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>{p.name}</div>
{children
                .filter(c => c.parentId === p.id)
                .sort((a: any, b: any) => a.order - b.order)
                .map((c, idx, arr) => (
                <div key={c.id} style={{ ...card, marginLeft: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <button
                          onClick={() => reorderChild(p.id, c.id, 'up')}
                          disabled={idx === 0}
                          style={{ padding: '3px 5px', background: idx === 0 ? '#111' : '#1a1a1c', color: idx === 0 ? '#444' : '#fff', border: '1px solid #333', borderRadius: 4, cursor: idx === 0 ? 'not-allowed' : 'pointer', lineHeight: 1 }}
                          title="Move up"
                        ><ArrowUp size={11} /></button>
                        <button
                          onClick={() => reorderChild(p.id, c.id, 'down')}
                          disabled={idx === arr.length - 1}
                          style={{ padding: '3px 5px', background: idx === arr.length - 1 ? '#111' : '#1a1a1c', color: idx === arr.length - 1 ? '#444' : '#fff', border: '1px solid #333', borderRadius: 4, cursor: idx === arr.length - 1 ? 'not-allowed' : 'pointer', lineHeight: 1 }}
                          title="Move down"
                        ><ArrowDown size={11} /></button>
                      </div>
                      <div>
                        <span style={{ color: '#fff', fontWeight: 600 }}>{c.name}</span>
                        <span style={{ color: '#555', fontSize: 11, marginLeft: 12 }}>/{c.slug}</span>
                        <span style={{ color: '#555', fontSize: 12, marginLeft: 12 }}>{items.filter(i => i.childCategoryId === c.id).length} items</span>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <button onClick={() => openChildModal(c)} style={{ padding: '6px 10px', background: '#1a1a1c', color: '#fff', border: '1px solid #333', borderRadius: 6, cursor: 'pointer' }}><Edit2 size={14} /></button>
                      <button onClick={() => deleteChild(c.id)} style={{ padding: '6px 10px', background: '#1a1a1c', color: '#ef4444', border: '1px solid #333', borderRadius: 6, cursor: 'pointer' }}><Trash2 size={14} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* ── SERVICE ITEMS ─────────────────────────────────────────────────── */}
      {view === 'items' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ color: '#fff', fontSize: '1.2rem' }}>Service Items</h3>
            <button onClick={() => openItemModal()} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '0.6rem 1.2rem', background: '#fff', color: '#000', border: 'none', borderRadius: 8, fontWeight: 700, cursor: 'pointer' }}>
              <Plus size={16} /> Add Service Item
            </button>
          </div>
          {items.map(it => (
            <div key={it.id} style={card}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ color: '#fff', fontWeight: 700, fontSize: 15 }}>{it.title}</div>
                  <div style={{ color: '#555', fontSize: 12, marginTop: 4 }}>
                    {it.childCategory?.parent?.name} › {it.childCategory?.name}
                  </div>
                  <div style={{ color: '#F05C46', fontSize: 12, marginTop: 4, fontStyle: 'italic' }}>{it.keyLine}</div>
                  <div style={{ display: 'flex', gap: 12, marginTop: 6 }}>
                    <span style={{ color: '#555', fontSize: 11 }}>{it.whatsIncluded?.length || 0} included items</span>
                    <span style={{ color: '#555', fontSize: 11 }}>{it.gallery?.length || 0} gallery images</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
                  {it.imageUrl && <img src={it.imageUrl} alt="" style={{ width: 60, height: 45, objectFit: 'cover', borderRadius: 6 }} />}
                  <button onClick={() => openItemModal(it)} style={{ padding: '6px 10px', background: '#1a1a1c', color: '#fff', border: '1px solid #333', borderRadius: 6, cursor: 'pointer' }}><Edit2 size={14} /></button>
                  <button onClick={() => deleteItem(it.id)} style={{ padding: '6px 10px', background: '#1a1a1c', color: '#ef4444', border: '1px solid #333', borderRadius: 6, cursor: 'pointer' }}><Trash2 size={14} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ════════ PARENT MODAL ════════ */}
      {parentModal && typeof document !== 'undefined' && createPortal(
        <div style={overlayStyle}>
          <div style={modalStyle}>
            <button onClick={() => setParentModal(false)} style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}><X /></button>
            <h3 style={{ color: '#fff', marginBottom: '1.5rem' }}>{editParent ? 'Edit' : 'Add'} Parent Category</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div><label style={lbl}>Category Name</label><input style={inp} value={parentForm.name} onChange={e => setParentForm({ ...parentForm, name: e.target.value })} placeholder="e.g. Field of Expertise" /></div>
              <button onClick={saveParent} style={{ padding: '1rem', background: '#fff', color: '#000', border: 'none', borderRadius: 10, fontWeight: 800, cursor: 'pointer', marginTop: 8 }}>Save</button>
            </div>

          </div>
        </div>,
        document.body
      )}

      {/* ════════ CHILD MODAL ════════ */}
      {childModal && typeof document !== 'undefined' && createPortal(
        <div style={overlayStyle}>
          <div style={modalStyle}>
            <button onClick={() => setChildModal(false)} style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}><X /></button>
            <h3 style={{ color: '#fff', marginBottom: '1.5rem' }}>{editChild ? 'Edit' : 'Add'} Child Category</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div><label style={lbl}>Parent Category</label>
                <select style={{ ...inp }} value={childForm.parentId} onChange={e => setChildForm({ ...childForm, parentId: e.target.value })}>
                  {parents.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </div>
              <div><label style={lbl}>Child Category Name</label><input style={inp} value={childForm.name} onChange={e => setChildForm({ ...childForm, name: e.target.value })} placeholder="e.g. Residential Interior Design" /></div>
              <div><label style={lbl}>Subtitle</label><input style={inp} value={childForm.subtitle} onChange={e => setChildForm({ ...childForm, subtitle: e.target.value })} placeholder="e.g. Elegant, livable spaces" /></div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div><label style={lbl}>Stats Number</label><input style={inp} value={childForm.statsNumber} onChange={e => setChildForm({ ...childForm, statsNumber: e.target.value })} placeholder="e.g. 80+" /></div>
                <div><label style={lbl}>Stats Text</label><input style={inp} value={childForm.statsText} onChange={e => setChildForm({ ...childForm, statsText: e.target.value })} placeholder="e.g. / Tailored home environments" /></div>
              </div>
              <div><label style={lbl}>Short Description</label><textarea style={{...inp, height: '80px', resize: 'vertical'}} value={childForm.description} onChange={e => setChildForm({ ...childForm, description: e.target.value })} placeholder="e.g. We're a design-driven team..." /></div>
              <div>
                <label style={lbl}>Hero Cover Image</label>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <input style={{ ...inp, flex: 1, fontSize: 11 }} value={childForm.coverImage} readOnly placeholder="Upload or paste URL" />
                  <label style={{ padding: '0.6rem 1rem', background: '#1a1a1c', border: '1px solid #333', borderRadius: 8, color: '#fff', cursor: 'pointer', fontSize: 12, whiteSpace: 'nowrap' }}>
                    {uploading ? 'Uploading…' : 'Choose File'}
                    <input type="file" accept="image/*" style={{ display: 'none' }} onChange={uploadChildImage} />
                  </label>
                  {childForm.coverImage && <img src={childForm.coverImage} alt="Cover" style={{ width: 60, height: 45, objectFit: 'cover', borderRadius: 6 }} />}
                </div>
              </div>
              <button onClick={saveChild} style={{ padding: '1rem', background: '#fff', color: '#000', border: 'none', borderRadius: 10, fontWeight: 800, cursor: 'pointer', marginTop: 8 }}>Save</button>


            </div>
          </div>
        </div>,
        document.body
      )}

      {/* ════════ ITEM MODAL ════════ */}
      {itemModal && typeof document !== 'undefined' && createPortal(
        <div style={overlayStyle}>
          <div style={{ ...modalStyle, maxWidth: 860 }}>
            <button onClick={() => setItemModal(false)} style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}><X /></button>
            <h3 style={{ color: '#fff', marginBottom: '1.5rem' }}>{editItem ? 'Edit' : 'Add'} Service Item</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>

              {/* Child Category */}
              <div><label style={lbl}>Child Category</label>
                <select style={inp} value={itemForm.childCategoryId} onChange={e => setItemForm({ ...itemForm, childCategoryId: e.target.value })}>
                  {children.map(c => <option key={c.id} value={c.id}>{c.parent?.name} › {c.name}</option>)}
                </select>
              </div>

              {/* Title */}
              <div><label style={lbl}>Title</label><input style={inp} value={itemForm.title} onChange={e => setItemForm({ ...itemForm, title: e.target.value })} placeholder="Service title" /></div>

              {/* Overview Fields */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div><label style={lbl}>Overview Category</label><input style={inp} value={itemForm.overviewCategory} onChange={e => setItemForm({ ...itemForm, overviewCategory: e.target.value })} placeholder="e.g. House Design" /></div>
                <div><label style={lbl}>Overview Best For</label><input style={inp} value={itemForm.overviewBestFor} onChange={e => setItemForm({ ...itemForm, overviewBestFor: e.target.value })} placeholder="e.g. Private Lifestyle" /></div>
                <div><label style={lbl}>Overview Style Approach</label><input style={inp} value={itemForm.overviewStyleApproach} onChange={e => setItemForm({ ...itemForm, overviewStyleApproach: e.target.value })} placeholder="e.g. Luxury Natural" /></div>
              </div>

              {/* About */}
              <div><label style={lbl}>About Service</label><textarea style={{ ...inp, minHeight: 90 }} value={itemForm.about} onChange={e => setItemForm({ ...itemForm, about: e.target.value })} placeholder="Description of this service..." /></div>

              {/* Key Line */}
              <div><label style={lbl}>Key Line <span style={{ color: '#F05C46' }}>(shown on orange background)</span></label><input style={inp} value={itemForm.keyLine} onChange={e => setItemForm({ ...itemForm, keyLine: e.target.value })} placeholder="One-line highlight..." /></div>

              {/* Image */}
              <div>
                <label style={lbl}>Service Image (right side)</label>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <input style={{ ...inp, flex: 1, fontSize: 11 }} value={itemForm.imageUrl} readOnly placeholder="Upload or paste URL" />
                  <label style={{ padding: '0.6rem 1rem', background: '#1a1a1c', border: '1px solid #333', borderRadius: 8, color: '#fff', cursor: 'pointer', fontSize: 12, whiteSpace: 'nowrap' }}>
                    {uploading ? 'Uploading…' : 'Choose File'}
                    <input type="file" accept="image/*" style={{ display: 'none' }} onChange={async e => {
                      const file = e.target.files?.[0]; if (!file) return;
                      const url = await upload(file);
                      setItemForm(f => ({ ...f, imageUrl: url }));
                    }} />
                  </label>
                  {itemForm.imageUrl && <img src={itemForm.imageUrl} alt="" style={{ width: 60, height: 45, objectFit: 'cover', borderRadius: 6 }} />}
                </div>
              </div>

              {/* What's Included */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <label style={{ ...lbl, margin: 0 }}>What&apos;s Included Items</label>
                  <button type="button" onClick={() => setItemForm(f => ({ ...f, whatsIncluded: [...f.whatsIncluded, { title: '', description: '' }] }))}
                    style={{ padding: '4px 10px', background: '#1a1a1c', border: '1px solid #333', borderRadius: 6, color: '#fff', cursor: 'pointer', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Plus size={12} /> Add Item
                  </button>
                </div>
                {itemForm.whatsIncluded.map((w, idx) => (
                  <div key={idx} style={{ background: '#0a0a0c', border: '1px solid #222', borderRadius: 10, padding: '1rem', marginBottom: 8 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                      <span style={{ color: '#666', fontSize: 12 }}>Item {idx + 1}</span>
                      <button type="button" onClick={() => setItemForm(f => ({ ...f, whatsIncluded: f.whatsIncluded.filter((_, i) => i !== idx) }))}
                        style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}><Trash2 size={13} /></button>
                    </div>
                    <input style={{ ...inp, marginBottom: 8 }} value={w.title} onChange={e => {
                      const arr = [...itemForm.whatsIncluded]; arr[idx].title = e.target.value;
                      setItemForm(f => ({ ...f, whatsIncluded: arr }));
                    }} placeholder="Item title (e.g. Date, Category)" />
                    <RichEditor value={w.description} onChange={v => {
                      const arr = [...itemForm.whatsIncluded]; arr[idx].description = v;
                      setItemForm(f => ({ ...f, whatsIncluded: arr }));
                    }} />
                  </div>
                ))}
              </div>

              {/* Feature Quotes */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <label style={{ ...lbl, margin: 0 }}>Feature Quotes (Right side of Features section)</label>
                  <button type="button" onClick={() => {
                    const quotes = JSON.parse(itemForm.featureQuotesJson || "[]");
                    setItemForm({ ...itemForm, featureQuotesJson: JSON.stringify([...quotes, ""]) });
                  }}
                    style={{ padding: '4px 10px', background: '#1a1a1c', border: '1px solid #333', borderRadius: 6, color: '#fff', cursor: 'pointer', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Plus size={12} /> Add Quote
                  </button>
                </div>
                {JSON.parse(itemForm.featureQuotesJson || "[]").map((q: string, idx: number) => (
                  <div key={idx} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                    <input style={inp} value={q} onChange={e => {
                      const quotes = JSON.parse(itemForm.featureQuotesJson || "[]");
                      quotes[idx] = e.target.value;
                      setItemForm({ ...itemForm, featureQuotesJson: JSON.stringify(quotes) });
                    }} placeholder="Quote text..." />
                    <button type="button" onClick={() => {
                      const quotes = JSON.parse(itemForm.featureQuotesJson || "[]");
                      quotes.splice(idx, 1);
                      setItemForm({ ...itemForm, featureQuotesJson: JSON.stringify(quotes) });
                    }} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}><Trash2 size={18}/></button>
                  </div>
                ))}
              </div>

              {/* Gallery */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <label style={{ ...lbl, margin: 0 }}>Gallery Images</label>
                  <label style={{ padding: '4px 10px', background: '#1a1a1c', border: '1px solid #333', borderRadius: 6, color: '#fff', cursor: 'pointer', fontSize: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Plus size={12} /> Add Images
                    <input type="file" accept="image/*" multiple style={{ display: 'none' }} onChange={async e => {
                      const files = Array.from(e.target.files || []);
                      const urls = await Promise.all(files.map(f => upload(f)));
                      setItemForm(f => ({ ...f, gallery: [...f.gallery, ...urls.map(url => ({ url }))] }));
                    }} />
                  </label>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                  {itemForm.gallery.map((g, idx) => (
                    <div key={idx} style={{ position: 'relative' }}>
                      <img src={g.url} alt="" style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', borderRadius: 8 }} />
                      <button type="button" onClick={() => setItemForm(f => ({ ...f, gallery: f.gallery.filter((_, i) => i !== idx) }))}
                        style={{ position: 'absolute', top: 4, right: 4, background: 'rgba(0,0,0,0.7)', border: 'none', color: '#ef4444', borderRadius: '50%', width: 22, height: 22, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <button onClick={saveItem} disabled={uploading} style={{ padding: '1.1rem', background: uploading ? '#444' : '#fff', color: uploading ? '#888' : '#000', border: 'none', borderRadius: 12, fontWeight: 800, fontSize: 15, cursor: uploading ? 'not-allowed' : 'pointer', marginTop: 8 }}>
                {uploading ? 'Uploading images…' : 'Save Service Item'}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
