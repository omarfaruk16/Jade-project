'use client';

import { useEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import API_BASE from '@/lib/api';
import { X, Edit2, Trash2, Megaphone, Folder, MessageSquare, Users, HelpCircle, Settings, PlusCircle, Layers, Box, Upload, Eye } from 'lucide-react';
import ServicesAdmin from './ServicesAdmin';
import ProductsAdmin from './ProductsAdmin';
import BlogsAdmin from './BlogsAdmin';
import ProjectsAdmin from './ProjectsAdmin';
import styles from './AdminDashboard.module.css';
import Link from 'next/link';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'projects' | 'promotions' | 'testimonials' | 'team' | 'faq' | 'contact' | 'partners' | 'dealerRequests' | 'contactMessages' | 'services' | 'products' | 'blogs'>('projects');
  const [promotions, setPromotions] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [team, setTeam] = useState<any[]>([]);
  const [faqs, setFaqs] = useState<any[]>([]);
  const [partners, setPartners] = useState<any[]>([]);
  const [dealerRequests, setDealerRequests] = useState<any[]>([]);
  const [contactMessages, setContactMessages] = useState<any[]>([]);
  const [contactInfo, setContactInfo] = useState<any>({ phone: '', email: '', address: '', socials: [] });
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const router = useRouter();

  const [promotionData, setPromotionData] = useState({ title: '', image: '' });
  const [testimonialData, setTestimonialData] = useState({ name: '', role: '', review: '', avatar: '', rating: 5 });
  const [teamData, setTeamData] = useState({ name: '', designation: '', image: '' });
  const [faqData, setFaqData] = useState({ question: '', answer: '' });
  const [partnerData, setPartnerData] = useState({ name: '', logo: '' });
  const [uploading, setUploading] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const [promRes, testRes, teamRes, faqRes, contactRes, partRes, dealRes, msgRes] = await Promise.all([
        fetch(`${API_BASE}/promotions`),
        fetch(`${API_BASE}/testimonials`),
        fetch(`${API_BASE}/team`),
        fetch(`${API_BASE}/faq`),
        fetch(`${API_BASE}/contact`),
        fetch(`${API_BASE}/partners`),
        fetch(`${API_BASE}/dealer/requests`, { headers: { 'Authorization': `Bearer ${token}` } }),
        fetch(`${API_BASE}/contact/messages`, { headers: { 'Authorization': `Bearer ${token}` } })
      ]);

      if (dealRes.status === 401 || dealRes.status === 403) {
        localStorage.removeItem('adminToken');
        router.push('/admin');
        return;
      }

      setPromotions(await promRes.json());
      setTestimonials(await testRes.json());
      setTeam(await teamRes.json());
      setFaqs(await faqRes.json());
      setContactInfo(await contactRes.json());
      setPartners(await partRes.json());
      setDealerRequests(await dealRes.json());
      setContactMessages(await msgRes.json());
      setLoading(false);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin');
      return;
    }
    fetchData();
  }, [fetchData, router]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: string, tab: string) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append('image', file);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${API_BASE}/upload`, {
        method: 'POST',
        body: fd,
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.url) {
        if (tab === 'promotions') setPromotionData(prev => ({ ...prev, [field]: data.url }));
        else if (tab === 'testimonials') setTestimonialData(prev => ({ ...prev, [field]: data.url }));
        else if (tab === 'team') setTeamData(prev => ({ ...prev, [field]: data.url }));
        else if (tab === 'partners') setPartnerData(prev => ({ ...prev, [field]: data.url }));
      }
    } catch (err) { console.error(err); }
    finally { setUploading(false); }
  };

  const handleOpenModal = (item: any = null) => {
    if (activeTab === 'promotions') {
      if (item) { setEditingItem(item); setPromotionData({ title: item.title, image: item.image }); }
      else { setEditingItem(null); setPromotionData({ title: '', image: '' }); }
    } else if (activeTab === 'testimonials') {
      if (item) { setEditingItem(item); setTestimonialData({ name: item.name, role: item.role || '', review: item.review, avatar: item.avatar || '', rating: item.rating }); }
      else { setEditingItem(null); setTestimonialData({ name: '', role: '', review: '', avatar: '', rating: 5 }); }
    } else if (activeTab === 'team') {
      if (item) { setEditingItem(item); setTeamData({ name: item.name, designation: item.designation || '', image: item.image || '' }); }
      else { setEditingItem(null); setTeamData({ name: '', designation: '', image: '' }); }
    } else if (activeTab === 'faq') {
      if (item) { setEditingItem(item); setFaqData({ question: item.question, answer: item.answer }); }
      else { setEditingItem(null); setFaqData({ question: '', answer: '' }); }
    } else if (activeTab === 'partners') {
      if (item) { setEditingItem(item); setPartnerData({ name: item.name, logo: item.logo }); }
      else { setEditingItem(null); setPartnerData({ name: '', logo: '' }); }
    } else if (activeTab === 'dealerRequests' || activeTab === 'contactMessages') {
      setEditingItem(item);
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem('adminToken');
    const method = editingItem ? 'PUT' : 'POST';
    const endpoint = activeTab;
    const url = editingItem ? `${API_BASE}/${endpoint}/${editingItem.id}` : `${API_BASE}/${endpoint}`;

    let bodyData;
    if (activeTab === 'promotions') bodyData = promotionData;
    else if (activeTab === 'testimonials') bodyData = { ...testimonialData, rating: Number(testimonialData.rating) };
    else if (activeTab === 'team') bodyData = teamData;
    else if (activeTab === 'faq') bodyData = faqData;
    else if (activeTab === 'partners') bodyData = partnerData;

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(bodyData)
      });
      if (res.ok) { setIsModalOpen(false); fetchData(); }
    } catch (e) { console.error(e); }
  };

  const handleDelete = async (id: string, tab: string) => {
    if (!confirm('Are you sure?')) return;
    const token = localStorage.getItem('adminToken');
    try {
      let endpointPath = tab;
      if (tab === 'dealerRequests') endpointPath = 'dealer/requests';
      if (tab === 'contactMessages') endpointPath = 'contact/messages';

      await fetch(`${API_BASE}/${endpointPath}/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      fetchData();
    } catch (e) { console.error(e); }
  };

  const getActiveArray = () => {
    if (activeTab === 'promotions') return promotions;
    if (activeTab === 'testimonials') return testimonials;
    if (activeTab === 'team') return team;
    if (activeTab === 'faq') return faqs;
    if (activeTab === 'partners') return partners;
    if (activeTab === 'contactMessages') return contactMessages;
    return dealerRequests;
  };

  if (loading) return <div className={styles.dashboardWrapper} style={{ justifyContent: 'center', alignItems: 'center' }}>Loading...</div>;

  const tabs = [
    { id: 'projects', icon: Folder, label: 'Projects' },
    { id: 'promotions', icon: Megaphone, label: 'Promotions' },
    { id: 'testimonials', icon: MessageSquare, label: 'Voices' },
    { id: 'team', icon: Users, label: 'Team' },
    { id: 'faq', icon: HelpCircle, label: 'FAQ' },
    { id: 'contact', icon: Settings, label: 'Contact Settings' },
    { id: 'partners', icon: Users, label: 'Partners' },
    { id: 'dealerRequests', icon: MessageSquare, label: 'Dealer Request' },
    { id: 'services', icon: Layers, label: 'Services' },
    { id: 'products', icon: Box, label: 'Products' },
    { id: 'blogs', icon: MessageSquare, label: 'Blogs' },
  ];

  return (
    <div className={styles.dashboardWrapper}>
      {/* Sidebar Navigation */}
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <Link href="/" className={styles.logo}>
            <img src="/images/jadelogo.png" alt="Jade" />
          </Link>
        </div>


        <nav className={styles.navGroup}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`${styles.navButton} ${activeTab === tab.id ? styles.activeNav : ''}`}
            >
              <tab.icon size={20} />
              {tab.label}
            </button>
          ))}
        </nav>
        <button
          className={styles.logoutBtn}
          onClick={() => { localStorage.removeItem('adminToken'); router.push('/admin'); }}
        >
          Logout
        </button>
      </aside>

      {/* Main Content Area */}
      <main className={styles.mainContent}>
        <header className={styles.header}>
          <h1 className={styles.title}>
            {tabs.find(t => t.id === activeTab)?.label} Management
          </h1>
          {/* Projects, Services, Products, Blogs handle their own addition UI */}
          {!['contact', 'dealerRequests', 'services', 'products', 'blogs', 'projects'].includes(activeTab) && (
            <button onClick={() => handleOpenModal()} className={styles.addNewBtn}>
              <PlusCircle size={20} /> Add New
            </button>
          )}
        </header>

        <div className={styles.card}>
          {activeTab === 'projects' ? (
            <ProjectsAdmin />
          ) : activeTab === 'services' ? (
            <ServicesAdmin />
          ) : activeTab === 'products' ? (
            <ProductsAdmin />
          ) : activeTab === 'blogs' ? (
            <BlogsAdmin />
          ) : activeTab === 'contact' ? (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div className={styles.inputGroup}>
                  <label>Business Phone</label>
                  <input value={contactInfo.phone} onChange={e => setContactInfo({ ...contactInfo, phone: e.target.value })} className={styles.input} />
                </div>
                <div className={styles.inputGroup}>
                  <label>Public Email</label>
                  <input value={contactInfo.email} onChange={e => setContactInfo({ ...contactInfo, email: e.target.value })} className={styles.input} />
                </div>
                <div className={styles.inputGroup}>
                  <label>Headquarters Address</label>
                  <textarea value={contactInfo.address} onChange={e => setContactInfo({ ...contactInfo, address: e.target.value })} className={styles.textarea} style={{ minHeight: '120px' }} />
                </div>
                <button onClick={async () => {
                  const token = localStorage.getItem('adminToken');
                  const res = await fetch(`${API_BASE}/contact`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                    body: JSON.stringify(contactInfo)
                  });
                  if (res.ok) alert('Settings saved!');
                }} className={styles.saveBtn}>
                  Save All Contact Settings
                </button>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <label style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem', fontWeight: 600 }}>Social Media Links</label>
                  <button onClick={() => setContactInfo({ ...contactInfo, socials: [...contactInfo.socials, { name: '', url: '' }] })} className={styles.navButton} style={{ padding: '0.4rem 0.8rem' }}>
                    <PlusCircle size={16} /> Add Social
                  </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {contactInfo.socials.map((social: any, idx: number) => (
                    <div key={idx} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                      <input placeholder="Name" value={social.name} onChange={e => {
                        const newSocials = [...contactInfo.socials];
                        newSocials[idx].name = e.target.value;
                        setContactInfo({ ...contactInfo, socials: newSocials });
                      }} className={styles.input} style={{ flex: 1 }} />
                      <input placeholder="URL" value={social.url} onChange={e => {
                        const newSocials = [...contactInfo.socials];
                        newSocials[idx].url = e.target.value;
                        setContactInfo({ ...contactInfo, socials: newSocials });
                      }} className={styles.input} style={{ flex: 2 }} />
                      <button onClick={() => {
                        const newSocials = contactInfo.socials.filter((_: any, i: number) => i !== idx);
                        setContactInfo({ ...contactInfo, socials: newSocials });
                      }} className={`${styles.actionBtn} ${styles.deleteBtn}`}><Trash2 size={18} /></button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>{activeTab === 'faq' ? 'Question' : activeTab === 'dealerRequests' ? 'Dealer Name' : activeTab === 'contactMessages' ? 'Name' : (activeTab === 'promotions' ? 'Title' : 'Name')}</th>
                    {(activeTab === 'dealerRequests' || activeTab === 'contactMessages') && <th>Email</th>}
                    {activeTab === 'dealerRequests' && <th>Phone</th>}
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {getActiveArray().map(item => (
                    <tr key={item.id}>
                      <td style={{ fontWeight: 500 }}>
                        {activeTab === 'faq' ? item.question : activeTab === 'dealerRequests' ? item.fullName : activeTab === 'contactMessages' ? item.fullName : (activeTab === 'promotions' ? item.title : item.name)}
                      </td>
                      {(activeTab === 'dealerRequests' || activeTab === 'contactMessages') && <td>{item.email}</td>}
                      {activeTab === 'dealerRequests' && <td>{item.phone}</td>}
                      <td style={{ textAlign: 'right' }}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                          {(activeTab === 'dealerRequests' || activeTab === 'contactMessages') && <button onClick={() => handleOpenModal(item)} className={styles.actionBtn} title="View"><Eye size={18} /></button>}
                          {(activeTab !== 'dealerRequests' && activeTab !== 'contactMessages') && <button onClick={() => handleOpenModal(item)} className={styles.actionBtn} title="Edit"><Edit2 size={18} /></button>}
                          <button onClick={() => handleDelete(item.id, activeTab)} className={`${styles.actionBtn} ${styles.deleteBtn}`} title="Delete"><Trash2 size={18} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Modal Overlay — for non-project tabs */}
      {isModalOpen && typeof document !== 'undefined' && createPortal(
        <div className={styles.modalOverlay}>
          <div className={styles.modal} style={{ maxWidth: '550px' }}>
            <button onClick={() => setIsModalOpen(false)} className={styles.closeModal}><X size={20} /></button>
            <h3 style={{ marginBottom: '2.5rem', fontSize: '1.8rem', fontWeight: 700, textTransform: 'capitalize', color: '#fff' }}>
              {editingItem && (activeTab === 'dealerRequests' || activeTab === 'contactMessages') ? 'View' : editingItem ? 'Edit' : 'Add New'} {
                activeTab === 'team' ? 'Team Member' :
                  activeTab === 'faq' ? 'FAQ' :
                    activeTab === 'dealerRequests' ? 'Dealer Request' :
                      activeTab === 'contactMessages' ? 'Contact Message' :
                        activeTab.replace(/s$/, '')
              }
            </h3>
            <form onSubmit={handleSave} style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
              {activeTab === 'promotions' && (
                <>
                  <div className={styles.inputGroup}>
                    <label>Promotion Title</label>
                    <input required value={promotionData.title} onChange={e => setPromotionData({ ...promotionData, title: e.target.value })} className={styles.input} />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Promotion Image {uploading && '(Uploading...)'}</label>
                    <div className={styles.fileInputContainer}>
                      <input value={promotionData.image} readOnly className={styles.input} style={{ flex: 1 }} placeholder="No file chosen" />
                      <label className={styles.fileInputLabel}>
                        <Upload size={18} style={{ marginRight: '8px' }} /> Choose File
                        <input type="file" accept="image/*" className={styles.hiddenFileInput} onChange={e => handleUpload(e, 'image', 'promotions')} />
                      </label>
                    </div>
                  </div>
                </>
              )}
              {activeTab === 'testimonials' && (
                <>
                  <div className={styles.inputGroup}>
                    <label>Reviewer Name</label>
                    <input required value={testimonialData.name} onChange={e => setTestimonialData({ ...testimonialData, name: e.target.value })} className={styles.input} />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Role</label>
                    <input value={testimonialData.role} onChange={e => setTestimonialData({ ...testimonialData, role: e.target.value })} className={styles.input} />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Avatar {uploading && '(Uploading...)'}</label>
                    <div className={styles.fileInputContainer}>
                      <input value={testimonialData.avatar} readOnly className={styles.input} style={{ flex: 1 }} placeholder="No file chosen" />
                      <label className={styles.fileInputLabel}>
                        <Upload size={18} style={{ marginRight: '8px' }} /> Choose File
                        <input type="file" accept="image/*" className={styles.hiddenFileInput} onChange={e => handleUpload(e, 'avatar', 'testimonials')} />
                      </label>
                    </div>
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Rating (1-5)</label>
                    <input type="number" min="1" max="5" value={testimonialData.rating} onChange={e => setTestimonialData({ ...testimonialData, rating: Number(e.target.value) })} className={styles.input} />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Review Text</label>
                    <textarea required value={testimonialData.review} onChange={e => setTestimonialData({ ...testimonialData, review: e.target.value })} className={styles.textarea} style={{ minHeight: '120px' }} />
                  </div>
                </>
              )}
              {activeTab === 'team' && (
                <>
                  <div className={styles.inputGroup}>
                    <label>Member Name</label>
                    <input required value={teamData.name} onChange={e => setTeamData({ ...teamData, name: e.target.value })} className={styles.input} />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Designation</label>
                    <input value={teamData.designation} onChange={e => setTeamData({ ...teamData, designation: e.target.value })} className={styles.input} />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Photo {uploading && '(Uploading...)'}</label>
                    <div className={styles.fileInputContainer}>
                      <input value={teamData.image} readOnly className={styles.input} style={{ flex: 1 }} placeholder="No file chosen" />
                      <label className={styles.fileInputLabel}>
                        <Upload size={18} style={{ marginRight: '8px' }} /> Choose File
                        <input type="file" accept="image/*" className={styles.hiddenFileInput} onChange={e => handleUpload(e, 'image', 'team')} />
                      </label>
                    </div>
                  </div>
                </>
              )}
              {activeTab === 'faq' && (
                <>
                  <div className={styles.inputGroup}>
                    <label>Question</label>
                    <input required value={faqData.question} onChange={e => setFaqData({ ...faqData, question: e.target.value })} className={styles.input} />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Answer</label>
                    <textarea required value={faqData.answer} onChange={e => setFaqData({ ...faqData, answer: e.target.value })} className={styles.textarea} style={{ minHeight: '180px' }} />
                  </div>
                </>
              )}
              {activeTab === 'partners' && (
                <>
                  <div className={styles.inputGroup}>
                    <label>Partner Name</label>
                    <input required value={partnerData.name} onChange={e => setPartnerData({ ...partnerData, name: e.target.value })} className={styles.input} />
                  </div>
                  <div className={styles.inputGroup}>
                    <label>Logo {uploading && '(Uploading...)'}</label>
                    <div className={styles.fileInputContainer}>
                      <input value={partnerData.logo} readOnly className={styles.input} style={{ flex: 1 }} placeholder="No file chosen" />
                      <label className={styles.fileInputLabel}>
                        <Upload size={18} style={{ marginRight: '8px' }} /> Choose File
                        <input type="file" accept="image/*" className={styles.hiddenFileInput} onChange={e => handleUpload(e, 'logo', 'partners')} />
                      </label>
                    </div>
                  </div>
                </>
              )}
              {activeTab === 'dealerRequests' && editingItem && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: 'rgba(255, 255, 255, 0.8)', fontSize: '1rem', lineHeight: '1.5' }}>
                  <div><strong style={{ color: '#fff' }}>Full Name:</strong> {editingItem.fullName}</div>
                  <div><strong style={{ color: '#fff' }}>Email:</strong> {editingItem.email}</div>
                  <div><strong style={{ color: '#fff' }}>Phone:</strong> {editingItem.phone}</div>
                  <div><strong style={{ color: '#fff' }}>Business Name:</strong> {editingItem.businessName}</div>
                  <div><strong style={{ color: '#fff' }}>Location:</strong> {editingItem.location}</div>
                  <div><strong style={{ color: '#fff' }}>Budget:</strong> {editingItem.budget}</div>
                  <div><strong style={{ color: '#fff' }}>Interest:</strong> {editingItem.interest}</div>
                  {editingItem.message && <div><strong style={{ color: '#fff' }}>Message:</strong> {editingItem.message}</div>}
                  <div><strong style={{ color: '#fff' }}>Date:</strong> {new Date(editingItem.createdAt).toLocaleString()}</div>
                </div>
              )}
              {activeTab === 'contactMessages' && editingItem && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: 'rgba(255, 255, 255, 0.8)', fontSize: '1rem', lineHeight: '1.5' }}>
                  <div><strong style={{ color: '#fff' }}>Full Name:</strong> {editingItem.fullName}</div>
                  <div><strong style={{ color: '#fff' }}>Email:</strong> {editingItem.email}</div>
                  <div><strong style={{ color: '#fff' }}>Date:</strong> {new Date(editingItem.createdAt).toLocaleString()}</div>
                  {editingItem.message && <div><strong style={{ color: '#fff' }}>Message:</strong> <p style={{ marginTop: '0.5rem', background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '8px' }}>{editingItem.message}</p></div>}
                </div>
              )}
              {(activeTab !== 'dealerRequests' && activeTab !== 'contactMessages') && (
                <button type="submit" disabled={uploading} className={styles.saveBtn}>
                  {uploading ? 'Uploading...' : 'Save Changes'}
                </button>
              )}
            </form>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}