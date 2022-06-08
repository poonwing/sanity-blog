import { GetStaticProps } from 'next';
import React, { Children, useState } from 'react'
import { sanityClient, urlFor } from "../../../sanity";
import { Post,Categories } from '../../../typing';
import Header from '../../../components/Header'
import { useRouter } from 'next/router';
import Link from 'next/link';



interface Props {
  posts: [Post]
}

function PostList({posts}:Props) {

  console.log(posts)

  const router = useRouter()
  console.log(router.query);

  return (
    <main>
      <Header/>  

      {router.query.title?(
        <div className='flex p-5 max-w-7xl mx-auto'>Search:  <b>{router.query.title}</b></div>
      ):(
        <div className='flex flex-col ml-10'>
          <p>NO DATA</p> 
          <br />
          <p className='text-blue-500'>
            <Link href={`/`}>Back to Home Page</Link>
          </p>
        </div>
      )}

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6 max-w-7xl mx-auto'>
        {
          posts.map((post)=>(
            <Link key={post._id} href={`/post/${post.slug.current}`}>
              <div className='border rounded-lg group cursor-pointer overflow-hidden'>
                <img 
                  className='h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out'
                  src={urlFor(post.mainImage).url()!} alt="" />
                <div className='flex justify-between p-5 bg-white'>
                  <div>
                    <p className='text-lg font-bold'>{post.title}</p>
                    <p className='text-xs'>{post.description} by {post.author.name}</p>
                  </div>
                  <img
                    className='h-12 w-12 rounded-full' 
                    src={urlFor(post.author.image).url()} 
                    alt="" 
                  />
                </div>
              </div>

            </Link>
          ))
        }
      </div>
      

    </main>
  )
}

export default PostList

// export const getStaticPaths = async ()=>{      // set up route path with slug
//     const query = `
//         *[_type == 'category']{
//             _id,
//             title,
//             description,
      
//         }
//     `;
  
//       const categories = await sanityClient.fetch(query);
  
//       const paths = categories.map((categories: Categories)=>({
//         params:{
//           title:categories.title,
//         }
//       }));

  
//       return {
//         paths,
//         fallback:'blocking',
//       }
  
//   }
  
  
//   export const getStaticProps:GetStaticProps = async({params}) =>{
//     const query = `
//         *[_type == 'post' && references(*[_type=="category" && title==$title]._id) ]{
//             _id,
//             _createdAt,
//             title,
//             author->{
//             name,
//             image
//         },
//         categories[]->{
//             title,
//             description,
//             _id,
//         },
//         "comments":*[
//             _type == "comment" &&
//             post._ref == ^._id &&
//             approved == true],
//             description,
//             mainImage,
//             slug,
//             body,
//         }
//       `;
  
//     const post = await sanityClient.fetch(query,{
//       title: params?.title,
//     });
  
//     if(!post){
//       return {
//         notFound:true
//       }
//     }
  
//     return {
//       props:{
//         post,
//       },
//       revalidate:60,
//     }
  
  
//   };


  export const getServerSideProps = async ({ query }:any)=>{

    // const router = useRouter()
    console.log(query);

    const query1 = `
            *[_type == 'post' && references(*[_type=="category" && title=="${query.title}"]._id) ]{
                  _id,
                  _createdAt,
                  title,
                  author->{
                  name,
                  image
              },
              categories[]->{
                  title,
                  description,
                  _id,
              },
              "comments":*[
                  _type == "comment" &&
                  post._ref == ^._id &&
                  approved == true],
                  description,
                  mainImage,
                  slug,
                  body,
              }
    `;
  
    const posts = await sanityClient.fetch(query1);
  
    return {
      props:{
        posts,
      },
    };
  
  }