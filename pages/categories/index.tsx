import { GetStaticProps } from 'next';
import React, { Children, useState } from 'react'
import { sanityClient, urlFor } from "../../sanity";
import { Categories } from '../../typing';
import Header from '../../components/Header';
import Link from 'next/link';




interface Props {
  category: [Categories]
}

function Categories({category}:Props) {

    console.log(category)

  return (
    <main>
        <Header/>  
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6  max-w-7xl mx-auto'>
        {/* href={`/categories/list/${elm.title}`} */}
            {category.map((elm)=>(
                 <Link  key={elm._id} href={{ pathname: '/categories/list', query: { title: elm.title } }} >
                      <div className='border border-yellow-500 shadow-yellow-500 shadow rounded-lg group cursor-pointer hover:bg-yellow-400 hover:text-white transition-all'>
                            <div className='flex justify-between p-5 '>
                                <div>
                                    <p className='text-lg font-bold'>{elm.title}</p>
                                    <p className='text-xs'>{elm.description}</p>
                                </div>

                            </div>
                      </div>
                 </Link>

            ))}
        </div>
      

    </main>
  )
}

export default Categories



export const getServerSideProps = async ()=>{
    const query = `*[_type == 'category']{
        _id,
        title,
        description,
      
      }`;
  
    const category = await sanityClient.fetch(query);
  
      console.log(category)

    return {
      props:{
        category,
      },
    };
  
  }