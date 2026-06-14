'use client';

import { useState, useEffect, useRef } from 'react';
import API_BASE from '@/lib/api';
import Link from 'next/link';
import { ArrowUpRight, ChevronDown, Menu, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Navbar.module.css';

interface ServiceItem {
  id: string;
  title: string;
  about: string;
  keyLine: string;
  imageUrl: string;
}

interface ServiceChild {
  id: string;
  name: string;
  slug: string;
  items: ServiceItem[];
}

interface ServiceParent {
  id: string;
  name: string;
  children: ServiceChild[];
}

interface ProductCategory {
  id: string;
  name: string;
  slug: string;
  image: string;
}

export default function Navbar({ visible = true }: { visible?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: 'Projects', href: '/projects' },
    { name: 'About us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];


  const [showServices, setShowServices] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [servicesData, setServicesData] = useState<ServiceParent[]>([]);
  const [productsData, setProductsData] = useState<ProductCategory[]>([]);
  const [loading, setLoading] = useState(true);


  const servicesTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const productsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const closeAllMenus = () => {
    if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current);
    if (productsTimeoutRef.current) clearTimeout(productsTimeoutRef.current);
    setShowServices(false);
    setShowProducts(false);
  };

  const handleServicesEnter = () => {
    if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current);
    if (productsTimeoutRef.current) clearTimeout(productsTimeoutRef.current);
    setShowProducts(false);
    setShowServices(true);
  };

  const handleServicesLeave = () => {
    servicesTimeoutRef.current = setTimeout(() => setShowServices(false), 200);
  };

  const handleProductsEnter = () => {
    if (productsTimeoutRef.current) clearTimeout(productsTimeoutRef.current);
    if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current);
    setShowServices(false);
    setShowProducts(true);
  };

  const handleProductsLeave = () => {
    productsTimeoutRef.current = setTimeout(() => setShowProducts(false), 200);
  };

  useEffect(() => {
    Promise.all([
      fetch(`${API_BASE}/services`).then(r => r.json()),
      fetch(`${API_BASE}/products/categories`).then(r => r.json())
    ]).then(([services, products]) => {
      if (Array.isArray(services)) {
        setServicesData(services);

      } else {
        console.error("Expected services array but got:", services);
        setServicesData([]);
      }

      if (Array.isArray(products)) {
        setProductsData(products);
      } else {
        console.error("Expected products array but got:", products);
        setProductsData([]);
      }
      setLoading(false);
    }).catch(err => {
      console.error("Error fetching navbar data:", err);
      setLoading(false);
    });
  }, []);

  return (
    <div className={`${styles.navbarWrapper} ${!visible ? styles.navbarHidden : ''}`}>
      <nav className={styles.navbar}>

        <Link href="/" className={styles.logo} onMouseEnter={closeAllMenus}>
          <img src="/images/jadelogo.png" alt="Jade" className={styles.logoImg} />
        </Link>

        <div className={styles.leftNav}>
          <Link href="/import-export" className={`${styles.navLink} hidden md:flex`} onMouseEnter={closeAllMenus}>
            Export/Import <ArrowUpRight className={styles.icon} />
          </Link>
          <Link href="/dealer" className={`${styles.navLink} hidden md:flex`} onMouseEnter={closeAllMenus}>
            Be a dealer <ArrowUpRight className={styles.icon} />
          </Link>
          <Link href="/promotion" className={`${styles.navLink} hidden md:flex`} onMouseEnter={closeAllMenus}>
            Promotion <ArrowUpRight className={styles.icon} />
          </Link>
        </div>

        <div className={styles.rightNav}>
          <div
            className={styles.dropdownContainer}
            onMouseEnter={handleServicesEnter}
            onMouseLeave={handleServicesLeave}
          >
            <Link href="/services" className={styles.navLink}>
              Services <ChevronDown className={styles.icon} style={{ transform: showServices ? 'rotate(180deg)' : 'none' }} />
            </Link>
          </div>

          <div
            className={styles.dropdownContainer}
            onMouseEnter={handleProductsEnter}
            onMouseLeave={handleProductsLeave}
          >
            <Link href="/products" className={styles.navLink}>
              Products <ChevronDown className={styles.icon} style={{ transform: showProducts ? 'rotate(180deg)' : 'none' }} />
            </Link>
          </div>

          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className={styles.navLink} onMouseEnter={closeAllMenus}>
              {link.name}
            </Link>
          ))}
          <button className={styles.ctaButton} onMouseEnter={closeAllMenus}>Book a Call</button>
        </div>

        <button className={styles.mobileMenuBtn} onClick={toggleMenu} aria-label="Toggle Menu">
          {isOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Services Mega Menu — hoisted to navbarWrapper level for full-width positioning */}
      <AnimatePresence>
        {showServices && (
          <motion.div
            className={styles.megaMenu}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            onMouseEnter={handleServicesEnter}
            onMouseLeave={handleServicesLeave}
          >
            <div className={styles.megaMenuLeft}>
              {loading ? (
                <>
                  {[1, 2, 3].map((i) => (
                    <div key={i} className={styles.megaMenuGroup}>
                      <div className={`${styles.skeleton} ${styles.skeletonTitle}`} />
                      <div className={`${styles.skeleton} ${styles.skeletonText}`} />
                      <div className={`${styles.skeleton} ${styles.skeletonText}`} style={{ width: '90px' }} />
                    </div>
                  ))}
                </>
              ) : servicesData.length === 0 ? (
                <div className={styles.noDataMessage}>No services available</div>
              ) : (
                servicesData.map((parent: any) => (
                  <div key={parent.id} className={styles.megaMenuGroup}>
                    <div className={styles.megaMenuParent}>{parent.name}</div>
                    {parent.children.map((child: any) => (
                      <Link
                        key={child.id}
                        href={`/services/${child.slug}`}
                        className={styles.megaMenuChild}
                        onClick={() => setShowServices(false)}
                        onMouseEnter={handleServicesEnter}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                ))
              )}
            </div>
            <div className={styles.megaMenuRight}>
              {!loading && servicesData.length > 0 && (
                <img
                  src="/images/Services/Nav ber thub services by Jade.jpg"
                  alt="Service Feature"
                  className={styles.megaMenuImg}
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Products Mega Menu — hoisted to navbarWrapper level for full-width positioning */}
      <AnimatePresence>
        {showProducts && (
          <motion.div
            className={styles.megaMenuProducts}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            onMouseEnter={handleProductsEnter}
            onMouseLeave={handleProductsLeave}
          >
            {loading ? (
              [1, 2, 3, 4].map((i) => (
                <div key={i} className={`${styles.skeleton} ${styles.skeletonCard}`} />
              ))
            ) : productsData.length === 0 ? (
              <div className={styles.noDataMessage}>No products available</div>
            ) : (
              productsData.map((cat: any) => (
                <Link key={cat.id} href={`/products/${cat.slug}`} className={styles.productCategoryCard} onClick={() => setShowProducts(false)}>
                  <img src={cat.image || "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=500"} alt={cat.name} className={styles.productCategoryImg} />
                  <div className={styles.productCategoryInfo}>
                    <span className={styles.productCategoryTitle}>{cat.name}</span>
                    <div className={styles.productCategoryBtn}>
                      <ChevronRight size={16} />
                    </div>
                  </div>
                </Link>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className={styles.mobileLinks}>

              <Link href="/import-export" onClick={toggleMenu}>Export / Import</Link>
              <Link href="/dealer" onClick={toggleMenu}>Be a Dealer</Link>
              <Link href="/promotion" onClick={toggleMenu}>Promotion</Link>
              <div className={styles.mobileServiceWrapper}>
                <div
                  className={styles.mobileServiceHeader}
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                >
                  Services <ChevronDown className={styles.icon} style={{ transform: mobileServicesOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                </div>
                <AnimatePresence>
                  {mobileServicesOpen && (
                    <motion.div
                      className={styles.mobileServiceList}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      style={{ overflow: 'hidden' }}
                    >
                      {loading ? (
                        <div className={styles.noDataMessage}>Loading services...</div>
                      ) : servicesData.length === 0 ? (
                        <div className={styles.noDataMessage}>No services available</div>
                      ) : (
                        servicesData.map((parent: any) => (

                          <div key={parent.id} className={styles.mobileServiceParentGroup}>
                            <div className={styles.mobileServiceParent}>{parent.name}</div>
                            {parent.children.map((child: any) => (
                              <Link
                                key={child.id}
                                href={`/services/${child.slug}`}
                                className={styles.mobileServiceChild}
                                onClick={toggleMenu}
                              >
                                {child.name}
                              </Link>
                            ))}
                          </div>
                        ))
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className={styles.mobileServiceWrapper}>
                <div
                  className={styles.mobileServiceHeader}
                  onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                >
                  Products <ChevronDown className={styles.icon} style={{ transform: mobileProductsOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                </div>
                <AnimatePresence>
                  {mobileProductsOpen && (
                    <motion.div
                      className={styles.mobileServiceList}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      style={{ overflow: 'hidden' }}
                    >
                      {loading ? (
                        <div className={styles.noDataMessage}>Loading products...</div>
                      ) : productsData.length === 0 ? (
                        <div className={styles.noDataMessage}>No products available</div>
                      ) : (
                        productsData.map((cat: ProductCategory) => (
                          <Link
                            key={cat.id}
                            href={`/products/${cat.slug}`}
                            className={styles.mobileServiceChild}
                            onClick={toggleMenu}
                          >
                            {cat.name}
                          </Link>
                        ))
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <Link href="/projects" onClick={toggleMenu}>Projects</Link>

              <Link href="/about" onClick={toggleMenu}>About us</Link>

              <Link href="/contact" onClick={toggleMenu}>Contact</Link>
              <button className={styles.ctaButtonMobile} onClick={toggleMenu}>Book a Call</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
