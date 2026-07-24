import { ArrowRight } from 'lucide-react';
import styles from './Footer.module.css';

import { getProductCategories } from '@/lib/data';

const companyLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Export & Import', href: '/import-export' },
  { label: 'Blog', href: '/blogs' },
  { label: 'Projects', href: '/projects' },
  { label: 'Promotions', href: '/promotion' },
];

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Warranty Policy', href: '/warranty' },
  { label: 'Contact', href: '/contact' },
  { label: 'Be A dealer', href: '/dealer' },
];

export default async function Footer() {
  const categories = await getProductCategories();
  const productLinks: { label: string, href: string }[] = Array.isArray(categories)
    ? categories.map((cat: any) => ({ label: cat.name, href: `/products/${cat.slug}` }))
    : [];

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.topRow}>
          <div className={styles.leftCol}>
            <div className={styles.logoBox}>
              <img src="/images/jadelogo.png" alt="SpazioPerfetto" className={styles.logoImg} />
            </div>
            <p className={styles.tagline}>
              Redefining spaces with a perfect blend of<br />serenity and sophistication.
            </p>
            <div className={styles.socialRow}>
              <a href="https://www.instagram.com/jadekitchendesign" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <svg width="20" height="20" viewBox="0 0 106 106" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M105.703 31.1465C105.449 25.5028 104.537 21.6413 103.243 18.2678C101.886 14.7882 100.084 11.8179 97.1366 8.88991C94.1893 5.96197 91.2419 4.11609 87.7644 2.77942C84.3929 1.46397 80.5337 0.572858 74.8934 0.318255C69.2319 0.0636509 67.4295 0 53.053 0C38.6553 0 36.853 0.0636509 31.2127 0.318255C25.5723 0.572858 21.7132 1.48519 18.3417 2.77942C14.843 4.13731 11.8744 5.94075 8.94821 8.88991C6.02202 11.8391 4.17725 14.7882 2.84138 18.2678C1.54793 21.6413 0.636144 25.5028 0.381693 31.1465C0.127242 36.8115 0.0636292 38.6149 0.0636292 53C0.0636292 67.4063 0.127242 69.2098 0.381693 74.8535C0.636144 80.4972 1.54793 84.3587 2.84138 87.7322C4.19846 91.2118 6.00082 94.1821 8.94821 97.1101C11.8744 100.059 14.843 101.884 18.3205 103.221C21.692 104.536 25.5511 105.427 31.1915 105.682C36.853 105.936 38.6553 106 53.0318 106C67.4295 106 69.2319 105.936 74.8722 105.682C80.5125 105.427 84.3717 104.515 87.7432 103.221C91.2207 101.863 94.1893 100.059 97.1154 97.1101C100.042 94.1609 101.886 91.2118 103.222 87.7322C104.537 84.3587 105.428 80.4972 105.682 74.8535C105.936 69.1886 106 67.3851 106 53C106 38.6149 105.958 36.7902 105.703 31.1465ZM96.1825 74.4291C95.9492 79.6061 95.0798 82.4279 94.3589 84.2738C93.4047 86.735 92.2385 88.5172 90.3725 90.3843C88.5065 92.2514 86.7466 93.3759 84.2657 94.3731C82.3997 95.0945 79.5795 95.9644 74.4269 96.1978C68.8502 96.4524 67.1751 96.516 53.0106 96.516C38.8462 96.516 37.171 96.4524 31.5943 96.1978C26.4205 95.9644 23.6003 95.0945 21.7556 94.3731C19.2959 93.4183 17.5147 92.2514 15.6487 90.3843C13.7828 88.5172 12.6589 86.7562 11.6623 84.2738C10.9414 82.4067 10.072 79.5849 9.83878 74.4291C9.58433 68.8491 9.52072 67.1729 9.52072 53C9.52072 38.8271 9.58433 37.1509 9.83878 31.5709C10.072 26.3939 10.9414 23.5721 11.6623 21.7262C12.6165 19.265 13.7828 17.4828 15.6487 15.6157C17.5147 13.7486 19.2747 12.6241 21.7556 11.6269C23.6215 10.9055 26.4417 10.0356 31.5943 9.80224C37.171 9.54764 38.8462 9.48399 53.0106 9.48399C67.1751 9.48399 68.8502 9.54764 74.4269 9.80224C79.6007 10.0356 82.4209 10.9055 84.2657 11.6269C86.7254 12.5817 88.5065 13.7486 90.3725 15.6157C92.2385 17.4828 93.3623 19.2438 94.3589 21.7262C95.0798 23.5933 95.9492 26.4151 96.1825 31.5709C96.4369 37.1509 96.5005 38.8271 96.5005 53C96.5005 67.1729 96.4157 68.8491 96.1825 74.4291Z"/>
                  <path d="M53.0108 25.7573C37.9558 25.7573 25.7846 37.9571 25.7846 52.9999C25.7846 68.064 37.977 80.2425 53.0108 80.2425C68.0446 80.2425 80.2371 68.0215 80.2371 52.9999C80.2371 37.9359 68.0658 25.7573 53.0108 25.7573ZM53.0108 70.6737C43.2569 70.6737 35.3477 62.7597 35.3477 52.9999C35.3477 43.2401 43.2569 35.3262 53.0108 35.3262C62.7648 35.3262 70.6739 43.2401 70.6739 52.9999C70.6739 62.7597 62.7648 70.6737 53.0108 70.6737Z"/>
                  <path d="M81.2972 31.0617C84.8104 31.0617 87.6584 28.212 87.6584 24.6966C87.6584 21.1813 84.8104 18.3315 81.2972 18.3315C77.7839 18.3315 74.9359 21.1813 74.9359 24.6966C74.9359 28.212 77.7839 31.0617 81.2972 31.0617Z"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/jade-kitchen-design/" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <svg width="20" height="20" viewBox="0 0 140 134" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 15.5657C0 11.0538 1.57662 7.33156 4.72973 4.39899C7.88284 1.46628 11.982 0 17.027 0C21.982 0 25.9909 1.44368 29.0541 4.33131C32.2072 7.30909 33.7838 11.1891 33.7838 15.9717C33.7838 20.303 32.2523 23.9124 29.1892 26.8C26.0361 29.7778 21.8919 31.2667 16.7568 31.2667H16.6216C11.6666 31.2667 7.6577 29.7778 4.59459 26.8C1.53149 23.8222 0 20.0774 0 15.5657ZM1.75676 134V43.5838H31.7568V134H1.75676ZM48.3784 134H78.3784V83.5131C78.3784 80.3548 78.7388 77.9184 79.4595 76.204C80.7207 73.136 82.6351 70.5417 85.2027 68.4212C87.7703 66.3006 90.991 65.2404 94.8649 65.2404C104.955 65.2404 110 72.0532 110 85.6788V134H140V82.1596C140 68.8047 136.847 58.6758 130.541 51.7727C124.234 44.8697 115.901 41.4182 105.541 41.4182C93.9189 41.4182 84.8649 46.4263 78.3784 56.4424V56.7131H78.2432L78.3784 56.4424V43.5838H48.3784C48.5585 46.4713 48.6487 55.4497 48.6487 70.5192C48.6487 85.5885 48.5585 106.749 48.3784 134Z"/>
                </svg>
              </a>
              <a href="https://www.facebook.com/JadeKitchenDesign" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <svg width="20" height="20" viewBox="0 0 108 108" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M77.4616 60.1915L80.2603 41.6973H62.7534V29.701C62.7534 24.6401 65.1945 19.7041 73.0356 19.7041H81V3.95908C81 3.95908 73.7753 2.70947 66.8712 2.70947C52.4466 2.70947 43.0274 11.5692 43.0274 27.6017V41.6973H27V60.1915H43.0274V104.902C46.2452 105.415 49.537 105.677 52.8904 105.677C56.2438 105.677 59.5356 105.415 62.7534 104.902V60.1915H77.4616Z"/>
                </svg>
              </a>
              <a href="https://www.youtube.com/@jadekitchendesign421" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <svg width="20" height="20" viewBox="0 0 119 119" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_2050_15)">
                    <path d="M116.549 30.8871C115.177 25.7899 111.158 21.771 106.06 20.3987C96.7483 17.8501 59.4997 17.8501 59.4997 17.8501C59.4997 17.8501 22.2511 17.8501 12.939 20.3007C7.93983 21.673 3.82288 25.7899 2.45057 30.8871C0 40.1993 0 59.5097 0 59.5097C0 59.5097 0 78.9182 2.45057 88.1323C3.82288 93.2295 7.84181 97.2484 12.939 98.6208C22.3492 101.169 59.4997 101.169 59.4997 101.169C59.4997 101.169 96.7483 101.169 106.06 98.7188C111.158 97.3465 115.177 93.3275 116.549 88.2304C118.999 78.9182 118.999 59.6077 118.999 59.6077C118.999 59.6077 119.098 40.1993 116.549 30.8871Z"/>
                    <path d="M47.639 77.3497L78.6142 59.5096L47.639 41.6694V77.3497Z" fill="white"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_2050_15"><rect width="119" height="119" rx="6" fill="white"/></clipPath>
                  </defs>
                </svg>
              </a>
              <a href="https://www.tiktok.com/@jadekitchendesign" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
                <svg width="20" height="20" viewBox="0 0 122 140" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M89.6999 0H65.6289V95.3622C65.6289 106.725 56.3711 116.058 44.85 116.058C33.3288 116.058 24.0708 106.725 24.0708 95.3622C24.0708 84.203 33.1231 75.0723 44.2329 74.6667V50.7247C19.7504 51.1303 0 70.8116 0 95.3622C0 120.116 20.1619 140 45.0558 140C69.9493 140 90.1112 119.913 90.1112 95.3622V46.4637C99.1636 52.9566 110.273 56.8116 122 57.0146V33.0725C103.896 32.4638 89.6999 17.8551 89.6999 0Z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className={styles.linkGrid}>
            <div className={styles.linkGroup}>
              <h3 className={styles.linkHeading}>Product</h3>
              {productLinks.map((link) => (
                <a key={link.label} href={link.href} className={styles.linkItem}>
                  <span>{link.label}</span>
                  <ArrowRight className={styles.linkArrow} />
                </a>
              ))}
            </div>

            <div className={styles.linkGroup}>
              <h3 className={styles.linkHeading}>Company</h3>
              {companyLinks.map((link) => (
                <a key={link.label} href={link.href} className={styles.linkItem}>
                  <span>{link.label}</span>
                  <ArrowRight className={styles.linkArrow} />
                </a>
              ))}
            </div>

            <div className={styles.linkGroupFullMobile}>
              <h3 className={styles.linkHeading}>Legal</h3>
              {legalLinks.map((link) => (
                <a key={link.label} href={link.href} className={styles.linkItem}>
                  <span>{link.label}</span>
                  <ArrowRight className={styles.linkArrow} />
                </a>
              ))}
            </div>
          </div>

          <div className={styles.madeBy}>
            <span>Made by:</span>
            <a
              href="https://www.grafinut.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/images/GRAFINUT.png" alt="Grafinut" />
            </a>
          </div>
        </div>

        <div className={styles.bottomRow}>
          <svg
            className={styles.brandText}
            width="100%"
            viewBox="0 0 1480 280"
            preserveAspectRatio="xMidYMid meet"
            xmlns="http://www.w3.org/2000/svg"
          >
            <text
              x="50%"
              y="50%"
              dominantBaseline="central"
              textAnchor="middle"
              fill="rgb(204, 93, 20)"
              fontWeight="400"
              fontSize="245"
              textLength="1460"
              lengthAdjust="spacing"
            >
              SpazioPerfetto
            </text>
          </svg>
          <p className={styles.copyright}>
            Jade Kitchen Design Sdn Bhd (1050254-U) &copy;2026 . All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
