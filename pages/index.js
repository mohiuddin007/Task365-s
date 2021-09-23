import Link from 'next/link'
import { useState } from 'react';

export default function index({data}) {
   const allTask = data.result;

    return (
        <div>
            <h2>Hello World!</h2>
            <h6>Started working on your dashboard with next js </h6>

            <Link href="/faq">
                <a>Here is the faq page</a>
            </Link>
             <br />
            <Link href="/About/About">
                <a>Here is the About page</a>
            </Link>

            {
              allTask && allTask.map(task => 
                <div key={task._id}>
                    <p>{task.title}</p>
                </div>
                )
            }
        </div>
    )
}

// This gets called on every request
export async function getServerSideProps() {
    // Fetch data from external API
    const res = await fetch(`http://localhost:3000/next`)
    const data = await res.json()
  
    // Pass data to the page via props
    return { props: { data } }
  }
