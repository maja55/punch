import React, { useEffect } from 'react';
import ContactForm from '../components/ContactForm';
import { fetchApi } from '../utils';

const Page = ({ page, pageData, updatePageData, children }) => {
  useEffect(() => {
    let url;
    const urlKey = page.split('/')[0];

    switch(urlKey) {
      case 'work':
        url = '/projects';
        break;
      case 'news':
      case 'services':
        url = `/${page}`;
        break;
      default:
        url = `/pages?page=${page}`
    }

    async function fetchPageData() {
      try {
        const data = await fetchApi({ url });
        updatePageData(page, data[0])
      } catch (error) {
        console.error(error);
      }
    }

    if (!pageData || !pageData[page]) fetchPageData();
  }, [page]);

  return (
    <div className={ `page ${page}${page !== 'home' ? ' pt' : ''}` }>
      { children }
      { page !== 'home' && pageData && pageData[page] &&
        <ContactForm full={!pageData[page].hideContactForm} />
      }
    </div>
  );
}

export default Page;
