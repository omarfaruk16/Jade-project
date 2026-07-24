'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowUpRight, ChevronDown, Menu, X, ChevronRight, ArrowRight } from 'lucide-react';
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

export default function NavbarClient({
  visible = true,
  services,
  products,
}: {
  visible?: boolean;
  services: ServiceParent[];
  products: ProductCategory[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredBtn, setHoveredBtn] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const [showServices, setShowServices] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const servicesData = Array.isArray(services) ? services : [];
  const productsData = Array.isArray(products) ? products : [];

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
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <div className={`${styles.navbarWrapper} ${!visible ? styles.navbarHidden : ''}`}>
      <nav className={styles.navbar}>

        <div className={styles.navLeft}>
          <Link href="/" className={styles.logo} onMouseEnter={closeAllMenus}>
            <img src="/images/jadelogo.png" alt="Jade" className={styles.logoImg} />
          </Link>

          <div className={styles.navLeftLinks}>
            <Link href="/import-export" className={`${styles.navLink} ${styles.iconLink} hidden md:flex`} onMouseEnter={closeAllMenus}>
              <span className={styles.linkContent}>
                <ArrowUpRight className={`${styles.icon} ${styles.iconBefore}`} />
                <span>Export/Import</span>
                <ArrowUpRight className={`${styles.icon} ${styles.iconAfter}`} />
              </span>
            </Link>
            <Link href="/dealer" className={`${styles.navLink} ${styles.iconLink} hidden md:flex`} onMouseEnter={closeAllMenus}>
              <span className={styles.linkContent}>
                <ArrowUpRight className={`${styles.icon} ${styles.iconBefore}`} />
                <span>Be a dealer</span>
                <ArrowUpRight className={`${styles.icon} ${styles.iconAfter}`} />
              </span>
            </Link>
            <Link href="/promotion" className={`${styles.navLink} ${styles.iconLink} hidden md:flex`} onMouseEnter={closeAllMenus}>
              <span className={styles.linkContent}>
                <ArrowUpRight className={`${styles.icon} ${styles.iconBefore}`} />
                <span>Promotion</span>
                <ArrowUpRight className={`${styles.icon} ${styles.iconAfter}`} />
              </span>
            </Link>
          </div>
        </div>

        <div className={styles.rightNav}>
          <div className={styles.navLinkGroup}>
            <div
              className={styles.dropdownContainer}
              onMouseEnter={handleServicesEnter}
              onMouseLeave={handleServicesLeave}
            >
              <span className={`${styles.navLink} ${styles.navLinkDimmed}`} style={{ cursor: 'pointer' }}>
                Services <ChevronDown className={styles.icon} style={{ transform: showServices ? 'rotate(180deg)' : 'none' }} />
              </span>
            </div>

            <div
              className={styles.dropdownContainer}
              onMouseEnter={handleProductsEnter}
              onMouseLeave={handleProductsLeave}
            >
              <span
                className={`${styles.navLink} ${styles.navLinkDimmed}`}
                style={{ cursor: 'pointer' }}
              >
                Products <ChevronDown className={styles.icon} style={{ transform: showProducts ? 'rotate(180deg)' : 'none' }} />
              </span>
            </div>

            <Link href="/projects" className={styles.navLink} onMouseEnter={closeAllMenus}>Projects</Link>
            <Link href="/about" className={styles.navLink} onMouseEnter={closeAllMenus}>About us</Link>
          </div>
          <div className={styles.navButtonGroup}>
            <Link href="/contact" className={styles.navLink} onMouseEnter={closeAllMenus}>Contact</Link>
            <a
              href="https://cal.com/jade-kitchen-design/not-sure-what-you-need-let-s-figure-it-out-fast"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaButton}
              onMouseEnter={() => { closeAllMenus(); setHoveredBtn(true); }}
              onMouseLeave={() => setHoveredBtn(false)}
            >
              <span style={{ position: 'relative', display: 'block', overflow: 'hidden' }}>
                <span style={{ display: 'block', transition: 'transform 0.4s ease', transform: hoveredBtn ? 'translateY(-100%)' : 'translateY(0)' }}>Book a Call</span>
                <span style={{ display: 'block', position: 'absolute', top: '100%', left: 0, width: '100%', transition: 'transform 0.4s ease', transform: hoveredBtn ? 'translateY(-100%)' : 'translateY(0)' }}>Book a Call</span>
              </span>
            </a>
          </div>
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
              {servicesData.length === 0 ? (
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
                        <span>{child.name}</span>
                        <ArrowRight size={24} className={styles.megaMenuChildArrow} />
                      </Link>
                    ))}
                  </div>
                ))
              )}
            </div>
            <div className={styles.megaMenuRight}>
              {servicesData.length > 0 && (
                <img
                  src="/images/Services/nav-services.webp"
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
            {productsData.length === 0 ? (
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
                      {servicesData.length === 0 ? (
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
                      {productsData.length === 0 ? (
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
              <a
              href="https://cal.com/jade-kitchen-design/not-sure-what-you-need-let-s-figure-it-out-fast"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaButtonMobile}
              onClick={toggleMenu}
              onMouseEnter={() => setHoveredBtn(true)}
              onMouseLeave={() => setHoveredBtn(false)}
            >
              <span style={{ position: 'relative', display: 'block', overflow: 'hidden' }}>
                <span style={{ display: 'block', transition: 'transform 0.4s ease', transform: hoveredBtn ? 'translateY(-100%)' : 'translateY(0)' }}>Book a Call</span>
                <span style={{ display: 'block', position: 'absolute', top: '100%', left: 0, width: '100%', transition: 'transform 0.4s ease', transform: hoveredBtn ? 'translateY(-100%)' : 'translateY(0)' }}>Book a Call</span>
              </span>
            </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
