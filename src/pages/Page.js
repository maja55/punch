import React, { useEffect } from 'react';
import ContactForm from '../components/ContactForm';
import { fetchApi } from '../utils';


const Page = ({ page, pageData, updatePageData, children }) => {
  useEffect(() => {
    async function fetchPageData() {
      console.log(page, 'fetching page data')
      try {
        const data = await fetchApi({ url: `/pages?page=${page}` });
        updatePageData(page, data[0])
      } catch (error) {
        console.error(error);
      }
    }

    console.log(pageData)

    if (!pageData || !pageData[page]) fetchPageData();
  }, [page]);

  return (
    <div className={ `page ${page}${page !== 'home' ? ' pt' : ''}` }>
      { children }
      { pageData && pageData[page] && <ContactForm full={!pageData[page].hideContactForm} /> }
    </div>
  );
}

export default Page;
