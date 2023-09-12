'use client'

import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const KnowledgeCard = ({ knowledge, handleEdit, handleDelete, handleTagCLick}) => {
    const { data: session } = useSession();
    const pathName = usePathname();
    const router = useRouter(); 

    const handleProfileClick = () => {   
        if (knowledge.creator._id === session?.user.id) return router.push("/profile");
    
        router.push(`/profile/${knowledge.creator._id}?name=${knowledge.creator.username}`);
      };

  return (
    <div className='knowledge_card'>
        <div className='flex justify-between items-start gap-5'>
            <div className='flex-1 flex justify-start items-center gap-3 cursor-pointer'
                onClick={handleProfileClick}
            >
                <Image
                    src={knowledge.creator.image}
                    alt="user_image"
                    width={40}
                    height={40}
                    className='rounded-full object-contain'
                />

                <div className='flex flex-col'>
                    <h3 className='font-satoshi font-semibold text-gray-900'>
                        {knowledge.creator.username}
                    </h3>
                    <p className='font-inter text-sm text-gray-500'>
                        {knowledge.creator.email}
                    </p>
                </div>
            </div>

        </div>
        <h4 className='mt-6 font-satoshi text-xl font-extrabold text-gray-800'>
            {knowledge.title}
        </h4>
        <p className='my-4 font-satoshi text-sm text-gray-700 glassmorphism'>
            {knowledge.description}
        </p>
        <div className='my-4 flex justify-between'>
            <p className='font-inter text-sm blue_gradient cursor-pointer'
                onClick={() => handleTagCLick && handleTagCLick(knowledge.tag)}
            >
                #{knowledge.tag}
            </p>
            <p className=' font-inter text-sm text-gray-700 text-right'>
                {knowledge.date.slice(0, 10)}
            </p>
        </div>

        {session?.user.id === knowledge.creator._id && pathName === '/profile' && (
            <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
                <button className='px-5 py-1.5 text-sm bg-yellow-500 rounded-full text-white hover:bg-yellow-700'
                    onClick={handleEdit}
                >
                    Edit
                </button>
                <button className='px-5 py-1.5 text-sm bg-red-500 rounded-full text-white hover:bg-red-700'
                    onClick={handleDelete}
                >
                    Delete
                </button>
            </div>
        )}
    </div>
  )
}

export default KnowledgeCard