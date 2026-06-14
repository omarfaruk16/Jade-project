'use client';

import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import API_BASE from '@/lib/api';
import { Plus, Trash2, Edit2, X, Bold, Italic, List, ChevronDown, ChevronUp } from 'lucide-react';
import styles from './AdminDashboard.module.css';

const API = `${API_BASE}/products`;

function RichEditor({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { if (ref.current && ref.current.innerHTML !== value) ref.current.innerHTML = value; }, []);
  const cmd = (c: string) => { document.execCommand(c, false); if (ref.current) onChange(ref.current.innerHTML); };
  const b = (a=false): React.CSSProperties => ({ padding:'6px 10px', background: a?'rgba(255,255,255,0.1)':'transparent', border:'1px solid rgba(255,255,255,0.1)', color:'#fff', borderRadius:6, cursor:'pointer', fontSize:12 });
  return (
    <div style={{ border:'1px solid rgba(255,255,255,0.1)', borderRadius:12, overflow:'hidden' }}>
      <div style={{ display:'flex', gap:6, padding:'8px 12px', background:'rgba(255,255,255,0.05)', borderBottom:'1px solid rgba(255,255,255,0.1)' }}>
        <button type="button" style={b()} onMouseDown={e=>{e.preventDefault();cmd('bold')}}><Bold size={13}/></button>
        <button type="button" style={b()} onMouseDown={e=>{e.preventDefault();cmd('italic')}}><Italic size={13}/></button>
        <button type="button" style={b()} onMouseDown={e=>{e.preventDefault();cmd('insertUnorderedList')}}>• List</button>
      </div>
      <div ref={ref} contentEditable suppressContentEditableWarning onInput={()=>{ if(ref.current) onChange(ref.current.innerHTML); }} className={styles.richEditorContent} style={{ minHeight: 80, padding: '10px 14px', background: 'rgba(0,0,0,0.3)', color: '#ffffff', outline: 'none', fontSize: 14, lineHeight: 1.6, caretColor: '#ffffff' }}/>
    </div>
  );
}

const inp: React.CSSProperties = { background:'rgba(0,0,0,0.2)', border:'1px solid rgba(255,255,255,0.1)', padding:'0.75rem 1rem', borderRadius:10, color:'#fff', width:'100%', fontSize:14, boxSizing:'border-box', outline:'none' };
const lbl: React.CSSProperties = { fontSize:12, color:'rgba(255,255,255,0.5)', marginBottom:5, display:'block', fontWeight:500 };
const card: React.CSSProperties = { background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.05)', borderRadius:14, padding:'1.25rem', marginBottom:'0.75rem' };
const sectionBox: React.CSSProperties = { border:'1px solid rgba(255,255,255,0.08)', borderRadius:14, padding:'1.25rem', marginBottom:'0.75rem', background:'rgba(255,255,255,0.01)' };


type MaterialItem = { title: string; description: string; image: string };
type Material = { sectionTitle: string; sectionDesc: string; items: MaterialItem[] };
type AccessoryItem = { title: string; description: string; image: string };
type Accessory = { sectionTitle: string; sectionDesc: string; items: AccessoryItem[] };
type ApplianceItem = { title: string; description: string; image: string };
type Appliance = { sectionTitle: string; sectionDesc: string; items: ApplianceItem[] };

const emptyProduct = () => ({
  title:'', subtitle:'', coverImage:'', categoryId:'',
  overviewCategory:'', overviewBestFor:'', overviewStyleApproach:'',
  about:'', keyLine:'', imageUrl:'', order:0, featureQuotesJson:'[]',
  whatsIncluded:[] as {title:string;description:string}[],
  gallery:[] as {url:string}[],
  descriptions:[] as {title:string;description:string}[],
  types:[] as {name:string;image:string}[],
  materials:[] as Material[],
  accessories:[] as Accessory[],
  appliances:[] as Appliance[],
});

