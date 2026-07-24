'use client';

import { useEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import API_BASE from '@/lib/api';
import { X, Edit2, Trash2, Eye, Plus, Upload, PlusCircle, GripVertical } from 'lucide-react';
import styles from './AdminDashboard.module.css';
import { useRouter } from 'next/navigation';

interface ProcessStep {
  title: string;
  desc: string;
}

interface ProjectFormData {
  title: string;
  subtitle: string;
  coverImage: string;
  date: string;
  category: string;
  spacePlan: string;
  timeline: string;
  overviewDesc: string;
  overviewImage: string;
  galleryJson: string[];
  processImage: string;
  processStepsJson: ProcessStep[];
}

const EMPTY_FORM: ProjectFormData = {
  title: '', subtitle: '', coverImage: '',
  date: '', category: '', spacePlan: '', timeline: '',
  overviewDesc: '', overviewImage: '',
  galleryJson: [],
  processImage: '',
  processStepsJson: [],
};

export default function ProjectsAdmin() {
  const router = useRouter();
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [form, setForm] = useState<ProjectFormData>(EMPTY_FORM);
  const [uploading, setUploading] = useState<string | null>(null); // tracks which field is uploading

  const fetchProjects = useCallback(async () => {
    const res = await fetch(`${API_BASE}/projects`);
    setProjects(await res.json());
    setLoading(false);
  }, []);

  useEffect(() => { fetchProjects(); }, [fetchProjects]);

  // ─── Upload helper ─────────────────────────────────────────────────────────
  const upload = async (file: File): Promise<string | null> => {
    const fd = new FormData();
    fd.append('image', file);
    const token = localStorage.getItem('adminToken');
    const res = await fetch(`${API_BASE}/upload`, {
      method: 'POST', body: fd,
      headers: { 'Authorization': `Bearer ${token}` },
    });
    const data = await res.json();
    return data.url || null;
  };

  const handleSingleUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: keyof ProjectFormData) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(field);
    const url = await upload(file);
    if (url) setForm(prev => ({ ...prev, [field]: url }));
    setUploading(null);
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploading('gallery');
    const urls: string[] = [];
    for (const file of files) {
      const url = await upload(file);
      if (url) urls.push(url);
    }
    setForm(prev => ({ ...prev, galleryJson: [...prev.galleryJson, ...urls] }));
    setUploading(null);
  };

  const removeGalleryImage = (idx: number) => {
    setForm(prev => ({ ...prev, galleryJson: prev.galleryJson.filter((_, i) => i !== idx) }));
  };

  // ─── Process steps ─────────────────────────────────────────────────────────
  const addStep = () => {
    setForm(prev => ({ ...prev, processStepsJson: [...prev.processStepsJson, { title: '', desc: '' }] }));
  };

  const updateStep = (idx: number, key: 'title' | 'desc', val: string) => {
    setForm(prev => {
      const steps = [...prev.processStepsJson];
      steps[idx] = { ...steps[idx], [key]: val };
      return { ...prev, processStepsJson: steps };
    });
  };

  const removeStep = (idx: number) => {
    setForm(prev => ({ ...prev, processStepsJson: prev.processStepsJson.filter((_, i) => i !== idx) }));
  };

  // ─── Open/Close Modal ───────────────────────────────────────────────────────
  const openModal = (item: any = null) => {
    if (item) {
      let gallery: string[] = [];
      let steps: ProcessStep[] = [];
      try { gallery = JSON.parse(item.galleryJson || '[]'); } catch { gallery = []; }
      try { steps = JSON.parse(item.processStepsJson || '[]'); } catch {
        // fallback: build from legacy fields
        steps = [];
        if (item.p1Title) steps.push({ title: item.p1Title, desc: item.p1Desc });
        if (item.p2Title) steps.push({ title: item.p2Title, desc: item.p2Desc });
        if (item.p3Title) steps.push({ title: item.p3Title, desc: item.p3Desc });
      }
      setEditingItem(item);
      setForm({
        title: item.title || '', subtitle: item.subtitle || '',
        coverImage: item.coverImage || '',
        date: item.date || '', category: item.category || '',
        spacePlan: item.spacePlan || item.client || '',
        timeline: item.timeline || '',
        overviewDesc: item.overviewDesc || '',
        overviewImage: item.overviewImage || '',
        galleryJson: gallery,
        processImage: item.processImage || '',
        processStepsJson: steps,
      });
    } else {
      setEditingItem(null);
      setForm(EMPTY_FORM);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => { setIsModalOpen(false); setEditingItem(null); };

  // ─── Save ──────────────────────────────────────────────────────────────────
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    const method = editingItem ? 'PUT' : 'POST';
    const url = editingItem ? `${API_BASE}/projects/${editingItem.id}` : `${API_BASE}/projects`;

    const payload = {
      ...form,
      galleryJson: JSON.stringify(form.galleryJson),
      processStepsJson: JSON.stringify(form.processStepsJson),
    };

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(payload),
    });
    if (res.ok) { closeModal(); fetchProjects(); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this project?')) return;
    const token = localStorage.getItem('adminToken');
    await fetch(`${API_BASE}/projects/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` },
    });
    fetchProjects();
  };

  if (loading) return <div style={{ padding: '2rem', color: 'rgba(255,255,255,0.5)' }}>Loading projects...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.5rem' }}>
        <button onClick={() => openModal()} className={styles.addNewBtn}>
          <Plus size={18} /> Add New Project
        </button>
      </div>

      {/* Table */}
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Cover</th>
              <th>Title</th>
              <th>Category</th>
              <th>Date</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map(p => (
              <tr key={p.id}>
                <td>
                  {p.coverImage && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.coverImage} alt={p.title}
                      style={{ width: 60, height: 40, objectFit: 'cover', borderRadius: 6 }} />
                  )}
                </td>
                <td style={{ fontWeight: 600 }}>{p.title}</td>
                <td style={{ color: 'rgba(255,255,255,0.55)' }}>{p.category}</td>
                <td style={{ color: 'rgba(255,255,255,0.55)' }}>{p.date}</td>
                <td style={{ textAlign: 'right' }}>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                    <button onClick={() => router.push(`/projects/${p.id}`)} className={styles.actionBtn} title="View">
                      <Eye size={17} />
                    </button>
                    <button onClick={() => openModal(p)} className={styles.actionBtn} title="Edit">
                      <Edit2 size={17} />
                    </button>
                    <button onClick={() => handleDelete(p.id)} className={`${styles.actionBtn} ${styles.deleteBtn}`} title="Delete">
                      <Trash2 size={17} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && typeof document !== 'undefined' && createPortal(
        <div className={styles.modalOverlay}>
          <div className={styles.modal} style={{ maxWidth: 960, width: '95vw' }}>
            <button onClick={closeModal} className={styles.closeModal}><X size={20} /></button>
            <h3 style={{ marginBottom: '2rem', fontSize: '1.6rem', fontWeight: 700 }}>
              {editingItem ? 'Edit Project' : 'Add New Project'}
            </h3>

            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', overflowY: 'auto', maxHeight: '80vh', paddingRight: 8 }}>

              {/* ── Section 1: Header ── */}
              <section>
                <p className={styles.sectionHeading}>1. Cover &amp; Header</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                  <div className={styles.inputGroup}>
                    <label>Project Name *</label>
                    <input required value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} className={styles.input} placeholder="e.g. Coastal Retreat" />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Project Subtitle *</label>
                    <input required value={form.subtitle} onChange={e => setForm(p => ({ ...p, subtitle: e.target.value }))} className={styles.input} placeholder="e.g. A premium coastal residence" />
                  </div>
                  <div className={styles.inputGroup} style={{ gridColumn: 'span 2' }}>
                    <label>Cover Image {uploading === 'coverImage' && <span style={{ color: '#f0a' }}>(Uploading…)</span>}</label>
                    {form.coverImage && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={form.coverImage} alt="cover" style={{ width: '100%', height: 160, objectFit: 'cover', borderRadius: 10, marginBottom: 8 }} />
                    )}
                    <div className={styles.fileInputContainer}>
                      <input readOnly value={form.coverImage} className={styles.input} style={{ flex: 1 }} placeholder="No file chosen" />
                      <label className={styles.fileInputLabel}>
                        <Upload size={16} style={{ marginRight: 6 }} /> Upload
                        <input type="file" accept="image/*" className={styles.hiddenFileInput} onChange={e => handleSingleUpload(e, 'coverImage')} />
                      </label>
                    </div>
                  </div>
                </div>
              </section>

              {/* ── Section 2: Product Info ── */}
              <section>
                <p className={styles.sectionHeading}>2. Product Information Section</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                  <div className={styles.inputGroup}>
                    <label>Date</label>
                    <input value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} className={styles.input} placeholder="e.g. July 2024" />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Category</label>
                    <input value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} className={styles.input} placeholder="e.g. Residential" />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Space Plan</label>
                    <input value={form.spacePlan} onChange={e => setForm(p => ({ ...p, spacePlan: e.target.value }))} className={styles.input} placeholder="e.g. 3BHK Open Plan" />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Timeline</label>
                    <input value={form.timeline} onChange={e => setForm(p => ({ ...p, timeline: e.target.value }))} className={styles.input} placeholder="e.g. 6 months" />
                  </div>
                  <div className={styles.inputGroup} style={{ gridColumn: 'span 2' }}>
                    <label>Description *</label>
                    <textarea required value={form.overviewDesc} onChange={e => setForm(p => ({ ...p, overviewDesc: e.target.value }))} className={styles.textarea} style={{ minHeight: 120 }} placeholder="Project overview description…" />
                  </div>
                  <div className={styles.inputGroup} style={{ gridColumn: 'span 2' }}>
                    <label>Right Side Image {uploading === 'overviewImage' && <span style={{ color: '#f0a' }}>(Uploading…)</span>}</label>
                    {form.overviewImage && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={form.overviewImage} alt="overview" style={{ width: '100%', height: 140, objectFit: 'cover', borderRadius: 10, marginBottom: 8 }} />
                    )}
                    <div className={styles.fileInputContainer}>
                      <input readOnly value={form.overviewImage} className={styles.input} style={{ flex: 1 }} placeholder="No file chosen" />
                      <label className={styles.fileInputLabel}>
                        <Upload size={16} style={{ marginRight: 6 }} /> Upload
                        <input type="file" accept="image/*" className={styles.hiddenFileInput} onChange={e => handleSingleUpload(e, 'overviewImage')} />
                      </label>
                    </div>
                  </div>
                </div>
              </section>

              {/* ── Section 3: Gallery ── */}
              <section>
                <p className={styles.sectionHeading}>3. Gallery (2-per-row on desktop)</p>
                <div className={styles.inputGroup}>
                  <label>Add Gallery Images {uploading === 'gallery' && <span style={{ color: '#f0a' }}>(Uploading…)</span>}</label>
                  <label className={styles.fileInputLabel} style={{ width: 'fit-content', marginBottom: '1rem' }}>
                    <PlusCircle size={16} style={{ marginRight: 6 }} /> Add Images (multi-select)
                    <input type="file" accept="image/*" multiple className={styles.hiddenFileInput} onChange={handleGalleryUpload} />
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '0.75rem' }}>
                    {form.galleryJson.map((url, i) => (
                      <div key={i} style={{ position: 'relative', borderRadius: 8, overflow: 'hidden' }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={url} alt={`gallery-${i}`} style={{ width: '100%', height: 100, objectFit: 'cover', display: 'block' }} />
                        <button type="button" onClick={() => removeGalleryImage(i)}
                          style={{ position: 'absolute', top: 4, right: 4, background: 'rgba(0,0,0,0.7)', border: 'none', borderRadius: '50%', width: 24, height: 24, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                          <X size={12} />
                        </button>
                        <span style={{ position: 'absolute', bottom: 4, left: 6, fontSize: '0.7rem', color: '#fff', background: 'rgba(0,0,0,0.5)', borderRadius: 4, padding: '1px 5px' }}>#{i + 1}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* ── Section 4: Process ── */}
              <section>
                <p className={styles.sectionHeading}>4. The Process Section</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                  <div className={styles.inputGroup} style={{ gridColumn: 'span 2' }}>
                    <label>Process Image (right side) {uploading === 'processImage' && <span style={{ color: '#f0a' }}>(Uploading…)</span>}</label>
                    {form.processImage && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={form.processImage} alt="process" style={{ width: '100%', height: 140, objectFit: 'cover', borderRadius: 10, marginBottom: 8 }} />
                    )}
                    <div className={styles.fileInputContainer}>
                      <input readOnly value={form.processImage} className={styles.input} style={{ flex: 1 }} placeholder="No file chosen" />
                      <label className={styles.fileInputLabel}>
                        <Upload size={16} style={{ marginRight: 6 }} /> Upload
                        <input type="file" accept="image/*" className={styles.hiddenFileInput} onChange={e => handleSingleUpload(e, 'processImage')} />
                      </label>
                    </div>
                  </div>
                </div>

                {/* Dynamic process steps */}
                <div style={{ marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {form.processStepsJson.map((step, i) => (
                    <div key={i} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, padding: '1rem 1.25rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                      <GripVertical size={18} style={{ color: 'rgba(255,255,255,0.3)', marginTop: 8, flexShrink: 0 }} />
                      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr', gap: '0.75rem' }}>
                        <div className={styles.inputGroup} style={{ margin: 0 }}>
                          <label style={{ fontSize: '0.78rem' }}>Step {i + 1} Title</label>
                          <input value={step.title} onChange={e => updateStep(i, 'title', e.target.value)} className={styles.input} placeholder="e.g. Concept Development" />
                        </div>
                        <div className={styles.inputGroup} style={{ margin: 0 }}>
                          <label style={{ fontSize: '0.78rem' }}>Step {i + 1} Description</label>
                          <textarea value={step.desc} onChange={e => updateStep(i, 'desc', e.target.value)} className={styles.textarea} style={{ minHeight: 80 }} placeholder="Describe this step…" />
                        </div>
                      </div>
                      <button type="button" onClick={() => removeStep(i)}
                        style={{ background: 'rgba(255,60,60,0.15)', border: '1px solid rgba(255,60,60,0.3)', borderRadius: 8, padding: '6px 8px', cursor: 'pointer', color: '#ff6b6b', flexShrink: 0 }}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                  <button type="button" onClick={addStep} className={styles.navButton} style={{ width: 'fit-content', display: 'flex', alignItems: 'center', gap: 6, padding: '0.5rem 1rem' }}>
                    <PlusCircle size={16} /> Add Process Step
                  </button>
                </div>
              </section>

              <button type="submit" disabled={uploading !== null} className={styles.saveBtn}>
                {uploading ? `Uploading ${uploading}…` : 'Save Project'}
              </button>
            </form>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