export default function ProductsAdmin() {
  const [categories, setCategories] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const [view, setView] = useState<'categories'|'products'>('categories');

  const [categoryModal, setCategoryModal] = useState(false);
  const [editCategory, setEditCategory] = useState<any>(null);
  const [categoryForm, setCategoryForm] = useState({ name:'', image:'', subtitle:'', order:0 });

  const [productModal, setProductModal] = useState(false);
  const [editProduct, setEditProduct] = useState<any>(null);
  const [productForm, setProductForm] = useState(emptyProduct());

  const fetchAll = async () => {
    const [cRes, pRes] = await Promise.all([fetch(`${API}/categories`), fetch(`${API}`)]);
    setCategories(await cRes.json());
    setProducts(await pRes.json());
  };
  useEffect(()=>{ fetchAll(); },[]);

  const upload = async (file: File): Promise<string> => {
    setUploading(true);
    const fd = new FormData(); fd.append('image', file);
    const tok = typeof window!=='undefined' ? localStorage.getItem('adminToken') : '';
    const res = await fetch(`${API_BASE}/upload`,{method:'POST',headers:{'Authorization':`Bearer ${tok}`},body:fd});
    const data = await res.json(); setUploading(false); return data.url||'';
  };

  const getH = () => { const t=typeof window!=='undefined'?localStorage.getItem('adminToken'):''; return {'Content-Type':'application/json','Authorization':`Bearer ${t}`}; };

  const saveCategory = async () => {
    try {
      const method = editCategory?'PUT':'POST';
      const url = editCategory?`${API}/categories/${editCategory.id}`:`${API}/categories`;
      const res = await fetch(url,{method,headers:getH(),body:JSON.stringify(categoryForm)});
      if(!res.ok) throw new Error(await res.text());
      setCategoryModal(false); fetchAll();
    } catch(e:any){ alert('Error: '+e.message); }
  };

  const deleteCategory = async (id:string) => {
    if(!confirm('Delete category and ALL its products?')) return;
    try { await fetch(`${API}/categories/${id}`,{method:'DELETE',headers:getH()}); fetchAll(); }
    catch(e:any){ alert('Error: '+e.message); }
  };

  const saveProduct = async () => {
    try {
      const method = editProduct?'PUT':'POST';
      const url = editProduct?`${API}/${editProduct.id}`:`${API}`;
      const res = await fetch(url,{method,headers:getH(),body:JSON.stringify(productForm)});
      if(!res.ok) throw new Error(await res.text());
      setProductModal(false); fetchAll();
    } catch(e:any){ alert('Error: '+e.message); }
  };

  const deleteProduct = async (id:string) => {
    if(!confirm('Delete this product?')) return;
    try { await fetch(`${API}/${id}`,{method:'DELETE',headers:getH()}); fetchAll(); }
    catch(e:any){ alert('Error: '+e.message); }
  };

  const openCategoryModal = (c?: any) => {
    setEditCategory(c||null);
    setCategoryForm(c?{name:c.name,image:c.image||'',subtitle:c.subtitle||'',order:c.order||0}:{name:'',image:'',subtitle:'',order:0});
    setCategoryModal(true);
  };

  const openProductModal = (p?: any) => {
    setEditProduct(p||null);
    setProductForm(p ? {
      title:p.title, subtitle:p.subtitle, coverImage:p.coverImage, categoryId:p.categoryId,
      overviewCategory:p.overviewCategory||'', overviewBestFor:p.overviewBestFor||'', overviewStyleApproach:p.overviewStyleApproach||'',
      about:p.about||'', keyLine:p.keyLine||'', imageUrl:p.imageUrl||'', order:p.order||0,
      featureQuotesJson:p.featureQuotesJson||'[]',
      whatsIncluded:(p.whatsIncluded||[]).map((w:any)=>({title:w.title,description:w.description})),
      gallery:(p.gallery||[]).map((g:any)=>({url:g.url})),
      descriptions:(p.descriptions||[]).map((d:any)=>({title:d.title,description:d.description})),
      types:(p.types||[]).map((t:any)=>({name:t.name,image:t.image})),
      materials:(p.materials||[]).map((m:any)=>({sectionTitle:m.sectionTitle,sectionDesc:m.sectionDesc,items:(m.items||[]).map((i:any)=>({title:i.title,description:i.description,image:i.image}))})),
      accessories:(p.accessories||[]).map((a:any)=>({sectionTitle:a.sectionTitle,sectionDesc:a.sectionDesc,items:(a.items||[]).map((i:any)=>({title:i.title,description:i.description,image:i.image}))})),
      appliances:(p.appliances||[]).map((a:any)=>({sectionTitle:a.sectionTitle,sectionDesc:a.sectionDesc,items:(a.items||[]).map((i:any)=>({title:i.title,description:i.description,image:i.image}))})),
    } : { ...emptyProduct(), categoryId:categories[0]?.id||'' });
    setProductModal(true);
  };

  const overlayStyle: React.CSSProperties = { position:'fixed', inset:0, background:'rgba(0,0,0,0.85)', backdropFilter:'blur(16px)', display:'flex', alignItems:'flex-start', justifyContent:'center', zIndex:3000, padding:'4vh 2rem' };
  const modalStyle: React.CSSProperties = { background:'#111', borderRadius:24, border:'1px solid rgba(255,255,255,0.1)', padding:'2rem', width:'100%', maxWidth:860, maxHeight:'92vh', overflowY:'auto', position:'relative', boxShadow:'0 40px 100px rgba(0,0,0,0.5)' };

  const addMaterial = () => setProductForm(f=>({...f, materials:[...f.materials, {sectionTitle:'',sectionDesc:'',items:[]}]}));
  const delMaterial = (mi:number) => setProductForm(f=>({...f, materials:f.materials.filter((_,i)=>i!==mi)}));
  const updMaterial = (mi:number, key:string, val:string) => setProductForm(f=>{ const a=[...f.materials]; a[mi]={...a[mi],[key]:val}; return {...f,materials:a}; });
  const addMatItem = (mi:number) => setProductForm(f=>{ const a=[...f.materials]; a[mi].items=[...a[mi].items,{title:'',description:'',image:''}]; return {...f,materials:a}; });
  const delMatItem = (mi:number,ii:number) => setProductForm(f=>{ const a=[...f.materials]; a[mi].items=a[mi].items.filter((_,i)=>i!==ii); return {...f,materials:a}; });
  const updMatItem = (mi:number,ii:number,key:string,val:string) => setProductForm(f=>{ const a=[...f.materials]; a[mi].items=[...a[mi].items]; a[mi].items[ii]={...a[mi].items[ii],[key]:val}; return {...f,materials:a}; });
  const addAccessory = () => setProductForm(f=>({...f, accessories:[...f.accessories, {sectionTitle:'',sectionDesc:'',items:[]}]}));
  const delAccessory = (ai:number) => setProductForm(f=>({...f, accessories:f.accessories.filter((_,i)=>i!==ai)}));
  const updAccessory = (ai:number, key:string, val:string) => setProductForm(f=>{ const a=[...f.accessories]; a[ai]={...a[ai],[key]:val}; return {...f,accessories:a}; });
  const addAccItem = (ai:number) => setProductForm(f=>{ const a=[...f.accessories]; a[ai].items=[...a[ai].items,{title:'',description:'',image:''}]; return {...f,accessories:a}; });
  const delAccItem = (ai:number,ii:number) => setProductForm(f=>{ const a=[...f.accessories]; a[ai].items=a[ai].items.filter((_,i)=>i!==ii); return {...f,accessories:a}; });
  const updAccItem = (ai:number,ii:number,key:string,val:string) => setProductForm(f=>{ const a=[...f.accessories]; a[ai].items=[...a[ai].items]; a[ai].items[ii]={...a[ai].items[ii],[key]:val}; return {...f,accessories:a}; });

  const addAppliance = () => setProductForm(f=>({...f, appliances:[...f.appliances, {sectionTitle:'',sectionDesc:'',items:[]}]}));
  const delAppliance = (ai:number) => setProductForm(f=>({...f, appliances:f.appliances.filter((_,i)=>i!==ai)}));
  const updAppliance = (ai:number, key:string, val:string) => setProductForm(f=>{ const a=[...f.appliances]; a[ai]={...a[ai],[key]:val}; return {...f,appliances:a}; });
  const addAppItem = (ai:number) => setProductForm(f=>{ const a=[...f.appliances]; a[ai].items=[...a[ai].items,{title:'',description:'',image:''}]; return {...f,appliances:a}; });
  const delAppItem = (ai:number,ii:number) => setProductForm(f=>{ const a=[...f.appliances]; a[ai].items=a[ai].items.filter((_,i)=>i!==ii); return {...f,appliances:a}; });
  const updAppItem = (ai:number,ii:number,key:string,val:string) => setProductForm(f=>{ const a=[...f.appliances]; a[ai].items=[...a[ai].items]; a[ai].items[ii]={...a[ai].items[ii],[key]:val}; return {...f,appliances:a}; });


  const ImgUpload = ({val, onUrl, small=false}: {val:string; onUrl:(u:string)=>void; small?:boolean}) => (
    <div style={{display:'flex',gap:8,alignItems:'center'}}>
      <input style={{...inp,flex:1,fontSize:11}} value={val} readOnly placeholder="Upload image"/>
      <label style={{padding:'0.5rem 0.9rem',background:'#1a1a1c',border:'1px solid #333',borderRadius:8,color:'#fff',cursor:'pointer',fontSize:12,whiteSpace:'nowrap'}}>
        {uploading?'…':'Upload'}
        <input type="file" accept="image/*" style={{display:'none'}} onChange={async e=>{const f=e.target.files?.[0];if(!f)return;const u=await upload(f);onUrl(u);}}/>
      </label>
      {val&&<img src={val} alt="" style={{width:small?40:56,height:small?30:42,objectFit:'cover',borderRadius:6}}/>}
    </div>
  );

  return (
    <div>
      <div style={{display:'flex',gap:8,marginBottom:'2rem'}}>
        <button onClick={()=>setView('categories')} className={`${styles.navButton} ${view==='categories'?styles.activeNav:''}`} style={{padding:'0.6rem 1.4rem'}}>Product Categories</button>
        <button onClick={()=>setView('products')} className={`${styles.navButton} ${view==='products'?styles.activeNav:''}`} style={{padding:'0.6rem 1.4rem'}}>Products</button>
      </div>

      {view==='categories'&&(
        <div>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'1.5rem'}}>
            <h3 style={{color:'#fff',fontSize:'1.2rem'}}>Product Categories</h3>
            <button onClick={()=>openCategoryModal()} style={{display:'flex',alignItems:'center',gap:6,padding:'0.6rem 1.2rem',background:'#fff',color:'#000',border:'none',borderRadius:8,fontWeight:700,cursor:'pointer'}}><Plus size={16}/>Add Category</button>
          </div>
          {categories.map(c=>(
            <div key={c.id} style={card}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div style={{display:'flex',alignItems:'center',gap:'1rem'}}>
                  {c.image&&<img src={c.image} alt="" style={{width:60,height:45,objectFit:'cover',borderRadius:6}}/>}
                  <span style={{color:'#fff',fontWeight:600,fontSize:15}}>{c.name}</span>
                </div>
                <div style={{display:'flex',gap:8}}>
                  <button onClick={()=>openCategoryModal(c)} style={{padding:'6px 10px',background:'#1a1a1c',color:'#fff',border:'1px solid #333',borderRadius:6,cursor:'pointer'}}><Edit2 size={14}/></button>
                  <button onClick={()=>deleteCategory(c.id)} style={{padding:'6px 10px',background:'#1a1a1c',color:'#ef4444',border:'1px solid #333',borderRadius:6,cursor:'pointer'}}><Trash2 size={14}/></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {view==='products'&&(
        <div>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'1.5rem'}}>
            <h3 style={{color:'#fff',fontSize:'1.2rem'}}>Products</h3>
            <button onClick={()=>openProductModal()} style={{display:'flex',alignItems:'center',gap:6,padding:'0.6rem 1.2rem',background:'#fff',color:'#000',border:'none',borderRadius:8,fontWeight:700,cursor:'pointer'}}><Plus size={16}/>Add Product</button>
          </div>
          {products.map(p=>(
            <div key={p.id} style={card}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div style={{flex:1}}>
                  <div style={{color:'#fff',fontWeight:700,fontSize:15}}>{p.title}</div>
                  <div style={{color:'#555',fontSize:12,marginTop:4}}>{p.category?.name}</div>
                </div>
                <div style={{display:'flex',gap:8,flexShrink:0}}>
                  {p.coverImage&&<img src={p.coverImage} alt="" style={{width:60,height:45,objectFit:'cover',borderRadius:6}}/>}
                  <button onClick={()=>openProductModal(p)} style={{padding:'6px 10px',background:'#1a1a1c',color:'#fff',border:'1px solid #333',borderRadius:6,cursor:'pointer'}}><Edit2 size={14}/></button>
                  <button onClick={()=>deleteProduct(p.id)} style={{padding:'6px 10px',background:'#1a1a1c',color:'#ef4444',border:'1px solid #333',borderRadius:6,cursor:'pointer'}}><Trash2 size={14}/></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}


      {categoryModal&&typeof document !== 'undefined' && createPortal(
        <div style={overlayStyle}>
          <div style={{...modalStyle,maxWidth:500}}>
            <button onClick={()=>setCategoryModal(false)} style={{position:'absolute',top:16,right:16,background:'none',border:'none',color:'#fff',cursor:'pointer'}}><X/></button>
            <h3 style={{color:'#fff',marginBottom:'1.5rem'}}>{editCategory?'Edit':'Add'} Category</h3>
            <div style={{display:'flex',flexDirection:'column',gap:'1rem'}}>
              <div><label style={lbl}>Category Name</label><input style={inp} value={categoryForm.name} onChange={e=>setCategoryForm({...categoryForm,name:e.target.value})}/></div>
              <div><label style={lbl}>Hero Subtitle (shown on category detail page)</label><input style={inp} placeholder="e.g. Explore all luxury kitchen options" value={categoryForm.subtitle} onChange={e=>setCategoryForm({...categoryForm,subtitle:e.target.value})}/></div>
              <div>
                <label style={lbl}>Category Image</label>
                <div style={{display:'flex',gap:8,alignItems:'center'}}>
                  <input style={{...inp,flex:1,fontSize:11}} value={categoryForm.image} readOnly placeholder="Upload image"/>
                  <label style={{padding:'0.5rem 0.9rem',background:'#1a1a1c',border:'1px solid #333',borderRadius:8,color:'#fff',cursor:'pointer',fontSize:12}}>
                    Upload<input type="file" accept="image/*" style={{display:'none'}} onChange={async e=>{const f=e.target.files?.[0];if(!f)return;const u=await upload(f);setCategoryForm(prev=>({...prev,image:u}));}}/>
                  </label>
                  {categoryForm.image&&<img src={categoryForm.image} alt="" style={{width:56,height:42,objectFit:'cover',borderRadius:6}}/>}
                </div>
              </div>
              <button onClick={saveCategory} disabled={uploading} style={{padding:'0.9rem',background:'#fff',color:'#000',border:'none',borderRadius:10,fontWeight:800,cursor:'pointer'}}>Save Category</button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {productModal&&typeof document !== 'undefined' && createPortal(
        <div style={overlayStyle}>
          <div style={modalStyle}>
            <button onClick={()=>setProductModal(false)} style={{position:'absolute',top:16,right:16,background:'none',border:'none',color:'#fff',cursor:'pointer',zIndex:1}}><X/></button>
            <h3 style={{color:'#fff',marginBottom:'1.5rem'}}>{editProduct?'Edit':'Add'} Product</h3>
            <div style={{display:'flex',flexDirection:'column',gap:'1.2rem'}}>

              {/* Basic Info */}
              <div style={{background:'rgba(255,255,255,0.03)',borderRadius:12,padding:'1rem'}}>
                <div style={{color:'rgba(255,255,255,0.4)',fontSize:11,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:'1rem'}}>Basic Info</div>
                <div style={{display:'flex',flexDirection:'column',gap:'0.9rem'}}>
                  <div><label style={lbl}>Category</label>
                    <select style={inp} value={productForm.categoryId} onChange={e=>setProductForm({...productForm,categoryId:e.target.value})}>
                      {categories.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                  </div>
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0.8rem'}}>
                    <div><label style={lbl}>Title</label><input style={inp} value={productForm.title} onChange={e=>setProductForm({...productForm,title:e.target.value})}/></div>
                    <div><label style={lbl}>Subtitle</label><input style={inp} value={productForm.subtitle} onChange={e=>setProductForm({...productForm,subtitle:e.target.value})}/></div>
                  </div>
                  <div><label style={lbl}>Cover Image</label>
                    <div style={{display:'flex',gap:8,alignItems:'center'}}>
                      <input style={{...inp,flex:1,fontSize:11}} value={productForm.coverImage} readOnly/>
                      <label style={{padding:'0.5rem 0.9rem',background:'#1a1a1c',border:'1px solid #333',borderRadius:8,color:'#fff',cursor:'pointer',fontSize:12}}>
                        {uploading?'…':'Upload'}<input type="file" accept="image/*" style={{display:'none'}} onChange={async e=>{const f=e.target.files?.[0];if(!f)return;const u=await upload(f);setProductForm(pf=>({...pf,coverImage:u}));}}/>
                      </label>
                      {productForm.coverImage&&<img src={productForm.coverImage} alt="" style={{width:56,height:42,objectFit:'cover',borderRadius:6}}/>}
                    </div>
                  </div>
                </div>
              </div>


              {/* Descriptions Section */}
              <div style={{background:'rgba(255,255,255,0.03)',borderRadius:12,padding:'1rem'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'0.75rem'}}>
                  <div style={{color:'rgba(255,255,255,0.4)',fontSize:11,textTransform:'uppercase',letterSpacing:'0.08em'}}>Descriptions (3-col grid)</div>
                  <button type="button" onClick={()=>setProductForm(f=>({...f,descriptions:[...f.descriptions,{title:'',description:''}]}))} style={{display:'flex',alignItems:'center',gap:4,padding:'4px 10px',background:'#1a1a1c',border:'1px solid #333',borderRadius:6,color:'#fff',cursor:'pointer',fontSize:12}}><Plus size={12}/>Add</button>
                </div>
                {productForm.descriptions.map((d,i)=>(
                  <div key={i} style={sectionBox}>
                    <div style={{display:'flex',justifyContent:'space-between',marginBottom:8}}>
                      <span style={{color:'#666',fontSize:11}}>Description {i+1}</span>
                      <button type="button" onClick={()=>setProductForm(f=>({...f,descriptions:f.descriptions.filter((_,idx)=>idx!==i)}))} style={{background:'none',border:'none',color:'#ef4444',cursor:'pointer'}}><Trash2 size={12}/></button>
                    </div>
                    <input style={{...inp,marginBottom:8}} placeholder="Title" value={d.title} onChange={e=>{const a=[...productForm.descriptions];a[i]={...a[i],title:e.target.value};setProductForm(f=>({...f,descriptions:a}));}}/>
                    <textarea style={{...inp,minHeight:70}} placeholder="Description" value={d.description} onChange={e=>{const a=[...productForm.descriptions];a[i]={...a[i],description:e.target.value};setProductForm(f=>({...f,descriptions:a}));}}/>
                  </div>
                ))}
              </div>

              {/* Types Section */}
              <div style={{background:'rgba(255,255,255,0.03)',borderRadius:12,padding:'1rem'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'0.75rem'}}>
                  <div style={{color:'rgba(255,255,255,0.4)',fontSize:11,textTransform:'uppercase',letterSpacing:'0.08em'}}>Types (3-col grid, image + name)</div>
                  <button type="button" onClick={()=>setProductForm(f=>({...f,types:[...f.types,{name:'',image:''}]}))} style={{display:'flex',alignItems:'center',gap:4,padding:'4px 10px',background:'#1a1a1c',border:'1px solid #333',borderRadius:6,color:'#fff',cursor:'pointer',fontSize:12}}><Plus size={12}/>Add</button>
                </div>
                <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:'0.75rem'}}>
                  {productForm.types.map((t,i)=>(
                    <div key={i} style={sectionBox}>
                      <div style={{display:'flex',justifyContent:'space-between',marginBottom:8}}>
                        <span style={{color:'#666',fontSize:11}}>Type {i+1}</span>
                        <button type="button" onClick={()=>setProductForm(f=>({...f,types:f.types.filter((_,idx)=>idx!==i)}))} style={{background:'none',border:'none',color:'#ef4444',cursor:'pointer'}}><Trash2 size={12}/></button>
                      </div>
                      <input style={{...inp,marginBottom:8}} placeholder="Type name" value={t.name} onChange={e=>{const a=[...productForm.types];a[i]={...a[i],name:e.target.value};setProductForm(f=>({...f,types:a}));}}/>
                      <label style={lbl}>Image</label>
                      <div style={{display:'flex',gap:6,alignItems:'center'}}>
                        <input style={{...inp,flex:1,fontSize:10}} value={t.image} readOnly/>
                        <label style={{padding:'4px 8px',background:'#1a1a1c',border:'1px solid #333',borderRadius:6,color:'#fff',cursor:'pointer',fontSize:11}}>
                          Upload<input type="file" accept="image/*" style={{display:'none'}} onChange={async e=>{const f=e.target.files?.[0];if(!f)return;const u=await upload(f);const a=[...productForm.types];a[i]={...a[i],image:u};setProductForm(pf=>({...pf,types:a}));}}/>
                        </label>
                        {t.image&&<img src={t.image} alt="" style={{width:40,height:30,objectFit:'cover',borderRadius:4}}/>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>


              {/* Materials Section */}
              <div style={{background:'rgba(255,255,255,0.03)',borderRadius:12,padding:'1rem'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'0.75rem'}}>
                  <div style={{color:'rgba(255,255,255,0.4)',fontSize:11,textTransform:'uppercase',letterSpacing:'0.08em'}}>Materials (2-col layout)</div>
                  <button type="button" onClick={addMaterial} style={{display:'flex',alignItems:'center',gap:4,padding:'4px 10px',background:'#1a1a1c',border:'1px solid #333',borderRadius:6,color:'#fff',cursor:'pointer',fontSize:12}}><Plus size={12}/>Add Material Section</button>
                </div>
                {productForm.materials.map((m,mi)=>(
                  <div key={mi} style={{...sectionBox,marginBottom:'0.75rem'}}>
                    <div style={{display:'flex',justifyContent:'space-between',marginBottom:8}}>
                      <span style={{color:'#aaa',fontSize:12,fontWeight:600}}>Material Section {mi+1}</span>
                      <button type="button" onClick={()=>delMaterial(mi)} style={{background:'none',border:'none',color:'#ef4444',cursor:'pointer'}}><Trash2 size={13}/></button>
                    </div>
                    <input style={{...inp,marginBottom:8}} placeholder="Section Title (e.g. Flooring Finishes)" value={m.sectionTitle} onChange={e=>updMaterial(mi,'sectionTitle',e.target.value)}/>
                    <textarea style={{...inp,minHeight:60,marginBottom:'0.75rem'}} placeholder="Section Description" value={m.sectionDesc} onChange={e=>updMaterial(mi,'sectionDesc',e.target.value)}/>
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
                      <span style={{color:'rgba(255,255,255,0.3)',fontSize:11}}>Material Items (image 4:3, title, description)</span>
                      <button type="button" onClick={()=>addMatItem(mi)} style={{display:'flex',alignItems:'center',gap:4,padding:'3px 8px',background:'#1a1a1c',border:'1px solid #333',borderRadius:5,color:'#fff',cursor:'pointer',fontSize:11}}><Plus size={10}/>Add Item</button>
                    </div>
                    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0.6rem'}}>
                      {m.items.map((item,ii)=>(
                        <div key={ii} style={{background:'rgba(0,0,0,0.3)',borderRadius:8,padding:'0.75rem',border:'1px solid rgba(255,255,255,0.05)'}}>
                          <div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}>
                            <span style={{color:'#555',fontSize:10}}>Item {ii+1}</span>
                            <button type="button" onClick={()=>delMatItem(mi,ii)} style={{background:'none',border:'none',color:'#ef4444',cursor:'pointer'}}><Trash2 size={10}/></button>
                          </div>
                          <input style={{...inp,marginBottom:6,fontSize:12}} placeholder="Title" value={item.title} onChange={e=>updMatItem(mi,ii,'title',e.target.value)}/>
                          <textarea style={{...inp,minHeight:50,marginBottom:6,fontSize:12}} placeholder="Description (e.g. Porcelain · Sustainable · Eco-Friendly)" value={item.description} onChange={e=>updMatItem(mi,ii,'description',e.target.value)}/>
                          <div style={{display:'flex',gap:6,alignItems:'center'}}>
                            <input style={{...inp,flex:1,fontSize:10}} value={item.image} readOnly placeholder="Image (4:3)"/>
                            <label style={{padding:'3px 7px',background:'#1a1a1c',border:'1px solid #333',borderRadius:5,color:'#fff',cursor:'pointer',fontSize:10}}>
                              Upload<input type="file" accept="image/*" style={{display:'none'}} onChange={async e=>{const f=e.target.files?.[0];if(!f)return;const u=await upload(f);updMatItem(mi,ii,'image',u);}}/>
                            </label>
                            {item.image&&<img src={item.image} alt="" style={{width:48,height:36,objectFit:'cover',borderRadius:4}}/>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Accessories Section */}
              <div style={{background:'rgba(255,255,255,0.03)',borderRadius:12,padding:'1rem'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'0.75rem'}}>
                  <div style={{color:'rgba(255,255,255,0.4)',fontSize:11,textTransform:'uppercase',letterSpacing:'0.08em'}}>Accessories</div>
                  <button type="button" onClick={addAccessory} style={{display:'flex',alignItems:'center',gap:4,padding:'4px 10px',background:'#1a1a1c',border:'1px solid #333',borderRadius:6,color:'#fff',cursor:'pointer',fontSize:12}}><Plus size={12}/>Add Accessory Section</button>
                </div>
                {productForm.accessories.map((a,ai)=>(
                  <div key={ai} style={{...sectionBox,marginBottom:'0.75rem'}}>
                    <div style={{display:'flex',justifyContent:'space-between',marginBottom:8}}>
                      <span style={{color:'#aaa',fontSize:12,fontWeight:600}}>Accessory Section {ai+1}</span>
                      <button type="button" onClick={()=>delAccessory(ai)} style={{background:'none',border:'none',color:'#ef4444',cursor:'pointer'}}><Trash2 size={13}/></button>
                    </div>
                    <input style={{...inp,marginBottom:8}} placeholder="Section Title" value={a.sectionTitle} onChange={e=>updAccessory(ai,'sectionTitle',e.target.value)}/>
                    <textarea style={{...inp,minHeight:60,marginBottom:'0.75rem'}} placeholder="Section Description" value={a.sectionDesc} onChange={e=>updAccessory(ai,'sectionDesc',e.target.value)}/>
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
                      <span style={{color:'rgba(255,255,255,0.3)',fontSize:11}}>Accessory Items</span>
                      <button type="button" onClick={()=>addAccItem(ai)} style={{display:'flex',alignItems:'center',gap:4,padding:'3px 8px',background:'#1a1a1c',border:'1px solid #333',borderRadius:5,color:'#fff',cursor:'pointer',fontSize:11}}><Plus size={10}/>Add Item</button>
                    </div>
                    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0.6rem'}}>
                      {a.items.map((item,ii)=>(
                        <div key={ii} style={{background:'rgba(0,0,0,0.3)',borderRadius:8,padding:'0.75rem',border:'1px solid rgba(255,255,255,0.05)'}}>
                          <div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}>
                            <span style={{color:'#555',fontSize:10}}>Item {ii+1}</span>
                            <button type="button" onClick={()=>delAccItem(ai,ii)} style={{background:'none',border:'none',color:'#ef4444',cursor:'pointer'}}><Trash2 size={10}/></button>
                          </div>
                          <input style={{...inp,marginBottom:6,fontSize:12}} placeholder="Title" value={item.title} onChange={e=>updAccItem(ai,ii,'title',e.target.value)}/>
                          <textarea style={{...inp,minHeight:50,marginBottom:6,fontSize:12}} placeholder="Description" value={item.description} onChange={e=>updAccItem(ai,ii,'description',e.target.value)}/>
                          <div style={{display:'flex',gap:6,alignItems:'center'}}>
                            <input style={{...inp,flex:1,fontSize:10}} value={item.image} readOnly placeholder="Image"/>
                            <label style={{padding:'3px 7px',background:'#1a1a1c',border:'1px solid #333',borderRadius:5,color:'#fff',cursor:'pointer',fontSize:10}}>
                              Upload<input type="file" accept="image/*" style={{display:'none'}} onChange={async e=>{const f=e.target.files?.[0];if(!f)return;const u=await upload(f);updAccItem(ai,ii,'image',u);}}/>
                            </label>
                            {item.image&&<img src={item.image} alt="" style={{width:48,height:36,objectFit:'cover',borderRadius:4}}/>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>


              {/* Appliances Section */}
              <div style={{background:'rgba(255,255,255,0.03)',borderRadius:12,padding:'1rem'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'0.75rem'}}>
                  <div style={{color:'rgba(255,255,255,0.4)',fontSize:11,textTransform:'uppercase',letterSpacing:'0.08em'}}>Appliances (same as Materials)</div>
                  <button type="button" onClick={addAppliance} style={{display:'flex',alignItems:'center',gap:4,padding:'4px 10px',background:'#1a1a1c',border:'1px solid #333',borderRadius:6,color:'#fff',cursor:'pointer',fontSize:12}}><Plus size={12}/>Add Appliance Section</button>
                </div>
                {productForm.appliances.map((a,ai)=>(
                  <div key={ai} style={{...sectionBox,marginBottom:'0.75rem'}}>
                    <div style={{display:'flex',justifyContent:'space-between',marginBottom:8}}>
                      <span style={{color:'#aaa',fontSize:12,fontWeight:600}}>Appliance Section {ai+1}</span>
                      <button type="button" onClick={()=>delAppliance(ai)} style={{background:'none',border:'none',color:'#ef4444',cursor:'pointer'}}><Trash2 size={13}/></button>
                    </div>
                    <input style={{...inp,marginBottom:8}} placeholder="Section Title" value={a.sectionTitle} onChange={e=>updAppliance(ai,'sectionTitle',e.target.value)}/>
                    <textarea style={{...inp,minHeight:60,marginBottom:'0.75rem'}} placeholder="Section Description" value={a.sectionDesc} onChange={e=>updAppliance(ai,'sectionDesc',e.target.value)}/>
                    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
                      <span style={{color:'rgba(255,255,255,0.3)',fontSize:11}}>Appliance Items</span>
                      <button type="button" onClick={()=>addAppItem(ai)} style={{display:'flex',alignItems:'center',gap:4,padding:'3px 8px',background:'#1a1a1c',border:'1px solid #333',borderRadius:5,color:'#fff',cursor:'pointer',fontSize:11}}><Plus size={10}/>Add Item</button>
                    </div>
                    <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0.6rem'}}>
                      {a.items.map((item,ii)=>(
                        <div key={ii} style={{background:'rgba(0,0,0,0.3)',borderRadius:8,padding:'0.75rem',border:'1px solid rgba(255,255,255,0.05)'}}>
                          <div style={{display:'flex',justifyContent:'space-between',marginBottom:6}}>
                            <span style={{color:'#555',fontSize:10}}>Item {ii+1}</span>
                            <button type="button" onClick={()=>delAppItem(ai,ii)} style={{background:'none',border:'none',color:'#ef4444',cursor:'pointer'}}><Trash2 size={10}/></button>
                          </div>
                          <input style={{...inp,marginBottom:6,fontSize:12}} placeholder="Title" value={item.title} onChange={e=>updAppItem(ai,ii,'title',e.target.value)}/>
                          <textarea style={{...inp,minHeight:50,marginBottom:6,fontSize:12}} placeholder="Description" value={item.description} onChange={e=>updAppItem(ai,ii,'description',e.target.value)}/>
                          <div style={{display:'flex',gap:6,alignItems:'center'}}>
                            <input style={{...inp,flex:1,fontSize:10}} value={item.image} readOnly placeholder="Image"/>
                            <label style={{padding:'3px 7px',background:'#1a1a1c',border:'1px solid #333',borderRadius:5,color:'#fff',cursor:'pointer',fontSize:10}}>
                              Upload<input type="file" accept="image/*" style={{display:'none'}} onChange={async e=>{const f=e.target.files?.[0];if(!f)return;const u=await upload(f);updAppItem(ai,ii,'image',u);}}/>
                            </label>
                            {item.image&&<img src={item.image} alt="" style={{width:48,height:36,objectFit:'cover',borderRadius:4}}/>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <button onClick={saveProduct} disabled={uploading} style={{padding:'1.1rem',background:uploading?'#444':'#fff',color:uploading?'#888':'#000',border:'none',borderRadius:12,fontWeight:800,fontSize:15,cursor:uploading?'not-allowed':'pointer',marginTop:8}}>
                {uploading?'Uploading…':'Save Product'}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
